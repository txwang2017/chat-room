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

export const signIn = userName => ({type: 'SIGN_IN', userName})

export const doErr = err => ({type: 'ERR', err})

export const doAuth = () => dispatch => {
  const token = localStorage.getItem('token')
  if(!token){
    dispatch(redirect('/account'))
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
        dispatch(signIn(response.userName))
        dispatch(getAvatar(response.userName))
      } else{
        dispatch(redirect('/account'))
      }
    }
  )
}

export const doSignOut = () => dispatch => {
  fetch('/account/sign-out').then(
    response => response.json()
  ).then(
    response => {
      localStorage.removeItem('token')
      dispatch(signOut)
      dispatch(setAvatar(null))
      dispatch(redirect('/account'))
    })
}

export const getAvatar = userName => dispatch => {
  fetch(
    `/account/get-avatar?userName=${userName}`
  ).then(
    response => response.blob()
  ).then(
    avatar => {
      dispatch(setAvatar(URL.createObjectURL(avatar)))
    }
  )
}

export const signOut = () => ({type: 'SIGN_OUT'})

export const setAvatar = avatar => ({type: 'SET_AVATAR', avatar})

export const setMsg = msg => ({type: 'SET_MSG', msg})

export const setUserList = userList => ({type: 'SET_USER_LIST', userList})

export const addUser = user => ({type: 'ADD_USER', user})

export const removeUser = user => ({type: 'REMOVE_USER', user})

export const getUserList = () => dispatch => {
  fetch('/chat-room/user-list').then(
    response => response.json()
  ).then(
    userList => {
      dispatch(setUserList(userList))
      console.log(userList)
    }
  )
}