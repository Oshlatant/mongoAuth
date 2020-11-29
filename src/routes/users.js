const express = require("express");
const router = express.Router();

router.post("/users/login", function(req, res){
    const { body, find_then_match_password } = req;

    find_then_match_password(body)
    .then(info => res.status(201).json({cookie: "cookie", info: info}))
    .catch(err => res.status(err.code).json({error: err.error}));

});
router.post("/users/register", function(req, res){
    const {body, save_db, body: {username, email}, models: {Users} } = req;

    if(!email){
        res.status(400).json({error: "You need to register an email"});
        return;
    }
    
    Users.exists({username: username})
    .then((found)=>{
       if(found){
           res.status(400).json({error: "Username already taken"});
           return;
       }
       return save_db(body);
    })
    .then((info)=> res.status(201).json(info))
    .catch(console.error);
});

module.exports = router;