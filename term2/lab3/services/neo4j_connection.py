from neo4j import GraphDatabase

class Neo4jConnection:
    def __init__(self):
        self.__driver = GraphDatabase.driver("neo4j://localhost:7687", auth=("neo4j", "password"))

    @staticmethod
    def __add_message(tx, message_dict):
        tags = message_dict['tags'].split(',')
        query = ["CREATE (msg:Message {id: $id})"]
        for idx, tag in enumerate(tags):
            if tag != '' and tag is not None:

                query.append(f"MERGE (tag{idx}:Tag {{ name: '{tag}' }})")
                query.append(f"CREATE (msg)-[:HAS_TAG]->(tag{idx})")
        query.append("MERGE (sender:User {username: $senderName})-[:SENT]->(msg)")
        query.append("MERGE (msg)-[:TO]->(receiver:User {username: $receiverName})")
        query_string = '\n'.join(query)
        print('\n' + query_string + '\n')
        tx.run(
            query_string,
            id=message_dict['id'],
            senderName=message_dict['sender-name'],
            receiverName=message_dict['receiver-name']
        )

    def add_message(self, message_dict):
        with self.__driver.session() as session:
            session.write_transaction(self.__add_message, message_dict)

    def __register_user(self, tx, username):
        tx.run(
            "CREATE (user:User {username: $username, id: $username})",
            username=username
        )

    def register_user(self, username):
        with self.__driver.session() as session:
            session.write_transaction(self.__register_user, username)


g = Neo4jConnection()
