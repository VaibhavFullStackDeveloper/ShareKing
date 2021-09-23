const jwt = require('jsonwebtoken');


function decoded(tokens){
    const bearerToken= tokens;
    const bearer = bearerToken.split(' ');
    const token =bearer[1];
    const decoded = jwt.verify(token, process.env.secret);
    return decoded;
}
module.exports=decoded;