using BAS.AppCommon;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BAS.Database
{
    public class Personnel
    {
        public long Id { get; set; }
        [MaxLength(StaticValues.PersonnelNameMaxLength)]
        [Required]
        public string Name { get; set; }
        [MaxLength(StaticValues.PersonnelSurnameMaxLength)]
        [Required]
        public string Surname { get; set; }
        [MaxLength(StaticValues.PersonnelNationalityMaxLength)]
        [Required]
        public string Nationality { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
        public virtual List<MoviePersonnel> Movies { get; set; }
    }
}
