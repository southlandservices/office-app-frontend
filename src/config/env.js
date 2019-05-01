console.log('PROCESS.ENV', process.env);

const local = {
  API_PREFIX: 'http://localhost:3030/api/v1/'
};

const dev = {
  API_PREFIX: 'https://qrk5c44b40.execute-api.us-east-1.amazonaws.com/dev/api/'
};

const uat = {
  API_PREFIX: 'fixme'
};

const prod = {
  API_PREFIX: 'fixme'
};

const endpoints = {
  local,
  dev,
  uat,
  prod
};

export default endpoints;