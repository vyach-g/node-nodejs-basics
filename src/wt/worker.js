import { Worker, parentPort } from 'worker_threads';

// n should be received from main thread
const nthFibonacci = (n) => (n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2));

const sendResult = () => {
  parentPort.addListener(
    'message',
    (value) => {
      parentPort.postMessage(nthFibonacci(value));
      Worker.terminate();
    },
    { once: true },
  );
};

sendResult();
