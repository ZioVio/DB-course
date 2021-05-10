import utils
from random import choice

class DataGenerator:
    def __init__(self):
        self.__screens = utils.read_json('./screens.json')
        self.__users = utils.read_json('./users.json')
        self.__courses = utils.read_json('./courses.json')
        self.generator_fns_map = {
            'RANDOM_COURSE_ID': lambda: self.__get_random_course(),
        }

    def __get_random_course_id(self, user_id):
        return choice(self.__courses)

    def run(self):






datagen = DataGenerator()
