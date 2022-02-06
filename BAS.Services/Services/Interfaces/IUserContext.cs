using BAS.AppCommon;

namespace BAS.Services
{
    public interface IUserContext
    {
        long? UserAccountId { get; }
        bool IsAuthenticated { get; }
        bool IsInRole(UserRole role);
    }
}
