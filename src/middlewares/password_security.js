const hash = require("object-hash");

const password_security = function(req, res, next){
    const { password, password_check } = req.body;

    if(password_check && !(password_check === password)){
        res.status(400).json({error: "Passwords not equals..."});
        return;
    }
    delete req.body.password_check;
    
    req.body.password = hash(password, {algorithm: "sha512"});

    next();
}

module.exports = password_security;