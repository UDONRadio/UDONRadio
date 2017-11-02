import 'whatwg-fetch';

const SERVER = {
  api_url: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  admin_url: process.env.REACT_APP_API_URL || 'http://localhost:8000/admin',
  chat_url: process.env.REACT_APP_CHAT_URL || 'ws://localhost:8000/ws/',
  stream_url: process.env.REACT_APP_STREAM_URL || 'http://radiomeuh.ice.infomaniak.ch/radiomeuh-128.mp3',
};

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON, status from the response
 */
function parseJSON(response) {
  return new Promise((resolve) => response.json()
    .then((json) => resolve({
      status: response.status,
      ok: response.ok,
      json,
    })).catch((error) => resolve({
      ok: false,
      error
    })));
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {Promise}           The request promise
 */
function request(url, options) {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(parseJSON)
      .then((response) => {
        if (response.ok) {
          return resolve(response.json);
        }
        // extract the error from the server's json
        return reject(response);
      })
      .catch((error) => reject({
        networkError: error.message,
      }));
  });
}

export { request, SERVER }
