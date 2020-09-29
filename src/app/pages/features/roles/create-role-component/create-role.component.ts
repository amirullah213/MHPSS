import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'ncri-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent implements OnInit {

  oneAtATime: boolean = true;

  isFirstOpen = true;

  constructor() { }

  ngOnInit(): void {
  }

}
