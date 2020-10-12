import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'ncri-change-logo',
  templateUrl: './change-logo.component.html',
  styleUrls: ['./change-logo.component.scss']
})
export class ChangeLogoComponent implements OnInit {
  logoLoader:boolean=false;
  logo_file: File;
  logo:any = "";
  constructor(private service: UserService,private formBuilder: FormBuilder) { }
  uploadForm: FormGroup; 
  ngOnInit(): void {
    this.fetchLogo();
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }
  public imagePath;
  url: any={};
  onSelectFile(event) { // called each time file input changes
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
      console.log('saddd',this.uploadForm.get('profile').setValue(file))
      this.uploadLogo();
    }
    
    
    }
 
 


 uploadLogo(){
   
   this.logoLoader=true;
  const formData = new FormData();
  
  formData.append('logo_file', this.uploadForm.get('profile').value);
  console.log('profile',formData)
  this.service.changeLogo(formData).subscribe((res) => {
    if(res.status === "success"){
      this.logo = res.data.logo_file_url;
     console.log("change logo res==",res.data) ;
      this.logoLoader=false;
    } else{
      this.logoLoader=false;
      alert("Something went wrong try again");
    }
  }, (error)=>{
    this.logoLoader=false;
  })
}

fetchLogo(){
  this.service.getLogo().subscribe((res) => {
    
    if(res.status === "success"){
      this.logo = res.data.logo_file_url;
    }
  },(error)=>{
    
    this.logo = "";
  })
}
}
