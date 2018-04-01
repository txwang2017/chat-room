const getCookie = name => {
  let cookieValue = null
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim()
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break
      }
    }
  }
  return cookieValue
}

const redirect = url => {
  window.location.replace(url)
}

export const doErr = err => ({type: 'ERR', err})

export const doSignIn = (userName, password) => dispatch => {
  fetch('/account/sign-in', {
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
        localStorage.setItem('token', response.token)
        dispatch(doErr(null))
        dispatch(redirect('/chat-room'))
      }
    }
  )
}

export const uploadAvatar = avatar => dispatch => {
  if(!avatar){
    return
  }
  fetch('/account/upload-avatar', {
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
  fetch('/account/sign-up', {
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
      } else{
        localStorage.setItem('token', response.token)
        dispatch(uploadAvatar(avatar))
        dispatch(doErr(null))
        dispatch(redirect('/chat-room'))
      }
    }
  )
}

export const setPanel = panel => ({type: 'SET_PANEL', panel})

export const doAuth = () => dispatch => {
  const token = localStorage.getItem('token')
  if(!token){
    return
  }
  fetch('/account/auth', {
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
        dispatch(doErr(null))
        dispatch(redirect('/chat-room'))
      }
    }
  )
}