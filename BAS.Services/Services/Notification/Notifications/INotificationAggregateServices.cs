using BAS.AppServices;

namespace BAS.Services.Notification
{
    public interface INotificationAggregateServices
    {
        AppConfig AppConfig { get; set; }

        IUrlHelper UrlHelper { get; set; }
    }
}
