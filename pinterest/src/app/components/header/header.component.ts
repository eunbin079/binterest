import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';


const URL = 'http://localhost:5500/upload';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  isPlusContentOpend;
  uploader:FileUploader;
  response:string;
  item;

  constructor( ) {
    this.isPlusContentOpend = false;
    this.uploader = new FileUploader ({
      url: URL,
      disableMultipart:true, //'disableMultipart' must be 'true' for formatDataFunction to be called
      formatDataFunctionIsAsync:true,
      formatDataFunction: async(item)=>{
        return new Promise((resolve,reject) => {
          resolve({
            name : item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date:new Date()
          })
          
        })
      }
    });

    this.response ='';
    this.uploader.response.subscribe(res => this.response=res);

   }

  ngOnInit() {
  }

  onPlusPinClick(){
    console.log("clicked!");
    this.isPlusContentOpend= ~this.isPlusContentOpend;
  }


}
