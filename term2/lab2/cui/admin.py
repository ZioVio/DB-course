from cui import get_input
import services.users_service as users_service


class AdminCUI:

    def __init__(self):
        pass

    def start(self):
        selection = 1
        while selection != 5:
            selection = get_input([
                "Logs",
                "Users online",
                "Most active senders",
                "Most active spammers",
                "Exit"
            ])
            if selection == 1:
                self.logs()
            elif selection == 2:
                self.users_online()
            elif selection == 3:
                self.most_active_senders()
            elif selection == 4:
                self.most_active_spammers()


    def logs(self):
        print('LOGS')


    def users_online(self):
        users = users_service.get_users_online()
        if len(users) == 0:
            print("No users online")
        else:
            print(f"Total users online {len(users)}")
            print('\n'.join(users))


    def most_active_senders(self):
        senders = users_service.get_most_active_senders()
        if len(senders) == 0:
            print("Np messages sent yet")
        else:
            print('\n'.join([f"{user} - {count}" for (user, count) in senders]))


    def most_active_spammers(self):
        print('MOST ACTIVE SPAMMERS')


def main():
    cui = AdminCUI()
    cui.start()


if __name__ == '__main__':
    main()
