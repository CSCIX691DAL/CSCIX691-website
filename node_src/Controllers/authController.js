const ldap = require('ldapjs');
const { response } = require("express");
const { authenticate } = require('ldap-authentication')

exports.authentication = async (request, response) => {
  console.log("testAuth been called");
  let result = {"result": true};

  let userName = request.body.username;
  let password = request.body.password;

  try {
    let user = await ldapAuthentication(userName, password);

    result["email"] = user.mail;
    result["bNum"] = user.dalBannerID;
    result["fullName"] = user.cn; //full name
    result["netId"] = user.uid; // dal id

  } catch (e) {
    if (e.hasOwnProperty("lde_message")){
      // false result if error
      console.log(e.lde_message)
      result["result"] = false;
      result["cause"] = e.lde_message;
    } else {
      // throw the ball if not ldap error
      throw e;
    }
  }

  response.send(JSON.stringify(result));
}


function ldapAuthentication(username, password) {

  return authenticate({
    ldapOpts: {url: 'ldap://fcsldap.cs.dal.ca:389'},
    userDn: `uid=${username},cn=users,dc=cs,dc=Dal,dc=Ca`,
    userPassword: password,
    userSearchBase: 'cn=users,dc=cs,dc=Dal,dc=Ca',
    usernameAttribute: 'uid',
    username: `${username}`,
  });
}
