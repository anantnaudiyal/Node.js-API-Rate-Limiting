# Node.js API Rate Limiting
============================

Node Assignment: User Task Queuing with Rate Limiting Task: Your task is to build a Node.js API cluster with two replica sets and create a route to handle a simple task. The task has a rate limit of 1 task per second and 20 task per min for each user ID. Users will hit the route to process tasks multiple times. You need to implement a queueing system to ensure that tasks are processed according to the rate limit for each user ID. 

### Dependencies Used :

express : for building the API.
redis : for in-memory data storage.
rate-limiter-flexible : for handling rate limiting.

### clustering

For clustering we used PM2 , a popular process manager for Node.js applications. It provides features for managing and monitoring applications.


## Start and Check Status

#### Start the Cluster 
bash:  pm2 start server.js -i 2


#### Check PM2 Status
bash:  pm2 status


## Test the API

#### Test the Rate Limiting and Queuing:

Use tools like Postman or curl to send requests to your API. Make sure to include the user-id in the headers and observe the rate limiting behavior.

#### bash
curl -X POST http://localhost:3000/task -H "Content-Type: application/json" -H "user-id: test-user" -d '{"task": "example"}'


## Monitor Logs and Performance:

Monitor the logs using PM2 to check for any errors or issues with task processing.

#### bash 
pm2 logs


#   N o d e . j s - A P I - R a t e - L i m i t i n g 
 
 
