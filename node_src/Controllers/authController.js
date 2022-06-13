const { response } = require("express");


exports.testAuth = (request, response) => {

  response.send("hey you just made a call to auth router testAuth! ᕕ( ᐛ )ᕗ")
}
