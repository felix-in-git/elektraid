import React, {useState, useEffect} from 'react';
import {SERVER_URL} from '../../constant/serverConfig';
import {ERROR_API} from '../../lang/en';

export function consoleDev(input) {
  if (__DEV__) {
    return console.log(input);
  }
}

export const getAPI = URL => {
  return fetch(SERVER_URL + URL)
    .then(response => {
      if (response.status === 200) {
        let json = response.json();
        return json;
      } else {
        consoleDev('Something went wrong on api server! ' + URL);
      }
    })
    .catch(error => {
      console.error(error);
    });
};

export const postAPI = (URL, REQUEST) => {
  return fetch(SERVER_URL + URL, {
    method: 'POST',
    header: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(REQUEST),
  })
    .then(response => {
      // consoleDev( JSON.stringify(REQUEST))
      consoleDev(response);
      if (response.status === 201) {
        let json = response.json();
        return json;
      } else {
        consoleDev(ERROR_API + URL);
        return {message: ERROR_API + URL};
      }
    })
    .catch(error => {
      console.error(error);
    });
};

export const putAPI = (URL, REQUEST) => {
  return fetch(SERVER_URL + URL, {
    method: 'PUT',
    header: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(REQUEST),
  })
    .then(response => {
      // consoleDev( JSON.stringify(REQUEST))
      consoleDev(response);
      if (response.status === 201) {
        let json = response.json();
        return json;
      } else {
        consoleDev(ERROR_API + URL);
        return {message: ERROR_API + URL};
      }
    })
    .catch(error => {
      console.error(error);
    });
};

export const deleteAPI = URL => {
  return fetch(SERVER_URL + URL, {
    method: 'DELETE',
    header: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      consoleDev(SERVER_URL + URL);
      consoleDev(response);
      if (response.status === 202) {
        let json = response.json();
        return json;
      } else {
        consoleDev(ERROR_API + URL);
        return {message: ERROR_API + URL};
      }
    })
    .catch(error => {
      console.error(error);
    });
};
