import { Component, OnInit, Input } from '@angular/core';
import { Chat } from './chat';
import { ChatMsg } from './ChatMsg';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {


  chat: Chat[] = [];
  m:string;

  @Input () childMessage: Chat[] = [];
  constructor() { }

  ngOnInit() {
  }

  addNewMsg(s,r){
    console.log(s);
    console.log(this.m+" "+s+" "+r);
  }

}
