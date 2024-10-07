const PREFIX = 'RSS_';

const parseEnv = () => {
  const pairs = Object.entries(process.env);
  const rssPairs = pairs.filter(([key, value]) => key.includes(PREFIX));
  const result = rssPairs.map((pair) => pair.join('=')).join('; ');

  console.log(result);
};

parseEnv();
