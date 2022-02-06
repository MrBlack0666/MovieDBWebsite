using System;

namespace BAS.AppServices
{
    public class PersonnelDTO
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Nationality { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
}
