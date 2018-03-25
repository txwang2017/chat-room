const doSignIn = (req, res) => {
  const userName = req.body.userName
  const password = req.body.password

}

const doSignUp = (req, res) => {
  const userName = req.body.userName
  const password = req.body.password
}

const doSignOut = (req, res) => {

}

module.exports = {
  doSignIn,
  doSignUp,
  doSignOut
}
