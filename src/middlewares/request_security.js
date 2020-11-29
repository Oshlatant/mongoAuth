const { keys } = require("object-hash");

const request_security = function(req, res, next){
    const { body } = req;
    const keys_required = ["username", "password"];
    const keys_accepted = ["username", "email", "password", "password_check"];

    keys_required.forEach((key)=>{
        if(!key in body){
            res.status(400).json({error: "Key missing"});
            return;
        }
    });

    for(let key in body){
        if(!key in keys_accepted || !body[key]){
            res.status(400).json({error: "Key invalid"});
            return;
        }
    }

    next();
}

module.exports = request_security;