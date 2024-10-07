import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const __dirname = import.meta.dirname;

const calculateHash = async () => {
  const filePath = await path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');
  const hash = crypto.createHash('sha256');
  const stream = fs.createReadStream(filePath);

  stream.on('data', (chunk) => {
    hash.update(chunk);
  });

  stream.on('end', () => {
    const result = hash.digest('hex');
    console.log(result);
  });

  stream.on('error', (err) => {
    console.error(`Error reading file: ${err.message}`);
  });
};

await calculateHash();
