using BAS.AppCommon;
using BAS.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RestSharp;

namespace BAS.AppServices
{
    public class MovieService : IMovieService
    {
        private readonly MovieDbContext db;
        private readonly IGenreService genreService;
        private readonly IPersonnelService personnelService;
        private readonly IFileService fileService;
        private readonly IUserService userService;
        private readonly RestClient moviePyClient;

        private const string moviePyRecommendUrl = "movies/recommend";

        public MovieService(MovieDbContext db, IGenreService genreService, IPersonnelService personnelService, IFileService fileService,
            AppConfig appConfig, IUserService userService)
        {
            this.db = db;
            this.genreService = genreService;
            this.personnelService = personnelService;
            this.fileService = fileService;
            this.userService = userService;
            this.moviePyClient = this.ConfigureMoviePy(appConfig);
        }

        private RestClient ConfigureMoviePy(AppConfig appConfig)
        {
            var baseUrl = appConfig.API.BasPy.Url;
            return new RestClient(baseUrl);
        }

        #region Movie
        public async Task<bool> InsertMovie(InsertUpdateMovieDTO movieDTO)
        {
            if (string.IsNullOrWhiteSpace(movieDTO.Title) ||
                movieDTO.Title.Length > StaticValues.MovieTitleMaxLength)
                return false;

            if (db.Movies.Any(m => m.Title.ToLower().Equals(movieDTO.Title.ToLower())))
                return false;

            if (movieDTO.Description.Length > StaticValues.MovieDescriptionMaxLength)
                return false;

            if (movieDTO.MovieLengthInMinutes <= 0)
                return false;

            var movie = new Movie()
            {
                MovieLengthInMinutes = movieDTO.MovieLengthInMinutes,
                AverageRating = 0.0,
                Description = movieDTO.Description,
                Poster = "",
                ReleaseYear = movieDTO.ReleaseYear,
                Title = movieDTO.Title
            };

            db.Movies.Add(movie);
            db.SaveChanges();

            var movieId = db.Movies.FirstOrDefault(m => m.Title.Equals(movieDTO.Title)).Id;

            await InsertMovieGenres(movieId, movieDTO.Genres);
            await InsertMovieCrew(movieId, movieDTO.Crew);
            movie.Poster = await fileService.InsertMoviePoster(movieId, movieDTO.File);

            db.Movies.Update(movie);
            db.SaveChanges();

            return true;
        }

        public async Task<bool> UpdateMovie(InsertUpdateMovieDTO movieDTO)
        {
            if (string.IsNullOrWhiteSpace(movieDTO.Title) ||
                movieDTO.Title.Length > StaticValues.MovieTitleMaxLength)
                return false;

            if (db.Movies.Any(m => m.Title.ToLower().Equals(movieDTO.Title.ToLower()) &&
                    m.Id != movieDTO.Id))
                return false;

            if (movieDTO.Description.Length > StaticValues.MovieDescriptionMaxLength)
                return false;

            if (movieDTO.MovieLengthInMinutes <= 0)
                return false;

            var movie = db.Movies.Find(movieDTO.Id);

            if (movie == null)
                return false;

            movie.Description = movieDTO.Description;
            movie.MovieLengthInMinutes = movieDTO.MovieLengthInMinutes;
            movie.ReleaseYear = movieDTO.ReleaseYear;
            movie.Title = movieDTO.Title;

            await UpdateMovieGenres(movie.Id, movieDTO.Genres);
            await UpdateMovieCrew(movie.Id, movieDTO.Crew);

            if (movieDTO.UpdatePhoto)
                movie.Poster = await fileService.UpdateMoviePoster(movie.Id, movie.Poster, movieDTO.File);

            db.Movies.Update(movie);
            db.SaveChanges();

            return true;
        }

        public async Task<bool> DeleteMovie(long id)
        {
            var movie = db.Movies.Find(id);

            if (movie != null)
            {
                fileService.DeleteMoviePoster(movie.Poster);

                db.Movies.Remove(movie);
                db.SaveChanges();
            }

            return true;
        }
        #endregion

        #region Crew
        private async Task InsertMovieCrew(long movieId, List<InsertMovieCrewDTO> crew)
        {
            if (crew == null)
                return;

            crew = crew.GroupBy(c => new { c.FilmCrew, c.PersonnelId })
                .Select(c => c.First())
                .ToList();

            var personnelList = new List<MoviePersonnel>();

            foreach (var personnel in crew)
            {
                if (await personnelService.IsPersonnelInDB(personnel.PersonnelId))
                {
                    personnelList.Add(new MoviePersonnel()
                    {
                        MemberPosition = personnel.FilmCrew,
                        MovieId = movieId,
                        PersonId = personnel.PersonnelId
                    });
                }
            }

            db.MoviePersonnel.AddRange(personnelList);
            db.SaveChanges();
        }

