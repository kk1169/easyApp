import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
  sid: any;
  rid: any;
  msg:any;

  msglist = [];
  constructor(private route: ActivatedRoute) {
   }

  ngOnInit() {
    this.sid = +this.route.snapshot.paramMap.get('sid');
    this.rid = +this.route.snapshot.paramMap.get('rid');
  }

  keyDownFunction(event) {
    if(event.keyCode == 13) {
      this.msglist.push({
        sid : this.sid,
        rid : this.rid,
        msg : this.msg
      });

      this.msg = '';
    }
  }




}
