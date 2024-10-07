import path from 'path';
import fs from 'fs';
import zlib from 'zlib';

const __dirname = import.meta.dirname;

const decompress = async () => {
  const sourceFilePath = path.resolve(__dirname, 'files', 'archive.gz');
  const destinationFilePath = path.resolve(__dirname, 'files', 'fileToCompress.txt');

  const readStream = fs.createReadStream(sourceFilePath);
  const writeStream = fs.createWriteStream(destinationFilePath);

  const gunzipStream = zlib.createGunzip();

  readStream.pipe(gunzipStream).pipe(writeStream);

  writeStream.on('finish', () => {
    console.log('File decompressed successfully');
  });

  writeStream.on('error', (err) => {
    throw new Error('FS operation failed: file decompression error');
  });
};

await decompress();
