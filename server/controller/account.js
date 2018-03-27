const Account = require('../util/account')

const doSignIn = (req, res) => {
  const userName = req.body.userName
  const password = req.body.password
  Account.signIn(userName, password, req, res)

}

const doSignUp = (req, res) => {
  const userName = req.body.userName
  const password = req.body.password
  Account.signUp(userName, password, req, res)
}

const uploadAvatar = (req, res) => {
  console.log("******")
  console.log(req.file)
}

const doSignOut = (req, res) => {

}

module.exports = {
  doSignIn,
  doSignUp,
  uploadAvatar,
  doSignOut
}
