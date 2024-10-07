import fs from 'fs/promises';
import path from 'path';

const __dirname = import.meta.dirname;

const read = async () => {
  const fileToRead = path.join(__dirname, 'files', 'fileToRead.txt');
  try {
    const content = (await fs.readFile(fileToRead)).toString();
    console.log(content);
  } catch (e) {
    throw new Error('FS operation failed: File to read does not exist');
  }
};

await read();
