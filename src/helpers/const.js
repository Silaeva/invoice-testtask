const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const PASSWORD_REGEXP = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/;

const BACKEND_URL = `https://api.github.com/users`;
const REQUEST_TIMEOUT = 5000;
const HttpCode = {
  UNAUTHORIZED: 401
};

export {AuthorizationStatus, PASSWORD_REGEXP, BACKEND_URL, REQUEST_TIMEOUT, HttpCode};
