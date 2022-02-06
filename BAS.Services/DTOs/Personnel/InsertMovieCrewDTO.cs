using BAS.AppCommon;

namespace BAS.AppServices
{
    public class InsertMovieCrewDTO
    {
        public long PersonnelId { get; set; }
        public FilmCrew FilmCrew { get; set; }
    }
}
