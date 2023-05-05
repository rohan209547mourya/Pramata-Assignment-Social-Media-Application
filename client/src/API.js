const API_BASE_URL = 'http://localhost:8080/api';

async function handleRequest(path, method, headers = {}, body = null) {
  const URL = `${API_BASE_URL}/${path}`;
  try {
    const response = await fetch(URL, {
      method,
      headers,
      body,
    });

    if (response.status === 400 || response.status === 404) {
      throw new Error('Something went wrong');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Something went wrong');
  }
}

export default handleRequest;
