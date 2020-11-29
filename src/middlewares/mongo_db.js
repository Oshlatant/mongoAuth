const mongoose = require("mongoose");
const Users = require(`${require.main.path}/models/Users.js`);

mongoose.connect('mongodb://localhost/db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

const mongo_db = function(req, res, next){
    req.save_db = function(json){
        return new Promise((success, failure)=>{
            const user = new Users(json)
            user.isAdmin = false;
            user.save(err => {
                if(err){failure({error:err})};

                success({info:"User registered to database"});
            });
        });
    }

    req.find_then_match_password = function(json){
        return new Promise((success, failure)=>{
            const { username, password } = json;

            Users.findOne({username: username}, (err, doc)=>{
                if(err){
                    failure({error: err, code:"500"});
                    return;
                }
                if(!doc){
                    failure({error: "User not found", code:"404"});
                    return;
                }

                console.log(doc);
                if(!(doc.password === password)){
                    failure({error: "Password doesn't match", code:"400"});
                    return;
                }
                success({cookie: "cookie", info: "You are connected"});
            });
        });
    }


    req.db = mongoose;
    req.models = {};
    req.models.Users = Users;

    next();
}

module.exports = mongo_db;