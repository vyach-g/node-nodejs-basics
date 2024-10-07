import path from 'path';
import { spawn } from 'child_process';

const __dirname = import.meta.dirname;

const spawnChildProcess = async (args) => {
  const scriptPath = path.resolve(__dirname, 'files', 'script.js');
  const child = spawn('node', [scriptPath, ...args], {
    stdio: ['pipe', 'pipe', 'inherit'],
  });

  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);

  child.on('exit', (code, signal) => {
    console.log(`Child process exited with code ${code} and signal ${signal}`);
  });
};

spawnChildProcess(['foo', 'bar', 'baz']);
