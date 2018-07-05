import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from '../../services/message/message.service';
import { UserList } from '../../helper/userList';

import { Chat } from './../chat/chat';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  userlist:UserList[] = [];
  message:string;

  chat: Chat[] = [];
  sid = (localStorage.getItem('currentUser').split(','))[1];

  constructor(
    private _message:MessageService
  ) { 

    // USERS LIST
    this._message.AllUserList().subscribe(data =>{
      this.userlist = data;
    });

    // LOGOUT USER
    this._message.onLogoutRes().subscribe(data =>{
      for(let j=0; j<this.userlist.length; j++){
        
        this.userlist[j].c_user_loggedin = '0';
        for(let i=0; i<data.length; i++){
          if(this.userlist[j].c_user_id == data[i].name){
            this.userlist[j].c_user_loggedin = '1';
          }
        }
      }
    });
  }

  ngOnInit() {
    //this._message.currentMessage.subscribe(message => this.message = message)
  }

  openChat(id){
    console.log(id);
    var exits = 0;
    for(let i=0; i<this.chat.length; i++){
      if(this.chat[i].rid == id){
        exits = 1;
      }
    }
    if(exits == 0){
      this.chat.push({
        rid : id,
        sid : this.sid,
        message : ["hello"]
      });
    }
  }


  


}
