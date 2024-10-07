import fs from 'fs';
import path from 'path';

const write = async () => {
  const fileToWrite = path.join(import.meta.dirname, 'files', 'fileToWrite.txt');
  const writeStream = fs.createWriteStream(fileToWrite, { encoding: 'utf-8' });

  process.stdin.pipe(writeStream);

  writeStream.on('finish', () => {
    console.log('Finished');
  });

  writeStream.on('error', (err) => {
    console.error('Error write stream:', err.message);
  });
};

await write();
