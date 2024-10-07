import path from 'path';
import os from 'os';
import { Worker } from 'worker_threads';

const __dirname = import.meta.dirname;

const performCalculations = async () => {
  const workerPath = path.resolve(__dirname, 'worker.js');
  const numCores = os.cpus().length;
  const promises = [];

  for (let i = 0; i < numCores; i++) {
    const worker = new Worker(workerPath);
    const data = 10 + i;

    const promise = new Promise((resolve, reject) => {
      worker.addListener('message', (message) => {
        resolve({ status: 'resolved', data: message });
      });

      worker.addListener('error', (error) => {
        resolve({ status: 'error', data: null });
      });
    });

    worker.postMessage(data);

    promises.push(promise);
  }

  const results = (await Promise.allSettled(promises)).map((result) => result.value);

  console.log(results);
};

await performCalculations();
