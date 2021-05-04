# todo add logging here or on services
from cui import get_input
import services.messages_service as messages_service
import services.users_service as users_service


class UserCUI:

    def __init__(self):
        self.username = None

    def start(self):
        selection = get_input(["Login", "Exit"])
        if selection == 1:
            name = input("Enter name: ")
            self.username = name
            users_service.register(name)
            self.main_menu()

    def main_menu(self):
        """Get message stats, logout, send message, inbox"""
        selection = 1
        while selection != 4:
            selection = get_input([
                "Send message",
                "Inbox",
                "Statistics",
                "Logout"
            ])
            if selection == 1:
                self.send_message()
            elif selection == 2:
                self.inbox()
            elif selection == 3:
                self.own_messages_stats()
            elif selection == 4:
                self.logout()

    def own_messages_stats(self):
        message_states, total_count = messages_service.get_user_messages_stats(self.username)
        print(message_states, f'Total count: {total_count}')
        pass

    def logout(self):
        users_service.logout(self.username)
        self.username = None
        self.start()

    def send_message(self):
        receiver_name = input("Enter receiver name: ")
        message = input("Enter message: ")
        tags = input('Enter message tags separated by comma. Eg. "dogs,sports": ')
        messages_service.send_message(message, self.username, receiver_name, tags)

    def inbox(self):
        """Print inbox messages"""
        messages = messages_service.get_user_incoming_messages(self.username)
        print('\n\n'.join([messages_service.message_to_string(f"message:{message}") for message in messages]))


def main():
    cui = UserCUI()
    cui.start()


if __name__ == '__main__':
    main()
