const express = require('express');
const { RateLimiterMemory } = require('rate-limiter-flexible');
const redis = require('redis');
const { promisify } = require('util');

const app = express();
const port = process.env.PORT || 3000;

// Redis setup
const redisClient = redis.createClient();
const redisGetAsync = promisify(redisClient.get).bind(redisClient);
const redisSetAsync = promisify(redisClient.set).bind(redisClient);

// Rate limiter setup
const rateLimiter = new RateLimiterMemory({
  points: 1, // Number of points
  duration: 1, // Per second
});

const userRateLimiter = new RateLimiterMemory({
  points: 20, // Number of points
  duration: 60, // Per minute
});

// Middleware for rate limiting
const rateLimitMiddleware = async (req, res, next) => {
  const userId = req.headers['user-id'];
  if (!userId) {
    return res.status(400).send('User ID is required');
  }

  try {
    await Promise.all([
      rateLimiter.consume(userId), // 1 task per second
      userRateLimiter.consume(userId), // 20 tasks per minute
    ]);
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(429).send('Too Many Requests');
    }
  }
};

// Task queue
const taskQueue = new Map(); // In-memory task queue

const processTask = async (userId, task) => {
  // Simulate task processing
  console.log(`Processing task for user ${userId}`);
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated processing time
};

app.use(express.json());
app.use(rateLimitMiddleware);

app.post('/task', async (req, res) => {
  const userId = req.headers['user-id'];
  const task = req.body;

  if (!userId || !task) {
    return res.status(400).send('User ID and task are required');
  }

  if (!taskQueue.has(userId)) {
    taskQueue.set(userId, []);
  }

  const userQueue = taskQueue.get(userId);
  userQueue.push(task);

  if (userQueue.length === 1) {
    // Start processing if this is the first task in the queue
    processQueue(userId);
  }

  res.status(202).send('Task added to queue');
});

const processQueue = async (userId) => {
  const userQueue = taskQueue.get(userId);

  if (!userQueue || userQueue.length === 0) {
    return;
  }

  const task = userQueue.shift();
  await processTask(userId, task);

  // Process the next task in the queue
  if (userQueue.length > 0) {
    setTimeout(() => processQueue(userId), 1000);
  }
};

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
