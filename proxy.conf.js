// {
//   "/api/*" : {
//   "target" : "http://34.72.92.171",
//     "pathRewrite" : {
//     "^/api" : ""
//   }
// }
// }
//
//
// var process = require("process");


let process = require("process");
let BACKEND_ADR = process.env.BACKEND_ADR || 8080;
const PROXY_CONFIG = [
  {
    context: [
      "/api/**"
    ],
    target: `http://${BACKEND_ADR}`,
    pathRewrite: {
      "^/api": ""
    }
  },
];
module.exports = PROXY_CONFIG;