        private async Task UpdateMovieCrew(long movieId, List<InsertMovieCrewDTO> crew)
        {
            if (crew == null)
                crew = new List<InsertMovieCrewDTO>();

            crew = crew.GroupBy(c => new { c.FilmCrew, c.PersonnelId })
                .Select(c => c.First())
                .ToList();

            var existingMoviePersonnel = db.MoviePersonnel.Where(mp => mp.MovieId == movieId).ToList();

            var personnelList = new List<MoviePersonnel>();

            foreach (var personnel in crew)
            {
                if (await personnelService.IsPersonnelInDB(personnel.PersonnelId))
                {
                    var existingMP = existingMoviePersonnel.Find(mp => mp.PersonId == personnel.PersonnelId && mp.MemberPosition == personnel.FilmCrew);

                    if (existingMP != null)
                    {
                        existingMoviePersonnel.Remove(existingMP);
                    }
                    else
                    {
                        personnelList.Add(new MoviePersonnel()
                        {
                            MemberPosition = personnel.FilmCrew,
                            MovieId = movieId,
                            PersonId = personnel.PersonnelId
                        });
                    }
                }
            }

            db.MoviePersonnel.RemoveRange(existingMoviePersonnel);
            db.MoviePersonnel.AddRange(personnelList);
            db.SaveChanges();
        }
        #endregion

        #region Genres
        private async Task InsertMovieGenres(long movieId, List<long> genres)
        {
            if (genres == null)
                return;

            var genreList = new List<MovieGenre>();
            genres = genres.Distinct().ToList();

            foreach (var genreId in genres)
            {
                if (await genreService.IsGenreInDB(genreId))
                {
                    genreList.Add(new MovieGenre()
                    {
                        GenreId = genreId,
                        MovieId = movieId
                    });
                }
            }

            db.MovieGenres.AddRange(genreList);
            db.SaveChanges();
        }

        private async Task UpdateMovieGenres(long movieId, List<long> genres)
        {
            if (genres == null)
                genres = new List<long>();

            genres = genres.Distinct().ToList();

            var existingMovieGenres = db.MovieGenres.Where(mg => mg.MovieId == movieId).ToList();

            var genreList = new List<MovieGenre>();

            foreach (var genreId in genres)
            {
                if (await genreService.IsGenreInDB(genreId))
                {
                    var existingMG = existingMovieGenres.Find(mg => mg.GenreId == genreId);
                    if (existingMG != null)
                    {
                        existingMovieGenres.Remove(existingMG);
                    }
                    else
                    {
                        genreList.Add(new MovieGenre()
                        {
                            GenreId = genreId,
                            MovieId = movieId
                        });
                    }
                }
            }

            db.MovieGenres.AddRange(genreList);
            db.MovieGenres.RemoveRange(existingMovieGenres);
            db.SaveChanges();
        }
        #endregion

        #region Getters
        public async Task<GetMovieDTO> GetMovie(long id)
        {
            var movie = await db.Movies.FindAsync(id);

            if(movie == null)
            {
                return null;
            }

            var moviePoster = fileService.GetMoviePoster(movie.Poster);
            var movieGenres = await GetMovieGenres(id);
            var moviePersonnel = await GetMoviePersonnel(id);

            var movieDTO = new GetMovieDTO()
            {
                Id = movie.Id,
                Title = movie.Title,
                Description = movie.Description,
                ReleaseYear = movie.ReleaseYear,
                MovieLengthInMinutes = movie.MovieLengthInMinutes,
                AverageRating = movie.AverageRating,
                MoviePoster = moviePoster,
                Genres = movieGenres,
                Personnel = moviePersonnel
            };

            return movieDTO;
        }

        //public async Task<MovieReviewListWithFilters> GetMovieReviews(ReviewFilters reviewfilters)
        //{
        //    var pageSize = reviewfilters.PageSize ?? int.MaxValue;

        //    var allElements = db.Reviews.Count(r => r.MovieId == reviewfilters.Id);

