using BAS.AppCommon;
using BAS.AppServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BAS.Services.Notification
{
    public class RegistrationConfirmNotification : BaseNotification, INotification
    {
        private readonly IUserService userService;

        public RegistrationConfirmNotification(INotificationAggregateServices services, IUserService userService) : base(services)
        {
            this.userService = userService;
        }

        public NotificationType Type => NotificationType.REGISTRATION_CONFIRM;

        public override async Task<List<NotificationDTO>> CreateNotification(object data)
        {
            var args = data as RegistrationConfirmNotificationArgs;

            var user = await this.userService.GetUser(args.UserAccountId);

            var subject = "BAS Filmweb | Potwierdzenie rejestracji";
            var url = this.urlHelper.CreateClientUrl(args);
            var body = $"W celu ukończenia rejestracji proszę wejść na stronę: <a href=\"{url}\">Aktywuj konto</a>";

            var notification = new NotificationDTO
            {
                Email = user.Email,
                Subject = subject,
                Body = body,
            };

            var result = new List<NotificationDTO> { notification };
            return result;
        }
    }
}
