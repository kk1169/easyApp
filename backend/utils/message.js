
class Message{

    constructor(app, socket){
        this.app = app;
        this.io = socket;

        this.users = [];
    }

    socketEvents(){

        this.io.on('connection',(socket)=>{

            // ADD NEW USER
            socket.on('newUser',(username,token)=>{

                this.users.push({
                    id : socket.id,
                    name:username,
                    token:token
                });

                this.io.emit('userList',this.users);

            });

            socket.on('userTyping',(data)=>{
                this.io.emit('onUserTyping',data);

            });

            socket.on('testing',()=>{
                //console.log('testing');
                this.io.emit('onLogoutRes',this.users);
            });

            // REMOVE USER FROM THE LIST
            socket.on('removeUser',(userid)=>{
                for(var i=0; i<this.users.length; i++){
                    if(this.users[i].name == userid){
                        this.users.splice(i,1);
                        this.io.emit('userList',this.users);
                    }
                }       

            });
            // socket.on('getMsg',(data)=>{


            //     console.log(data)
            //     // socket.broadcast.to(data.id).emit('sendMsg',{
            //     //     msg:data.msg,
            //     //     name:data.name
            //     // })

            // });
        });

    }

}

module.exports = Message;