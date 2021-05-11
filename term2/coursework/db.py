import pymongo
from repositories.base_repo import BaseRepository

client = pymongo.MongoClient('localhost', 27017)
db = client['db-coursework']

sessions_repo = BaseRepository(db['sessions'])
actions_repo = BaseRepository(db['actions'])

