import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  
  constructor(
    private http:HttpClient
  ){}

  ngOnInit(){
  }

  imgurl = 'http://localhost:3000/file/';
  imgsrc = false;
  d:any;

  //public uploader:FileUploader = new FileUploader({url:'http://localhost:3000/upload'});
  selectedFile:File = null;

  onSelectedFile(event){
    this.selectedFile= <File>event.target.files[0];
  }

  onUpload(){
    let fb = new FormData();
    fb.append('sampleFile',this.selectedFile);
    this.http.post('http://localhost:3000/upload',fb,{
      // reportProgress:true,
      // observe:'events'
    }).subscribe(res=>{

      // if(res.type == HttpEventType.UploadProgress){
        
      // }else if(res.type == HttpEventType.Response){
      //   console.log(res);
      // }
      // console.log("Upload Progress : "+Math.round(res.type * 10)+ '%');
      this.d = res;
      console.log(res);
      this.onShowImg();
    });
    
  }

  onShowImg(){
    //this.imgsrc = true;
    // this.imgurl = this.imgurl + 
    console.log(this.d.imgname);
  }

}
