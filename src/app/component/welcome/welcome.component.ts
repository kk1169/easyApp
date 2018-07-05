import { UserList } from './../../helper/userList';
import { HeaderComponent } from './../header/header.component';
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  userlist:UserList[];
  constructor(
    private _message:MessageService
  ) {
    
   }

  ngOnInit() {
    
  }


}
