require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const { logger } = require('@sugarstudio/utils');
const { startCronJobs } = require('./src/workers/cronJobs'); // Import startCronJobs

const app = express();
const PORT = process.env.PORT || 3010;

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Orchestrator is healthy' });
});

// Endpoint to run a task (placeholder)
app.post('/run', (req, res) => {
  const { taskName, payload } = req.body;
  logger.info(`Received task: ${taskName} with payload: ${JSON.stringify(payload)}`);

  // Placeholder for task execution logic
  const logMessage = `Task '${taskName}' executed at ${new Date().toISOString()}\n`;
  fs.appendFileSync(path.join(__dirname, 'logs', 'orchestrator.log'), logMessage);

  res.json({ message: `Task '${taskName}' received and logged.` });
});

// Endpoint to write SOP (placeholder)
app.post('/write-sop', (req, res) => {
  const { sopName, content } = req.body;
  const sopPath = path.join(__dirname, 'sop', `${sopName}.txt`);
  fs.writeFileSync(sopPath, content);
  logger.info(`SOP '${sopName}' written.`);
  res.json({ message: `SOP '${sopName}' written successfully.` });
});

app.listen(PORT, () => {
  logger.info(`Orchestrator running on port ${PORT}`);
  startCronJobs(); // Start cron jobs when the server begins listening
});
