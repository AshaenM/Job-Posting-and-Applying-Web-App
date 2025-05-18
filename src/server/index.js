import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const filePath = path.join(__dirname, '../applications.json');

// Ensure the file exists
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([]));
}

app.post('/apply', (req, res) => {
  const { name, email, resume, jobId } = req.body;

  let existingData = [];

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    existingData = fileContent ? JSON.parse(fileContent) : [];
  } catch (err) {
    console.error('Error reading or parsing JSON file:', err);
    existingData = [];
  }

  let newId = 1;
  if (existingData.length > 0) {
    const lastApp = existingData[existingData.length - 1];
    newId = parseInt(lastApp.applicationId) + 1;
  }

  const newApplication = {
    applicationId: newId.toString(),
    jobId,
    name,
    email,
    resume,
    status: 'Pending Review'
  };

  existingData.push(newApplication);
  fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

  res.status(201).json({ message: 'Application submitted successfully.' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
