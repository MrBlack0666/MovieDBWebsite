using BAS.AppCommon;
using System.Threading.Tasks;

namespace BAS.AppServices
{
    public interface INotificationService
    {
        Task CreateNotification(NotificationType notificationType, object data);
    }
}