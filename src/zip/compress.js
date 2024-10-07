import path from 'path';
import fs from 'fs';
import zlib from 'zlib';

const __dirname = import.meta.dirname;

const compress = async () => {
  const sourceFilePath = path.resolve(__dirname, 'files', 'fileToCompress.txt');
  const destinationFilePath = path.resolve(__dirname, 'files', 'archive.gz');

  const readStream = fs.createReadStream(sourceFilePath);
  const writeStream = fs.createWriteStream(destinationFilePath);

  const gzipStream = zlib.createGzip();

  writeStream.on('finish', () => {
    console.log('File compressed successfully');
  });

  writeStream.on('error', (err) => {
    throw new Error('FS operation failed: file compression error');
  });

  readStream.pipe(gzipStream).pipe(writeStream);
};

await compress();
