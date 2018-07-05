import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { UserList } from './../../helper/userList';

import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';

@Injectable()
export class MessageService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  constructor(
    private socket:Socket,
    private _http:HttpClient
  ) {
    
   }


  changeMessage(message: string) {
    this.messageSource.next(message)
  }



  onLogin(name){
    console.log(name);
    this.socket.emit("newUser", name);
  }

  // sendMessage(msg: string){
  //   this.socket.emit("message", msg);
  // }

  // sayHello() {
  //   return this.socket.fromEvent<any>("sayhello").map( data => console.log(data));
  // }
  //getMessage() {
    //return this.socket.fromEvent<any>("userList").map(data => this.allUserList(data));
    //return this.socket.fromEvent<any>("userList");
  ///}


  // allUserList(data){
  //   console.log(data);
  //   console.log(data[0]);
  // }


  onLogout(){
    this.socket.emit('testing');
  }

  onLogoutRes(){
    return this.socket.fromEvent<any>("userList");
  }
  
  onUserTypingReq(msg){
    if(msg == ''){
      this.socket.emit("userTyping", '');
    }else{
      this.socket.emit("userTyping", 'Typing...');
    }
  }

  
  onUserTypingRes(){
    return this.socket.fromEvent<any>("onUserTyping");
  }



  // USER LIST
  AllUserList(){
    return this._http.get<UserList[]>('http://localhost:3000/AllUsersList');
  }
}
