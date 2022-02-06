using BAS.AppCommon;
using BAS.AppServices;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace BAS.Tests.Integration
{
    public class MovieServiceTests : BaseIntegrationTest
    {
        public MovieServiceTests(IntegrationTestsFixture services)
            : base(services)
        {
        }

        #region InsertMovie
        [Fact]
        public async Task AddMovie_NoCrewNoGenresNoPhoto_ReturnsTrue()
        {
            try
            {
                var movieService = this.serviceProvider.GetService<IMovieService>();
                var movie = new InsertUpdateMovieDTO()
                {
                    Title = "TestMovieTitle",
                    Description = "TestMovieDescription",
                    ReleaseYear = 2010,
                    MovieLengthInMinutes = 90,
                };

                var result = await movieService.InsertMovie(movie);
                Assert.True(result);
            }
            catch (Exception e)
            {
                logger.Error(e);
                Assert.True(false);
            }
        }

        [Fact]
        public async Task AddMovie_WithPhotoNoCrewNoGenres_ReturnsTrue()
        {
            try
            {
                var movieService = this.serviceProvider.GetService<IMovieService>();

                using(var stream = new FileStream(StaticValues.TestImagePath, FileMode.Open))
                {
                    var formFile = new FormFile(stream, 0, stream.Length, string.Empty,
                        StaticValues.TestImageName);
                    var movie = new InsertUpdateMovieDTO()
                    {
                        Title = "TestMovieTitle",
                        Description = "TestMovieDescription",
                        ReleaseYear = 2010,
                        MovieLengthInMinutes = 90,
                        File = formFile,
                    };

                    var result = await movieService.InsertMovie(movie);
                    Assert.True(result);
                }
            }
            catch (Exception e)
            {
                logger.Error(e);
                Assert.True(false);
            }
        }

        [Fact]
        public async Task AddMovie_WithExistingAndNonexistingCrewAndGenres_ReturnsTrue()
        {
            try
            {
                var movieService = this.serviceProvider.GetService<IMovieService>();
                var genreService = this.serviceProvider.GetService<IGenreService>();
                var personnelService = this.serviceProvider.GetService<IPersonnelService>();
                await genreService.InsertGenre(new GenreDTO() { Description = "", Name = "Halo 1" });
                await genreService.InsertGenre(new GenreDTO() { Description = "", Name = "Halo 2" });
                await genreService.InsertGenre(new GenreDTO() { Description = "", Name = "Halo 3" });
                await genreService.InsertGenre(new GenreDTO() { Description = "", Name = "Halo 4" });
                await personnelService.InsertPersonnel(new PersonnelDTO() { DateOfBirth = DateTime.Now.AddDays(-1), Name="Test", Surname = "Test 1", Nationality="Test"});
                await personnelService.InsertPersonnel(new PersonnelDTO() { DateOfBirth = DateTime.Now.AddDays(-1), Name = "Test", Surname = "Test 2", Nationality = "Test" });
                await personnelService.InsertPersonnel(new PersonnelDTO() { DateOfBirth = DateTime.Now.AddDays(-1), Name = "Test", Surname = "Test 3", Nationality = "Test" });
                await personnelService.InsertPersonnel(new PersonnelDTO() { DateOfBirth = DateTime.Now.AddDays(-1), Name = "Test", Surname = "Test 4", Nationality = "Test" });
                var genreList = genreService.GetGenres();
                var personnelList = await personnelService.GetPersonnelWtihFilter(new PersonnelFilters() { Page = 1 });

                using (var stream = new FileStream(StaticValues.TestImagePath, FileMode.Open))
                {
                    var formFile = new FormFile(stream, 0, stream.Length, string.Empty,
                        StaticValues.TestImageName);
                    var genresInMovie = genreList.OrderBy(g => g.Id).Select(g => g.Id).Take(3).ToList();
                    genresInMovie.Add(genresInMovie.First());
                    genresInMovie.Add(genresInMovie.First() - 1);
                    var temp_personnelInMovie = personnelList.PersonnelList.OrderBy(p => p.Id).Select(p => p.Id).TakeLast(3).ToList();
                    temp_personnelInMovie.Add(temp_personnelInMovie.Last());
                    temp_personnelInMovie.Add(temp_personnelInMovie.Last() + 1);
                    var personnelInMovie = new List<InsertMovieCrewDTO>();
                    bool first = true;
                    foreach (var personnelId in temp_personnelInMovie)
                    {
                        if (first)
                        {
                            personnelInMovie.Add(new InsertMovieCrewDTO()
                            {
                                FilmCrew = FilmCrew.Writer,
                                PersonnelId = personnelId
                            });
                            personnelInMovie.Add(new InsertMovieCrewDTO()
                            {
                                FilmCrew = FilmCrew.Director,
                                PersonnelId = personnelId
                            });
                            first = false;
                        }
                        else
                        {
                            personnelInMovie.Add(new InsertMovieCrewDTO()
                            {
                                FilmCrew = FilmCrew.Actor,
                                PersonnelId = personnelId
                            });
                        }
                    }

                    var movie = new InsertUpdateMovieDTO()
                    {
                        Title = "TestMovieTitle",
                        Description = "TestMovieDescription",
                        ReleaseYear = 2010,
                        MovieLengthInMinutes = 90,
                        File = formFile,
                        Genres = genresInMovie,
                        Crew = personnelInMovie
                    };

                    var result = await movieService.InsertMovie(movie);
                    var addedMovieId = movieService.GetMovieWithFilters(new MovieFilters() { Page = 1 }).Result.MovieList.First().Id;
                    var addedMovie = await movieService.GetMovie(addedMovieId);

                    Assert.True(result && addedMovie.Personnel.Count == 4 && addedMovie.Genres.Count == 3);
                }
            }
            catch (Exception e)
            {
                logger.Error(e);
                Assert.True(false);
            }
        }
        #endregion

        #region GetMoviesToSelect
        [Fact]
        public async Task GetMoviesToSelect_SelectMoviesForTitle_ReturnsTrue()
        {
            try
            {
                var movieService = this.serviceProvider.GetService<IMovieService>();
                await SeedMoviesWithoutGenresPersonnelAndPhoto(movieService);

                var result1 = movieService.GetMoviesToSelect(new SelectUsersFiltersDTO());
                var result2 = movieService.GetMoviesToSelect(new SelectUsersFiltersDTO() { StartsWith = "" });
                var result3 = movieService.GetMoviesToSelect(new SelectUsersFiltersDTO() { StartsWith = "Mo" });
                var result4 = movieService.GetMoviesToSelect(new SelectUsersFiltersDTO() { StartsWith = "Movie" });
                var result5 = movieService.GetMoviesToSelect(new SelectUsersFiltersDTO() { StartsWith = "1" });

                Assert.True(result1.Count == 5 &&
                            result2.Count == 5 &&
                            result3.Count == 3 &&
                            result4.Count == 2 &&
                            result5.Count == 0);


            }
            catch (Exception e)
            {
                logger.Error(e);
                Assert.True(false);
            }
        }
        #endregion

        #region GetMovieWithFilters
        [Fact]
        public async Task GetMovieWithFilters_CheckIfFilteringWorkingWithoutCheckingGenre_ReturnsTrue()
        {
            try
            {
                var movieService = this.serviceProvider.GetService<IMovieService>();
                await SeedMoviesWithoutGenresPersonnelAndPhoto(movieService);

                var result1 = await movieService.GetMovieWithFilters(new MovieFilters() { Page = 2, PageSize = 5});
                var result2 = await movieService.GetMovieWithFilters(new MovieFilters() { Page = 1, PageSize = 20, Title = "2", MovieLengthTo = 100 });
                var result3 = await movieService.GetMovieWithFilters(new MovieFilters() { Page = 1, PageSize = 10, ReleaseYearFrom = 1950, ReleaseYearTo = 2020, AvgRatingTo = 0, MovieLengthFrom = 40, MovieLengthTo = 200 });
                var result4 = await movieService.GetMovieWithFilters(new MovieFilters() { Page = 1, PageSize = 8, ReleaseYearFrom = 1950, ReleaseYearTo = 2019, MovieLengthFrom = 41, MovieLengthTo = 200 });

                Assert.True(result1.MovieList.Count == 3 && result1.AllPages == 2 &&
                            result2.MovieList.Count == 2 &&
                            result3.MovieList.Count == 8 &&
                            result4.MovieList.Count == 6 );


            }
            catch (Exception e)
            {
                logger.Error(e);
                Assert.True(false);
            }
        }
        #endregion

        #region Seeders
        private async Task SeedMoviesWithoutGenresPersonnelAndPhoto(IMovieService movieService)
        {
            var movie1 = new InsertUpdateMovieDTO()
            {
                Title = "Movie 1",
                Description = "TestMovieDescription",
                ReleaseYear = 2010,
                MovieLengthInMinutes = 90
            };
            var movie2 = new InsertUpdateMovieDTO()
            {
                Title = "Movie 2",
                Description = "TestMovieDescription",
                ReleaseYear = 2020,
                MovieLengthInMinutes = 200
            };
            var movie3 = new InsertUpdateMovieDTO()
            {
                Title = "Film 1",
                Description = "TestMovieDescription",
                ReleaseYear = 1950,
                MovieLengthInMinutes = 44
            };
            var movie4 = new InsertUpdateMovieDTO()
            {
                Title = "Film 2",
                Description = "TestMovieDescription",
                ReleaseYear = 2011,
                MovieLengthInMinutes = 100
            };
            var movie5 = new InsertUpdateMovieDTO()
            {
                Title = "Film 3",
                Description = "TestMovieDescription",
                ReleaseYear = 2010,
                MovieLengthInMinutes = 55
            };
            var movie6 = new InsertUpdateMovieDTO()
            {
                Title = "Test 1",
                Description = "TestMovieDescription",
                ReleaseYear = 2010,
                MovieLengthInMinutes = 90
            };
            var movie7 = new InsertUpdateMovieDTO()
            {
                Title = "Mo Salah 232",
                Description = "TestMovieDescription",
                ReleaseYear = 1960,
                MovieLengthInMinutes = 40
            };
            var movie8 = new InsertUpdateMovieDTO()
            {
                Title = "Madio Sane 333",
                Description = "TestMovieDescription",
                ReleaseYear = 1977,
                MovieLengthInMinutes = 200
            };

            await movieService.InsertMovie(movie1);
            await movieService.InsertMovie(movie2);
            await movieService.InsertMovie(movie3);
            await movieService.InsertMovie(movie4);
            await movieService.InsertMovie(movie5);
            await movieService.InsertMovie(movie6);
            await movieService.InsertMovie(movie7);
            await movieService.InsertMovie(movie8);
        }
        #endregion
    }
}
