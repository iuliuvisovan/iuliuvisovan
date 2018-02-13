
import appConfig from '../config/app-config'

let ACCESS_KEY = '';
let LOGOUT;

const call = async (route, body, method = "GET") => {
  const baseUrl = appConfig.apiBaseUrl;
  const headers = {
    'Content-Type': 'application/json',
    'access-key': ACCESS_KEY
  };
  if (method == "GET" && body)
    route += `?${getQueryString(body)}`;


  if (__DEV__) {
    if (method == "POST")
      console.log(`→ → ${method} ${baseUrl}/${route} \n${JSON.stringify(body, undefined, 2)}`);
    else
      console.log(`→ → ${method} ${baseUrl}/${route}`);
  }

  let response = {};
  try {
    response = await fetch(`${baseUrl}/${route}`, { method, headers, body: (method == "GET" ? undefined : JSON.stringify(body)) })
  } catch (e) {
    console.log(`CALL FAILED: ${baseUrl}${route}`, JSON.stringify(e));
    throw e;
  }

  if (response) {
    if (__DEV__) {
      if (response.status == 200)
        console.log(`← ← ← [${response.status}] @ ${route}`);
      else
        console.warn(`← ← ← [${response.status}] @ ${route}`);
    }

    if (response.status == 401) {
      LOGOUT();
      console.log(await response.text());
      return;
    }
    if (response.status == 422) {
      return {
        isError: true,
        response: await response.json()
      }
    }
    try {

      return response.json();
    }
    catch (e) {
      console.log(await response.text());
      console.log(e);
      return;
    }
  }
}

export default {
  setLogout(logOut) {
    LOGOUT = logOut;
  },
  getLocation(id) {
    return call(`/offices/details/${id}`);
  },
}

function getQueryString(params) {
  return Object
    .keys(params)
    .map(k => {
      if (Array.isArray(params[k])) {
        return params[k]
          .map(val => `${encodeURIComponent(k)}[]=${encodeURIComponent(val)}`)
          .join('&')
      }

      return params[k] ? `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}` : false
    })
    .filter(x => x)
    .join('&')
}
