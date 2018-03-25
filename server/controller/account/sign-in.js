const doSignIn = (req, res) => {
  console.log(req.body)
  res.send(JSON.stringify({userName: 'X-man'}))
}

module.exports = doSignIn
