# todo add logging here or on services

class UserCUI:

    def __init__(self):
        self.__user_id = None

    def start(self):
        """Register, login, exit"""
        print('')
    
    def main_menu(self):
        """Get message stats, logout, send message, inbox"""
        pass

    def own_messages_stats(self, user_id):
        """
        Print own messages stats here and get them
        from some kind of storage or service
        """
        pass

    def logout(self):
        self.__user_id = None
        self.start()
    
    def send_message(self):
        """Message menu and send one"""
        pass

    def inbox(self):
        """Print inbox messages"""
        pass



def main():
    cui = UserCUI()
    cui.start()

if __name__ == '__main__':
    main()