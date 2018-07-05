const http = require('http');
const express =  require('express');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const cors = require('cors');

const message = require('./utils/message');
const users = require('./utils/users');

class Server{

    constructor(){
        this.port = process.env.PORT || 3000;
        this.host = 'localhost';

        this.app = express();
        this.http = http.Server(this.app);
        this.socket = socketio(this.http);
    }

    appConfig(){
        this.app.use(bodyParser.json());
        this.app.use(cors());
    }

    appInclude(){
        new users(this.app).userEvents();
        new message(this.app, this.socket).socketEvents();
    }

    appExecute(){
        this.appConfig();
        this.appInclude();
        console.log('hello');
        this.http.listen(this.port, this.host, ()=>{
            console.log('Listen http://'+this.host+':'+this.port);
        });
    }

}


const app =  new Server();
app.appExecute();