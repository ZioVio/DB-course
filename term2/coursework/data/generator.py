import utils
from random import choice, randint
from numpy import random
from faker import Faker
import uuid
from math import fabs

from db import sessions_repo
import os
from pathlib import Path

USERS_COUNT = 5000

SCREENS_FILEPATH = os.path.join(os.path.dirname(Path(__file__).absolute()), './screens.json')
COURSES_FILEPATH = os.path.join(os.path.dirname(Path(__file__).absolute()), './courses.json')
class DataGenerator:

    def __init__(self):
        self.__fake = Faker()
        self.__screens = utils.read_json(SCREENS_FILEPATH)
        self.__courses = utils.read_json(COURSES_FILEPATH)

    def get_screen_by_id(self, screen_id):
        for screen in self.__screens:
            if screen_id == screen.get('id', None):
                return screen
        return None

    def __generate_session(self):
        possible_initial_screen = [screen for screen in self.__screens if screen.get('can_be_initial', False)]
        random_start_screen = choice(possible_initial_screen)
        user_journey_length = randint(2, 12)
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
                screen_to_navigate_on_action = self.get_screen_by_id(action_navigation_screen_id)
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
                journey.append(self.get_screen_by_id(next_screen_id))

        for screen in journey:
            screen['actions'] = self.__generate_actions_on_screen(screen)

        return journey

    def __generate_actions_on_screen(self, screen):
        actions = screen.get('actions', [])
        if len(actions) == 0:
            return actions
        return [choice(actions)]

    def generate_sessions(self, count=USERS_COUNT):
        return [self.generate_session() for _ in range(count)]


    def generate_session(self):
        session = self.__generate_session()
        session_data = {
            'user_id': str(uuid.uuid4()),
            'screens': [],
        }
        for screen in session:
            session_data['screens'].append({
                'id': screen['id'],
                'name': screen['name'],
                'time': fabs(random.normal(loc=6000, scale=5000)),
                'actions': screen['actions']
            })
        return session_data


if __name__ == '__main__':
    datagen = DataGenerator()
    sessions = datagen.generate_sessions()
    for session in sessions:
        sessions_repo.insert(session)
