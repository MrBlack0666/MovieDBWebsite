using BAS.AppServices;

namespace BAS.Services.Notification
{
    public class NotificationAggregateServices : INotificationAggregateServices
    {
        public AppConfig AppConfig { get; set; }

        public IUrlHelper UrlHelper { get; set; }

        public NotificationAggregateServices(AppConfig appConfig, IUrlHelper urlHelper)
        {
            this.AppConfig = appConfig;
            this.UrlHelper = urlHelper;
        }
    }
}
