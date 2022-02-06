using BAS.AppServices;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BAS.Services.Notification
{
    public abstract class BaseNotification
    {
        protected readonly AppConfig appConfig;
        protected readonly IUrlHelper urlHelper;

        public BaseNotification(INotificationAggregateServices services)
        {
            this.appConfig = services.AppConfig;
            this.urlHelper = services.UrlHelper;
        }

        public virtual Task<List<NotificationDTO>> CreateNotification(object data)
        {
            throw new NotImplementedException();
        }
    }
}
