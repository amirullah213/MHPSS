import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SharedService } from '../../../services/shared.service';


@Component({
  selector: 'ncri-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {
  userThms:any[];
// themeObj:any={theme_layout: "L", primary_color: "7BB31A",secondary_color: "394C62"};

themeObj:any={};

  constructor(@Inject(DOCUMENT) private document: Document, private sharedService:SharedService) { }

  ngOnInit(): void {
    this.userThemes();
  }
  //fitch themes
  
  userThemes(){
   this.sharedService.fetchUserTheme().subscribe((res:any) => {
      //debugger
      if(res.status === "success"){
        this.userThms = res.data.user_theme;
        console.log("userThms==",this.userThms)
        if(this.userThms.length>0){
          this.themeObj.theme_layout=this.userThms[0].theme_layout;
          this.themeObj.primary_color=this.userThms[0].primary_color;
          this.themeObj.secondary_color=this.userThms[0].secondary_color;
        }else{
          this.themeObj={theme_layout: "L", primary_color: "7BB31A",secondary_color: "394C62"}
        }
        console.log("current theme==",this.themeObj)
       // this.userLoader=false;
      } else{
        //this.userLoader=false;
        alert("Something went wrong try again");
      }
    }, (error)=>{
      
    })
  }
  //close theme change drawer
  closeDrawer() {
    const drawer = this.document.querySelector('.ncri-drawer');
    drawer.classList.remove('open');
  }
//change layout function
changeLayout(e) {
  this.themeObj["theme_layout"]=e.target.value;
  console.log("themeObj==",this.themeObj);
  this.addUserTheme(this.themeObj);
  
}
getcolourPrimery(e){
  this.themeObj["primary_color"]=e.target.value;
  console.log("themeObj==",this.themeObj);
  this.addUserTheme(this.themeObj);
}
getcolourSecondary(e){
  this.themeObj["secondary_color"]=e.target.value;
  console.log("themeObj==",this.themeObj);
  this.addUserTheme(this.themeObj);
}

addUserTheme(thobj){
  console.log('thobj==',thobj)
  this.sharedService.addUserTheme(thobj).subscribe((res:any) => {
    //debugger
    if(res.status === "success"){
      this.userThms = res.data.qs;
      console.log("res.data.qs==",res.data.qs)
     // this.userLoader=false;
    } else{
      //this.userLoader=false;
      alert("Something went wrong try again");
    }
  }, (error)=>{
    
  })
}

}
