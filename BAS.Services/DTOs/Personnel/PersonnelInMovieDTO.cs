using BAS.AppCommon;

namespace BAS.AppServices
{
    public class PersonnelInMovieDTO
    {
        public long MovieId { get; set; }
        public long PersonId { get; set; }
        public FilmCrew MemberPosition { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
    }
}
