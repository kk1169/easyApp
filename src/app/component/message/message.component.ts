import { Component, OnInit } from '@angular/core';
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  loading=true;
  iframevalue = "";
  url: SafeResourceUrl;
  
  constructor(public sanitizer:DomSanitizer) { }

  ngOnInit() {
  }

  onloading(){
    this.loading=false;
    console.log('now load');
  }

  selectedUser(sid, rid){
    this.loading=true;
    this.iframevalue = "http://localhost:4200/chatframe/"+sid+"/"+rid;
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.iframevalue);  
    console.log(this.iframevalue);
  }

}
