import utils
from random import choice, randint


class DataGenerator:
    def __init__(self):
        self.__screens = utils.read_json('./screens.json')
        self.__users = utils.read_json('./users.json')
        self.__courses = utils.read_json('./courses.json')
        # self.generator_fns_map = {
        #     'RANDOM_COURSE_ID': lambda: self.__get_random_course_id(),
        # }

    def __get_random_course_id(self, user_id):
        found_users = [user for user in self.__users if user['id'] == user_id]
        if len(found_users) == 0:
            return None
        return choice(found_users[0]['courses'])

    def __get_screen_by_id(self, screen_id):
        for screen in self.__screens:
            if screen_id == screen.get('id', None):
                return screen
        return None

    def __generate_session(self, user_id):
        possible_initial_screen = [screen for screen in self.__screens if screen.get('can_be_initial', False)]
        random_start_screen = choice(possible_initial_screen)
        user_journey_length = randint(2, 15)
        journey = [random_start_screen]
        actions = [*self.__generate_actions_on_screen(journey[0])]
        for i in range(1, user_journey_length):
            prev_screen = journey[i - 2] if i >= 2 else None
            curr_screen = journey[i - 1]
            last_action = {}
            if 1 <= i < len(actions):
                last_action = actions[i - 1]

            action_navigation_screen_id = last_action.get('navigates_to', None)
            if action_navigation_screen_id is not None:
                screen_to_navigate_on_action = self.__get_screen_by_id(action_navigation_screen_id)
                if screen_to_navigate_on_action:
                    journey.append()
                continue

            next_possible_screen_weighted_ids = curr_screen.get('can_go_to', []).copy()
            if prev_screen:
                next_possible_screen_weighted_ids.append([prev_screen['id'], 20])

            if len(next_possible_screen_weighted_ids) == 0:
                if prev_screen:
                    journey.append(prev_screen)
                else:
                    break
            else:
                next_screen_id = utils.weighted_choice(next_possible_screen_weighted_ids)
                journey.append(self.__get_screen_by_id(next_screen_id))

        actions = []
        for screen in journey:
            actions.extend(self.__generate_actions_on_screen(screen))

        return journey, actions

    def __generate_actions_on_screen(self, screen):
        actions = screen.get('actions', [])
        if len(actions) == 0:
            return actions
        return [choice(actions)]

    def run(self):
        for user in self.__users:
            session, actions = self.__generate_session(user.get('id', None))
            print(session)
            print(actions)


datagen = DataGenerator()
datagen.run()
