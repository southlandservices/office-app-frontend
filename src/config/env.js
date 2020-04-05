console.log("PROCESS.ENV", process.env);

const local = {
  API_PREFIX: "http://localhost:3030/api/"
};

const development = {
  API_PREFIX: "https://ec2-18-219-85-149.us-east-2.compute.amazonaws.com/api/"
};

const uat = {
  API_PREFIX: "https://ec2-18-219-85-149.us-east-2.compute.amazonaws.com/api/"
};

const prod = {
  API_PREFIX: "https://ec2-18-219-85-149.us-east-2.compute.amazonaws.com/api/"
};

const endpoints = {
  local,
  development,
  uat,
  prod
};

export default endpoints;
