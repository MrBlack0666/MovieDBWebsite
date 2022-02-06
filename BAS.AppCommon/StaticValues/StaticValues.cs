namespace BAS.AppCommon
{
    public static class StaticValues
    {
        public const int GenreNameMaxLength = 20;
        public const int GenreDescriptionMaxLength = 100;

        public const int MoviePosterMaxLength = 50;
        public const int MovieTitleMaxLength = 100;
        public const int MovieDescriptionMaxLength = 2000;
        public const int MoviePosterMaxFileSize = 1048576;

        public const int PersonnelNameMaxLength = 100;
        public const int PersonnelSurnameMaxLength = 100;
        public const int PersonnelNationalityMaxLength = 100;

        public const int MovieItemsLoaded = 20;

        public const int ReviewContentMaxLength = 500;

        #region JWTToken
        public const string JWTUserAccountIdClaim = "id";
        public const string JWTRoleClaim = "role";
        public const string JWTFirstNameClaim = "firstname";
        public const string JWTLastNameClaim = "lastname";
        #endregion
    }
}
