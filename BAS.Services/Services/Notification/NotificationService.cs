using BAS.AppCommon;
using BAS.Services.Notification;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace BAS.AppServices
{
    public class NotificationService : INotificationService
    {
        private readonly Dictionary<NotificationType, INotification> notifications;
        private readonly AppConfig appConfig;

        public NotificationService(IEnumerable<INotification> notifications, AppConfig appConfig)
        {
            this.notifications = notifications.ToDictionary(x => x.Type);
            this.appConfig = appConfig;
        }

        public async Task CreateNotification(NotificationType notificationType, object data)
        {
            var notifications = await this.notifications[notificationType].CreateNotification(data);
            this.SendEmail(notifications);
        }

        private void SendEmail(List<NotificationDTO> notifications)
        {
            var client = new SmtpClient();
            client.Credentials = new NetworkCredential(this.appConfig.Email.Email, this.appConfig.Email.Password);
            client.EnableSsl = true;
            client.Host = this.appConfig.Email.Host;
            client.Port = this.appConfig.Email.Port;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;

            foreach (var notification in notifications)
            {
                var mailMessage = new MailMessage();
                mailMessage.From = new MailAddress(this.appConfig.Email.Email);
                mailMessage.Subject = notification.Subject;
                mailMessage.IsBodyHtml = true;
                mailMessage.Body = notification.Body;
                mailMessage.To.Add(new MailAddress(notification.Email));
                client.Send(mailMessage);
            }
        }
    }
}
