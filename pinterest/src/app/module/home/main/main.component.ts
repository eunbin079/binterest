import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { $ } from 'protractor';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',

  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  @HostListener('window:resize',[`$event`])


  columNum=6;
  cardNum;
  screenWidth;
  list:HTMLDivElement[]=[];

  constructor() { 
    //this.onResize();
     this.cardNum=30;
    
  }

  ngOnInit() {
    this.addPin(0,30);
  }
  // onResize(event?){
  //   this.screenWidth = window.innerWidth;
  //   this.setList(0,this.cardNum);
  // }
  // setList(startIdx,endIdx){
  //   let i;
  
  //   for(i=startIdx;i<endIdx;i++)
  //   {
  //     let prevId = (i-this.columNum).toString();
  //     let prevDoc = document.getElementById(prevId); 
  //     let nowDoc = document.getElementById(i);

  //     let prevHeight:number=+prevDoc.getAttribute("height");
      
  //     this.list[i].x=250*(i%this.columNum);
  //     this.list[i].y=prevHeight+this.list[i-this.columNum].y;
  //   }
  // }
  addPin(startIdx:number,endIdx:number){
    let i;
    let x;
    let y;
    let div = document.getElementById("columns");
    setTimeout(() => {
      for(i=startIdx;i<endIdx;i++){
        if(i>this.columNum-1){
        let prevId = (i-this.columNum).toString();
        console.log("prevId : "+prevId);
        let prevDoc = document.getElementById(prevId); 
        console.log("prevDOC : "+prevDoc);
        let prevCordinateY=prevDoc.getBoundingClientRect();
        let prevHeight= prevDoc.scrollHeight;
        console.log(prevCordinateY.top+"height"+prevHeight+"offset"+window.pageYOffset);
         y=prevCordinateY.top+window.pageYOffset+prevHeight;
        }
        else{
          y=0;
        }
  
        x=250*(i%this.columNum);
        div.appendChild(this.Pin(i,x,y));
        console.log("wwwwwwwwwwww"+div);
        console.log(this.list);
      
      }

    }, 2000)
    console.log("ddddddddddd"+document.getElementById("columns"));
  }
  
  Pin(idx:number,x:number,y:number){
   
    var newPin = document.createElement("div");

    newPin.setAttribute("class","card");
    newPin.setAttribute("id",idx.toString());
    newPin.style.transform='translateX('+x+'px) translateY('+y+'px)'
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

    console.log(document.getElementById(idx.toString()));
   return newPin;

  }

 
  onScroll(){
    console.log("Scrooolllllll!!");
    let temp=window.pageYOffset;
    this.addPin(30,50)
    let div=document.getElementById("first");
    console.log("HEIGHT================== :"+div.getAttribute("height"));
  }
}
