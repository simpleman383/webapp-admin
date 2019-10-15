const request = async (url, { data = {}, method = "GET", authentication = false } = {} ) => {
  if (!url) {
    return;
  }

  try {
    const response = await fetch(url, {
      method: method,
      ...( method !== 'GET' && { body: JSON.stringify(data) } ),
      headers: {
          Accept: 'application/json',
      }
    });  
  
    if (!response.ok) {
      console.error(`Payture backend server request to ${url} failed, HTTP status ${response.status}`);
    }
  
    const responseParsed = await response.json()
    return responseParsed
  } catch (e) {
    console.error('Fetch operation failed ' + e)
  }

}

export { request as fetch } 
