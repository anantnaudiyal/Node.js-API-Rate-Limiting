
# Node.js API Rate Limiting and Task Queuing

## Overview

This project demonstrates a Node.js API with a user task queuing system that incorporates rate limiting. The API is designed to handle multiple task requests per user while ensuring tasks are processed at a controlled rate. Clustering is achieved using PM2 to enhance the application's performance and reliability.

## Features

- **Task Queuing:** Ensures tasks are processed one at a time per user.
- **Rate Limiting:** Enforces a rate limit of 1 task per second and 20 tasks per minute for each user.
- **Clustering:** Utilizes PM2 to manage multiple instances of the Node.js application for improved performance.

## Technologies

- **Express:** Web framework for building the API.
- **Redis:** In-memory data store used for managing rate limiting and task queues.
- **rate-limiter-flexible:** A library for handling rate limiting logic.
- **PM2:** A process manager for Node.js applications, used for clustering.



## Setup

1. **Install Dependencies:**

   ```bash
   npm install
   ```

2. **Start Redis:**

   Make sure Redis is running on your system. You can start it with:

   ```bash
   redis-server
   ```

3. **Start the Node.js API with PM2:**

   Start the application with two instances for clustering:

   ```bash
   pm2 start server.js -i 2
   ```

4. **Check PM2 Status:**

   To monitor the status of your application:

   ```bash
   pm2 status
   ```

## API Usage

### Endpoint

- **POST /task**

  - **Headers:**
    - `Content-Type: application/json`
    - `user-id: <user-id>`
  - **Body:**
    - `{"task": "example"}`

### Example Request

```bash
curl -X POST http://localhost:3000/task -H "Content-Type: application/json" -H "user-id: test-user" -d '{"task": "example"}'
```

### Rate Limiting and Queuing

Use tools like Postman or curl to send requests to the `/task` endpoint. Ensure that the `user-id` is included in the headers. Observe how tasks are processed in compliance with the rate limits.

## Monitoring and Logs

Monitor the logs to check for any errors or issues with task processing:

```bash
pm2 logs
```

## License

This project is licensed under the MIT License.
