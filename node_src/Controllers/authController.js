const ldap = require('ldapjs');
const { response } = require("express");
const { authenticate } = require('ldap-authentication')

exports.testAuth = (request, response) => {
  console.log("testAuth been called")

  authenticated = ldapAuthentication("some", "thing");

  console.log(authenticated);

  response.send("hey you just made a call to auth router testAuth! ᕕ( ᐛ )ᕗ");
}


async function ldapAuthentication(username, password) {

  let authenticated = await authenticate({
    ldapOpts: { url: 'ldap://fcsldap.cs.dal.ca:389' },
    userDn: `uid=${username},cn=users,dc=cs,dc=dal,dc=ca`,
    userPassword: password,
    userSearchBase: 'cn=users,dc=cs,dc=dal,dc=ca',
    usernameAttribute: 'uid',
    username: `${username}`,
  })
  return authenticated;
}
