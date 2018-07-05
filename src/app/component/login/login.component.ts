import { UserList } from './../../helper/userList';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MessageService } from '../../services/message/message.service';
import { LoginService } from '../../services/login/login.service';
import { User } from '../../helper/user';

import { Socket } from 'ng-socket-io';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  uname:any;
  msg:any;
  ulist:UserList[] = [];

  u:User[] = [];
  status:any;
  typingStatus:any;

  constructor(
    private _message:MessageService,
    private router: Router,
    private _loginService:LoginService,
    private socket:Socket
  ) { 
    
  }

  ngOnInit() {

  }


  // ON LOGIN USER
  onSubmit(){
    this._loginService.HttpLoginUser(this.u).subscribe(data=>{
      this.onShowOutput(data);

    })
  }
 
  onShowOutput(data){
    if(data.status == 'true'){
      let obj = data.token+","+data.userid;
      localStorage.setItem("currentUser",obj);
      this.socket.emit('newUser',data.userid,data.token);
      this.router.navigate(['/welcome']);
    }else{
      this.msg = data.message;
    }
  }


  onUserTyping(){
    this._message.onUserTypingReq(this.msg);
  } 
}
