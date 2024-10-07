import fs from 'fs';
import path from 'path';

const read = async () => {
  const fileToRead = path.join(import.meta.dirname, 'files', 'fileToRead.txt');
  const readStream = fs.createReadStream(fileToRead, { encoding: 'utf-8' });

  readStream.pipe(process.stdout);

  readStream.on('error', (err) => {
    console.error('Error reading the file:', err.message);
  });
};

await read();
