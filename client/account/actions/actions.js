const getCookie = name => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

export const signIn = userName => ({type: 'SIGN_IN', userName})

export const doErr = err => ({type: 'ERR', err})

export const doSignIn = (userName, password) => dispatch => {
  fetch('/sign-in', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      "X-CSRFToken": getCookie("csrftoken"),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({userName, password})
  }).then(
    response => response.json()
  ).then(
    response => {
      if(response.err){
        dispatch(doErr(response.err))
      } else{
        console.log(response)
      }
    }
  )
}

export const uploadAvatar = avatar => dispatch => {
  fetch('/upload-avatar', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      "X-CSRFToken": getCookie("csrftoken"),
      'Content-Type': 'application/octet-stream'
    },
    body: avatar
  }).then(
    response => response.json()
  ).then(
    response => console.log('avatar uploaded')
  )
}

export const doSignUp = (userName, password, avatar) => dispatch => {
  fetch('/sign-up', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "X-CSRFToken": getCookie("csrftoken"),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({userName, password})
  }).then(
    response => response.json()
  ).then(
    response => {
      if(response.err){
        doErr(response.err)
      } else{
        uploadAvatar(avatar)
      }
    }
  )
}