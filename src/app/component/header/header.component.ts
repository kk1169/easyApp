
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message/message.service';
import { HeaderService } from './../../services/header/header.service';

import { Router } from '@angular/router';
import { Socket } from 'ng-socket-io';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  constructor(
    private _message:MessageService,
    private _headerService:HeaderService,
    private router:Router,
    private socket:Socket
  ) { 
  }

  ngOnInit() {
    this._message.changeMessage('Hello Message');
  }

  // LOGOUT USER
  onLogout(){
    this._headerService.HttpOnLogout().subscribe(data=>{
      this.onShowOutput(data);
    });
  }

  onShowOutput(data){
    if(data.status == 'true'){
      let obj = localStorage.getItem('currentUser').split(',');
      this.socket.emit('removeUser',obj[1]);
      localStorage.removeItem('currentUser');
      this.router.navigate(['/login']);
    }else{
      console.log(data.message);
    }
  }

}
