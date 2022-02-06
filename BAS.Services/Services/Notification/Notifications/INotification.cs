using BAS.AppCommon;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BAS.Services.Notification
{
    public interface INotification
    {
        NotificationType Type { get; }

        Task<List<NotificationDTO>> CreateNotification(object data);
    }
}