        //    var result = new MovieReviewListWithFilters()
        //    {
        //        CurrentPage = reviewfilters.Page,
        //        PageSize = pageSize,
        //        AllPages = (int)Math.Ceiling(allElements * 1.0 / pageSize),
        //        AllElements = allElements
        //    };

        //    var reviews = db.Reviews
        //        .Where(r => r.MovieId == reviewfilters.Id)
        //        .Select(r => new MovieReviewInListDTO()
        //        {
        //            UserId = r.UserId,
        //            MovieId = r.MovieId,
        //            Rating = r.Rating,
        //            Message = r.Message,
        //        });

        //    switch (reviewfilters.OrderBy.ToLower())
        //    {
        //        case "ratingdesc":
        //            reviews = reviews.OrderByDescending(r => r.Rating);
        //            break;
        //        case "ratingasc":
        //            reviews = reviews.OrderBy(r => r.Rating);
        //            break;
        //        default:
        //            break;
        //    }

        //    reviews = reviews.Skip((reviewfilters.Page - 1) * pageSize).Take(pageSize);

        //    result.ReviewList = reviews.ToList();

        //    foreach(var review in result.ReviewList)
        //    {
        //        review.Username = await userService.GetUsername(review.UserId);
        //    }

        //    return result;
        //}

        public async Task<List<GenreInMovieDTO>> GetMovieGenres(long movieId)
        {
            return db.MovieGenres.Include(mg => mg.Genre)
                .Where(mg => mg.MovieId == movieId)
                .Select(mg => new GenreInMovieDTO()
                {
                    MovieId = mg.MovieId,
                    GenreId = mg.GenreId,
                    Name = mg.Genre.Name
                }).ToList();
        }

        public async Task<List<PersonnelInMovieDTO>> GetMoviePersonnel(long movieId)
        {
            return db.MoviePersonnel.Include(mp => mp.Personnel)
                .Where(mp => mp.MovieId == movieId)
                .Select(mp => new PersonnelInMovieDTO()
                {
                    MovieId = mp.MovieId,
                    PersonId = mp.PersonId,
                    MemberPosition = mp.MemberPosition,
                    Name = mp.Personnel.Name,
                    Surname = mp.Personnel.Surname
                }).ToList();
        }

        public async Task<MovieListWithFilters> GetMovieWithFilters(MovieFilters movieFilters)
        {
            if (string.IsNullOrWhiteSpace(movieFilters.Title))
            {
                movieFilters.Title = "";
            }

            var pageSize = movieFilters.PageSize.HasValue ? movieFilters.PageSize.Value : int.MaxValue;

            Func<Movie, bool> predicate = (m => m.Title.ToLower().Contains(movieFilters.Title.ToLower()) &&
                                (!movieFilters.ReleaseYearFrom.HasValue || m.ReleaseYear >= movieFilters.ReleaseYearFrom.Value) &&
                                (!movieFilters.ReleaseYearTo.HasValue || m.ReleaseYear <= movieFilters.ReleaseYearTo.Value) &&
                                (!movieFilters.MovieLengthFrom.HasValue || m.MovieLengthInMinutes >= movieFilters.MovieLengthFrom) &&
                                (!movieFilters.MovieLengthTo.HasValue || m.MovieLengthInMinutes <= movieFilters.MovieLengthTo) &&
                                (!movieFilters.AvgRatingFrom.HasValue || m.AverageRating >= movieFilters.AvgRatingFrom) &&
                                (!movieFilters.AvgRatingTo.HasValue || m.AverageRating <= movieFilters.AvgRatingTo) &&
                                (!movieFilters.GenreId.HasValue || m.Genres.Any(mg => mg.GenreId == movieFilters.GenreId)));

            var allElements = db.Movies.Include(m => m.Genres).Count(predicate);

            var result = new MovieListWithFilters()
            {
                CurrentPage = movieFilters.Page,
                PageSize = pageSize,
                AllPages = (int)Math.Ceiling(allElements * 1.0 / pageSize),
                AllElements = allElements
                
                
                
                //(int)Math.Ceiling(db.Actors.Count(p => (p.Name.ToLower() + p.Surname.ToLower()).Contains(personnelFilter.FullName.ToLower()) &&
                //    p.Nationality.ToLower().Contains(personnelFilter.Nationality.ToLower()) &&
                //    (!personnelFilter.BirthDateFrom.HasValue || p.DateOfBirth >= personnelFilter.BirthDateFrom.Value) &&
                //    (!personnelFilter.BirthDateTo.HasValue || p.DateOfBirth <= personnelFilter.BirthDateTo.Value))
                //                * 1.0 / pageSize)
            };

            var movies = db.Movies.Include(m => m.Genres)
                .Where(predicate).Select(m => new MovieInListDTO()
                {
                    AverageRating = m.AverageRating,
                    Id = m.Id,
                    MovieLengthInMinutes = m.MovieLengthInMinutes,
                    ReleaseYear = m.ReleaseYear,
                    Title = m.Title,
                    PosterName = m.Poster
                });

            switch (movieFilters.OrderBy?.ToLower())
            {
                case "titledesc":
                    movies = movies.OrderByDescending(m => m.Title);
                    break;
                case "titleasc":
                    movies = movies.OrderBy(m => m.Title);
                    break;
                case "releaseyeardesc":
                    movies = movies.OrderByDescending(m => m.ReleaseYear);
                    break;
                case "releaseyearasc":
                    movies = movies.OrderBy(m => m.ReleaseYear);
                    break;
                case "movielengthdesc":
                    movies = movies.OrderByDescending(m => m.MovieLengthInMinutes);
                    break;
                case "movielengthasc":
                    movies = movies.OrderBy(m => m.MovieLengthInMinutes);
                    break;
                case "averageratingdesc":
                    movies = movies.OrderByDescending(m => m.AverageRating);
                    break;
                case "averageratingasc":
                    movies = movies.OrderBy(m => m.AverageRating);
                    break;
                default:
                    break;
            }

            result.MovieList = movies.Skip((movieFilters.Page - 1) * pageSize).Take(pageSize).ToList();
            
            foreach(var movie in result.MovieList)
            {
                movie.Poster = fileService.GetMoviePoster(movie.PosterName);
                movie.Genres = (await GetMovieGenres(movie.Id)).Select(g => g.Name).ToList();
            }

            return result;
        }

