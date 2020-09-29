import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../service';

@Component({
  selector: 'ncri-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  error: boolean = false;

  constructor(private service: ProfileService) { }
  userDetails:any = {};
  loader:boolean = false;
  responseText: string = "";
  profileImage: string = "";
  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(){
    let data:any = localStorage.getItem("details");
    if(data !== null){
      data = JSON.parse(data);
      this.userDetails.first_name = data.user.first_name;
      this.userDetails.last_name = data.user.last_name;

      this.userDetails.date_of_joining = data.user.date_of_joining;
      this.userDetails.email = data.user.email;

      this.userDetails.username = data.user.username;
      this.userDetails.cell_number = data.user.cell_number;

      this.profileImage = data.user.avatar_url;
    }
  }

  updateProfile(){
    let obj = {
      "first_name": this.userDetails.first_name,
      "last_name": this.userDetails.last_name
    };
    this.loader = true;
    this.service.updateProfile(obj).subscribe((res) => {
      if(res.status === "error"){
        this.error = true;
        this.responseText = res.code;
      }else{
        let data:any = localStorage.getItem('details');
        if(data !== null){
          data = JSON.parse(data);
          data.user.first_name = obj.first_name;
          data.user.last_name = obj.last_name;

          localStorage.setItem('details', JSON.stringify(data));
        }
        this.error = false;
        this.responseText = "Profile updated Successfully.";
      }
      this.loader = false;
    },(error) =>{
      this.error = true;
      this.responseText = "Sorry, something went wrong, Try again later";
      this.loader = false;
    })
  }

}
