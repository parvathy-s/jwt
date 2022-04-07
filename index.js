'use strict'

const path = require('path')
const fs = require('fs')

var jwt = require('jsonwebtoken')

var privatekey = fs.readFileSync('./private.key','utf-8')

var publickey = fs.readFileSync('./public.key','utf-8')

var payload = { };

payload.username = "parvathy4"
payload.password = "Parvathy123#"

console.log("Payload : "+ JSON.stringify(payload))

var iss = "Centelon"
var sub = "centelon@employees"
var aud = "https://basic-api-app-node.herokuapp.com/"
var exp = "24h"

var signOptions = {
    issuer : iss,
    subject : sub,
    audience : aud,
    expiresIn : exp,
    algorithm : "RS256"
};

console.log(signOptions)

var token = jwt.sign(payload, privatekey, signOptions);
console.log("Token : "+ token);

var verifyOptions ={
    issuer : iss,
    subject : sub,
    audience : aud,
    maxAge: exp,
    algorithms: ["RS256"]
}

var verified = jwt.verify(token, publickey, verifyOptions);
console.log("Verified :"+ JSON.stringify(verified))

//decode
var decoded = jwt.decode(token, {complete: true})
console.log("Decoder header :"+ JSON.stringify(decoded.header))
console.log("Decoded payload :"+JSON.stringify(decoded.payload))

// process.exitCode = 1;

