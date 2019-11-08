import { Component, OnInit, HostListener } from '@angular/core';
import { Inject } from '@angular/core';
 import { DOCUMENT } from '@angular/platform-browser';
 import { WINDOW } from '../window.service';

@Component({
  selector: 'app-main',
 
  templateUrl: './main.component.html',

  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  @HostListener('window:scroll',['$event'])
  onWindowScroll(){
    console.log("Scrroooll!!");
  //  this.removePin(50);
     console.log("window.pageYOffset"+this.window.pageYOffset);
     console.log("window.pageYOffset"+window.pageYOffset);
     console.log("document.documentElement.scrollTop"+this.document.documentElement.scrollTop)
     console.log("document.documentElement.scrollTop"+document.documentElement.scrollTop)
    // console.log("document.body.scrollTop"+this.document.body.scrollTop);
     console.log("this.document.body.clientHeight"+this.screenHeight);
    if(this.window.pageYOffset>this.screenHeight*0.8||this.document.documentElement.scrollTop>this.screenHeight*0.8)
    {
      this.addPin3(50);
      console.log("====================add 50 more pin=========================");
    }
   }

  columnNum;
  startIdx=0;
  cardNum;
  screenWidth;
  screenHeight=0;
  list:HTMLDivElement[]=[];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window : Window
  ) { 
     this.cardNum = 0;
     this.columnNum = 6;
    
  }

  ngOnInit() {
    this.cardNum=0;
 
    this.addPin3(100);
 
   

  }

  
  onResize(event) {
   
  // event.target.innerWidth window size 
   let innerWidth=event.target.innerWidth;
   let i;

  //Setting Column Number
   if(innerWidth>1749)
   {
     this.columnNum = 6;
   }
   else if (innerWidth>1499)
   {
     this.columnNum = 5;
   }
   else if (innerWidth > 1249)
   {
     this.columnNum = 4;
   }
   else if (innerWidth > 999)
   {
     this.columnNum = 3;
   }
   else if (innerWidth >749)
   {
     this.columnNum = 2;
   }
   else
   {
      this.columnNum =1;
   }
  
   // Reposition
   for(i=this.startIdx;i<this.startIdx+this.cardNum;i++)
   {
     let Pin = document.getElementById(i.toString());
     this.setPosition(Pin);
   }
   
  }

  removePin(num:number){
    let i;
    let div = document.getElementById("columns");

    for(i=this.startIdx;i<this.startIdx+num;i++)
    {
      var Pin = document.getElementById(i.toString());

      console.log(div.removeChild(Pin));
    }

    this.startIdx += num;
    this.cardNum -= num;
  }
  
  async addPin3(num:number){
    
    let i;
    let div = document.getElementById("columns");
    let height=0;
    
    for(i=this.startIdx+this.cardNum;i<this.startIdx+this.cardNum+num;i++){
      
       var newPin = document.createElement('div');
        

        newPin.setAttribute("class","card");
        newPin.setAttribute("id",i.toString());
        var srcAddr="../../../../assets/img/8298be61205c0ef9ba51bdb07218be25.jpg"
        newPin.innerHTML=
        "<div class=\"imgContainer\">"+
          "<img class=\"img1\" src=\""+srcAddr+"\"> "+
        "</div>"+
        "<div class=\"tagContainer\">"+
          "<div style=\"width: 100% ;padding-left:8px; padding-right:8px\">"+"</div>"+
          "<div class=\"tagContent\">"+
            "<i class=\"fas fa-ellipsis-h\">"+"</i>"+
          "</div>"+
        "</div>";

      this.setPosition(newPin);
      let temp=await this.func2(i,newPin,div);
      if(i%this.columnNum==0){
      this.screenHeight += +temp;}
      
      

    //  console.log(newPin);

    }
    console.log(height);
    div.style.height = height+"px";
    this.cardNum += num;

    
  }
  resizeElementHeight(element) {
    var height = 0;
    var body = window.document.body;
    if (window.innerHeight) {
        height = window.innerHeight;
    } else if (body.parentElement.clientHeight) {
        height = body.parentElement.clientHeight;
    } else if (body && body.clientHeight) {
        height = body.clientHeight;
    }
    element.style.height += ((height - element.offsetTop) + "px");
  }

  func2(i:number,newPin:HTMLElement,div:HTMLElement) {
    div.appendChild(newPin);

    return new Promise((resolve,reject)=>{
      let img = new Image();
      img.onload = ()=>{
        newPin.querySelector("img").src=img.src;
        resolve(img.height);
      }
      img.onerror = reject;
      img.src= "../../../../assets/img/8298be61205c0ef9ba51bdb07218be25.jpg";
    })
    
  }

  setPosition(newPin:HTMLElement){
    let x;
    let y;
    
    let nowPinId = newPin.getAttribute("id");
    let prevPinId = ( +nowPinId - this.columnNum ).toString();
    let prevPin = document.getElementById( prevPinId );

    //Setting Cordinate

    x = 250* ( +nowPinId % this.columnNum );

    if (+nowPinId > this.columnNum-1)
    {
      let prevCordinateY=prevPin.getBoundingClientRect();
      let prevHeight= prevPin.scrollHeight;
      
      y=prevCordinateY.top+window.pageYOffset+prevHeight;
    }
    else
    {
      y=0;
    }

    newPin.style.transform='translateX('+x+'px) translateY('+y+'px)';

  }


  
 
 

   onScrollUp(){
    console.log("Scroll up!@!");

   }
}
