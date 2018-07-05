const db = require('../config/dbConfig');
const Cryptr = require('Cryptr');
const cryptr = new Cryptr('easyApp');

class Users{

    constructor(app){
        this.app = app;
    }

    userEvents(){

        this.app.get('/AllData',function(req, res){

            let data = {
                'c_user_name' : 'AMIT KUMAR',
                'c_user_email' : 'amit@gmail.com',
                'c_user_password' : cryptr.encrypt('123456789'),
                'c_user_authkey' : cryptr.encrypt('amit@gmail.com'),
                'c_user_loggedin' : '1',
                'c_user_status' : '1'
            }

            db.insert('users', data, function(results){
                res.json(results);
            });
            
        });
    
        
        //ALL USERS
        this.app.get('/AllUsersList',function(req, res){
            db.select('users',function(results){
               // console.log('r');
                res.json(results);
            });
            
        });

        //ADD NEW USER
        this.app.post('/AddNewUser',function(req, res){
            let data = {
                'c_user_name' : req.body.name,
                'c_user_email' : req.body.email,
                'c_user_password' : cryptr.encrypt(req.body.password),
                'c_user_authkey' : cryptr.encrypt(req.body.email),
                'c_user_loggedin' : '1',
                'c_user_status' : '1'
            }

            db.insert('users', data, function(results){
                res.json(results);
            });
        });

        //USER LOGIN
        this.app.post('/login',function(req, res){
            
            var userPassword;
            var token;
            var userid;
            db.where('c_user_email',req.body.email);
            db.select('users',function(results){

                if(results.length > 0){

                    for(var i=0; i<results.length; i++){
                        userPassword = results[i].c_user_password;
                        token = results[i].c_user_authkey;
                        userid = results[i].c_user_id;
                    }
                    if(cryptr.decrypt(userPassword) == req.body.password){
                        let data = {
                            'c_user_loggedin' : '1'
                        }
                        db.where('c_user_id',userid);
                        db.update('users',data, function(results){

                            if(results.affectedRows == 1){
                                res.json({"status":"true","message":"Successfully","token":token,"userid":userid});
                            }
                        });

                        
                    }else{
                        res.json({"status":"false","message":"Incorrect Password!"});
                    }
                    
                }else{
                    res.json({"status":"false","message":"Incorrect email!"});
                }

            });

        });

        // USER LOGOUT
        this.app.post('/logout',function(req, res){
            var data = {
                'c_user_loggedin' : '0'
            }
            db.where('c_user_authkey',req.body.token);
            db.update('users',data, function(results){
                if(results.affectedRows == 1){
                    res.json({"status":"true", "message":"Successfully"});
                }else{
                    res.json({"status":"false", "message":"Failed"});
                }
            });
            
        });
        
    }
}

module.exports = Users;