#mongod --dbpath ./data/db/shard1/db1 --port 27001 --replSet replica --shardsvr
#mongod --dbpath ./data/db/shard1/db2 --port 27002 --replSet replica
#mongod --dbpath ./data/db/shard1/db3 --port 27003 --replSet replica

#mongod --dbpath ./data/db/shard2 --port 27004 --shardsvr --replSet replica2

#mongod --dbpath ./data/db/config --configsvr --port 27005 --replSet config

#mongos --configdb config/127.0.0.1:27005 --port 27006

#mongo --port 27006


#connect to server
#mongo --host 127.0.0.1 --port 27002