        public List<MovieInSelectDTO> GetMoviesToSelect(SelectUsersFiltersDTO filters)
        {
            if (string.IsNullOrWhiteSpace(filters.StartsWith))
            {
                filters.StartsWith = "";
            }

            return db.Movies.Where(m => m.Title.StartsWith(filters.StartsWith))
                .OrderBy(m => m.Title)
                .Take(5)
                .Select(m => new MovieInSelectDTO()
                {
                    Id = m.Id,
                    Title = m.Title
                }).ToList();
        }
        #endregion

        public async Task<bool> DoesMovieExist(long movieId)
        {
            return (await db.Movies.FindAsync(movieId)) != null;
        }

        public async Task<bool> UpdateMovieRating(long movieId, double avgRating)
        {
            var movie = await db.Movies.FindAsync(movieId);

            movie.AverageRating = avgRating;

            db.Movies.Update(movie);
            db.SaveChanges();

            return true;
        }

        public async Task<FileDTO> GetMoviePoster(long movieId)
        {
            var movie = await db.Movies.FindAsync(movieId);

            if (movie == null)
                return null;

            return fileService.GetMoviePoster(movie.Poster);
        }

        #region Recommendations
        public async Task<List<MovieInListDTO>> GetRecommendations(RecommendationFiltersDTO filters)
        {
            var request = new RestRequest(moviePyRecommendUrl);
            request.AddParameter(nameof(filters.userAccountId), filters.userAccountId);
            request.AddParameter(nameof(filters.page), filters.page);
            request.AddParameter(nameof(filters.pageSize), filters.pageSize);

            try
            {
                var response = await this.moviePyClient.GetAsync<MoviePyResponseDTO<RecommendationsDTO>>(request);

                var movieList = new List<MovieInListDTO>();

                foreach (var movieId in response.Data.MovieIds)
                {
                    movieList.Add(await GetMovieForRecommendation(movieId));
                }

                return movieList;
            }
            catch (Exception e)
            {
                throw new InvalidOperationException("MoviePy API returned error", e);
            }
        }

        private async Task<MovieInListDTO> GetMovieForRecommendation(long movieId)
        {
            var movie = await db.Movies.FindAsync(movieId);

            if (movie == null)
            {
                return null;
            }

            var moviePoster = fileService.GetMoviePoster(movie.Poster);

            var movieDTO = new MovieInListDTO()
            {
                Id = movie.Id,
                Title = movie.Title,
                ReleaseYear = movie.ReleaseYear,
                MovieLengthInMinutes = movie.MovieLengthInMinutes,
                AverageRating = movie.AverageRating,
                Poster = moviePoster,
            };

            return movieDTO;
        }
        #endregion
    }
}
