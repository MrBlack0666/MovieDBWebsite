using BAS.AppCommon;
using BAS.AppServices;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace BAS.Tests.Integration
{
    public class GenreServiceTests : BaseIntegrationTest
    {
        public GenreServiceTests(IntegrationTestsFixture services)
            : base(services)
        {
        }

        #region InsertGenre
        [Fact]
        public async Task InsertGenre_EmptyGenreDTO_ReturnsFalse()
        {
            try
            {
                var genreService = this.serviceProvider.GetService<IGenreService>();
                var genre = new GenreDTO();

                var result = await genreService.InsertGenre(genre);
                Assert.False(result);
            }
            catch (Exception e)
            {
                logger.Error(e);
                Assert.True(false);
            }
        }

        [Fact]
        public async Task InsertGenre_InsertExistingGenre_ReturnsFalse()
        {
            try
            {
                var genreService = this.serviceProvider.GetService<IGenreService>();
                await SeedGenres(genreService);
                var genre = new GenreDTO()
                { 
                    Description = "",
                    Name = "Test 2"
                };

                var result = await genreService.InsertGenre(genre);
                Assert.False(result);
            }
            catch (Exception e)
            {
                logger.Error(e);
                Assert.True(false);
            }
        }

        [Fact]
        public async Task InsertGenre_InsertTwoTimesNewSameGenre_ReturnsFalse()
        {
            try
            {
                var genreService = this.serviceProvider.GetService<IGenreService>();
                await SeedGenres(genreService);
                var genre1 = new GenreDTO()
                {
                    Description = "",
                    Name = "New"
                };
                var genre2 = new GenreDTO()
                {
                    Description = "",
                    Name = "New"
                };

                var result1 = await genreService.InsertGenre(genre1);
                var result2 = await genreService.InsertGenre(genre2);
                Assert.False(!result1 && result2);
            }
            catch (Exception e)
            {
                logger.Error(e);
                Assert.True(false);
            }
        }
        #endregion

        #region UpdateGenre
        [Fact]
        public async Task UpdateGenre_UpdateNonExistingGenre_ReturnsFalse()
        {
            try
            {
                var genreService = this.serviceProvider.GetService<IGenreService>();
                var genre = new GenreDTO()
                {
                    Id = 1,
                    Description = "new",
                    Name = "Update genre"
                };

                var result = await genreService.UpdateGenre(genre);
                Assert.False(result);
            }
            catch (Exception e)
            {
                logger.Error(e);
                Assert.True(false);
            }
        }

        [Fact]
        public async Task UpdateGenre_UpdateExistingGenre_ReturnsTrue()
        {
            try
            {
                var genreService = this.serviceProvider.GetService<IGenreService>();
                await SeedGenres(genreService);
                var genreId = genreService.GetGenres().First().Id;
                var genreDTO = new GenreDTO()
                {
                    Id = genreId,
                    Description = "updated",
                    Name = "Update genre 1"
                };

                var result = await genreService.UpdateGenre(genreDTO);
                Assert.True(result);
            }
            catch (Exception e)
            {
                logger.Error(e);
                Assert.True(false);
            }
        }
        #endregion

        #region DeleteGenre
        [Fact]
        public async Task DeleteGenre_DeleteNonexistingGenre_CountSame()
        {
            try
            {
                var genreService = this.serviceProvider.GetService<IGenreService>();
                await SeedGenres(genreService);
                var countBeforeDelete = genreService.GetGenres().Count;
                var genreId = genreService.GetGenres().OrderBy(g => g.Id).Last().Id + 1;

                await genreService.DeleteGenre(genreId);
                var countAfterDelete = genreService.GetGenres().Count;

                Assert.Equal(countBeforeDelete, countAfterDelete);
            }
            catch (Exception e)
            {
                logger.Error(e);
                Assert.True(false);
            }
        }

        [Fact]
        public async Task DeleteGenre_DeleteExistingGenre_OneGenreLess()
        {
            try
            {
                var genreService = this.serviceProvider.GetService<IGenreService>();
                await SeedGenres(genreService);
                var countBeforeDelete = genreService.GetGenres().Count;
                var genreId = genreService.GetGenres().Last().Id;

                await genreService.DeleteGenre(genreId);
                var countAfterDelete = genreService.GetGenres().Count;

                Assert.Equal(countBeforeDelete, countAfterDelete + 1);
            }
            catch (Exception e)
            {
                logger.Error(e);
                Assert.True(false);
            }
        }
        #endregion

        #region GetGenre
        [Fact]
        public async Task GetGenre_GetExistingAndNonexistingGenre_GenreObjectAndNull()
        {
            try
            {
                var genreService = this.serviceProvider.GetService<IGenreService>();
                await SeedGenres(genreService);
                var genreId = genreService.GetGenres().OrderBy(g => g.Id).Last().Id;

                var genre1 = await genreService.GetGenre(genreId);
                var genre2 = await genreService.GetGenre(genreId + 1);

                Assert.NotNull(genre1);
                Assert.Null(genre2);
            }
            catch (Exception e)
            {
                logger.Error(e);
                Assert.True(false);
            }
        }
        #endregion

        #region GetGenresByName
        [Fact]
        public async Task GetGenresByName_CheckIfFilteringWorking_ReturnsTrue()
        {
            try
            {
                var genreService = this.serviceProvider.GetService<IGenreService>();
                await SeedGenres(genreService);

                var result1 = await genreService.GetGenresByName(new GetGenresFiltersDTO() { Page = 1 });
                var result2 = await genreService.GetGenresByName(new GetGenresFiltersDTO() { Page = 1, PageSize = 5});
                var result3 = await genreService.GetGenresByName(new GetGenresFiltersDTO() { Page = 2, PageSize = 3, Name = "tESt"});
                var result4 = await genreService.GetGenresByName(new GetGenresFiltersDTO() { Page = 1, Name = "1" });
                var result5 = await genreService.GetGenresByName(new GetGenresFiltersDTO() { Page = 2, PageSize = 3, Name = "nie existing" });

                Assert.True(result1.GenreList.Count == 11);
                Assert.True(result2.GenreList.Count == 5);
                Assert.True(result3.GenreList.Count == 2);
                Assert.True(result4.GenreList.Count == 6);
                Assert.True(result5.GenreList.Count == 0);
            }
            catch (Exception e)
            {
                logger.Error(e);
                Assert.True(false);
            }
        }
        #endregion

        #region Seeders
        private async Task SeedGenres(IGenreService genreService)
        {
            await genreService.InsertGenre(new GenreDTO() { Description = "", Name = "Test 1"});
            await genreService.InsertGenre(new GenreDTO() { Description = "", Name = "Test 2" });
            await genreService.InsertGenre(new GenreDTO() { Description = "", Name = "Test 3" });
            await genreService.InsertGenre(new GenreDTO() { Description = "", Name = "Genre 11" });
            await genreService.InsertGenre(new GenreDTO() { Description = "", Name = "Genre 12" });
            await genreService.InsertGenre(new GenreDTO() { Description = "", Name = "Genre 13" });
            await genreService.InsertGenre(new GenreDTO() { Description = "", Name = "Genre 224" });
            await genreService.InsertGenre(new GenreDTO() { Description = "", Name = "Super 1" });
            await genreService.InsertGenre(new GenreDTO() { Description = "", Name = "SuperTest 4" });
            await genreService.InsertGenre(new GenreDTO() { Description = "", Name = "Gen 1" });
            await genreService.InsertGenre(new GenreDTO() { Description = "", Name = "SuperTestXD 6" });
        }
        #endregion
    }
}
