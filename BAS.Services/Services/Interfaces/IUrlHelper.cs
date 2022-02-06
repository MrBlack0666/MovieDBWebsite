using BAS.Services.Notification;

namespace BAS.Services
{
    public interface IUrlHelper
    {
        string CreateClientUrl(RegistrationConfirmNotificationArgs args);
    }
}
