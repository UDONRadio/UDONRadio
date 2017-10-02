const SERVER = {
  api_url: 'http://localhost:8000',
  chat_url: 'http://localhost:3001',
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

export { checkStatus, parseJSON, SERVER }
