import pymongo
from repositories.base_repo import BaseRepository

client = pymongo.MongoClient('localhost', 27006)
db = client['db-coursework']

sessions_repo = BaseRepository(db['sessions'])

