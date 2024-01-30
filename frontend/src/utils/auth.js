// export const BASE_URL = 'https://api.mstar.students.nomoredomainsmonster.ru';
export const BASE_URL = 'http://localhost:3000';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then(res => {
      console.log("register", res);
      checkResponse(res)});
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }
  ).then(res => {
      console.log("authorize", res);
      return checkResponse(res)});
    // .then((data) => {
    //     if (data.token){
    //       localStorage.setItem('token', data.jwt);
    //       return data;
    //     }
    //   })
};

export const checkToken = token => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then(res => {
    console.log("checkToken", res);
    checkResponse(res)});
};

const checkResponse = res => {
  if (!res.ok) {
    console.error(`Ошибка ${res.status}`);
    return Promise.reject(`Ошибка ${res.status}`);
  }

  return res.json();
};
