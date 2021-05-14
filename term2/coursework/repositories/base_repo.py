class BaseRepository:
    def __init__(self, collection):
        self.__collection = collection

    def insert(self, item) -> str:
        return self.__collection.insert_one(item).inserted_id

    def find_all(self, query={}):
        return self.find(query, True)

    def find(self, query={}, multiple=False):
        if multiple:
            results = self.__collection.find(query)
            return [r for r in results]
        else:
            return self.__collection.find_one(query)

    def update_one(self, query_elements, new_values):
        return self.__collection.update_one(query_elements, {'$set': new_values})

    def delete_one(self, query):
        self.__collection.delete_one(query)

