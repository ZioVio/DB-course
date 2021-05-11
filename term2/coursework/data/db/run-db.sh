mongod --dbpath ./data/db/db1 --port 27001 --replSet replica
mongod --dbpath ./data/db/db2 --port 27002 --replSet replica
mongod --dbpath ./data/db/db3 --port 27003 --replSet replica

#connect to server
#mongo --host 127.0.0.1 --port 27002