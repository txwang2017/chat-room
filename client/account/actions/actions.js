const getCookie = name => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
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

export const signOut = () => ({type: 'SIGN_OUT'})

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
        return
      }
      localStorage.setItem('token', response.token)
      dispatch(doErr(null))
      dispatch(signIn(response.userName))
      dispatch(setPanel('header'))
    }
  )
}

export const uploadAvatar = avatar => dispatch => {
  fetch('/upload-avatar', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Access-Token': localStorage.getItem('token'),
      'Accept': 'application/json',
      'X-CSRFToken': getCookie('csrftoken'),
      'Content-Type': 'application/octet-stream'
    },
    body: avatar
  }).then(
    response => response.json()
  ).then(
    response => {
      if(response.err){
        dispatch(doErr(response.err))
      }
    }
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
        dispatch(doErr(response.err))
        return
      }
      localStorage.setItem('token', response.token)
      dispatch(uploadAvatar(avatar))
      dispatch(doErr(null))
      dispatch(signIn(response.userName))
      dispatch(setPanel('header'))
    }
  )
}

export const doAuth = () => dispatch => {
  fetch('/auth', {
    method: 'POST',
    headers: {
      'Access-Token': localStorage.getItem('token'),
      'Accept': 'application/json',
      'X-CSRFToken': getCookie('csrftoken'),
      'Content-Type': 'application/json'
    },
  }).then(
    response => response.json()
  ).then(
    response => {
      if(response.auth){
        //TODO: set user avatar path
        dispatch(doErr(null))
        dispatch(signIn(response.userName))
        dispatch(setPanel('header'))
      }
    }
  )
}

export const doSignOut = () => dispatch => {
  fetch('/sign-out').then(
    response => response.json()
  ).then(
    response => {
      localStorage.removeItem('token')
      dispatch(signOut)
      dispatch(setPanel('sign-in'))
      dispatch(setAvatar(null))
  })
}

export const setPanel = panel => ({type: 'SET_PANEL', panel})

export const getAvatar = userName => dispatch => {
  fetch(
    `/get-avatar?userName=${userName}`
  ).then(
    response => response.blob()
  ).then(
    avatar => {
      dispatch(setAvatar(URL.createObjectURL(avatar)))
    }
  )
}

export const setAvatar = avatar => ({type: 'SET_AVATAR', avatar})