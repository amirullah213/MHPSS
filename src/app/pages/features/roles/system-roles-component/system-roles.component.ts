import { Component, OnInit } from '@angular/core';
import { IMultiSelectOption } from 'ngx-bootstrap-multiselect';
import { IMultiSelectTexts  } from 'ngx-bootstrap-multiselect';
import { IMultiSelectSettings  } from 'ngx-bootstrap-multiselect';

@Component({
  selector: 'ncri-system-roles',
  templateUrl: './system-roles.component.html',
  styleUrls: ['./system-roles.component.scss']
})
export class SystemRolesComponent implements OnInit {
  optionsModel: number[];
  myOptions: IMultiSelectOption[] = [
    { id: 1, name: 'Car brands'},
    { id: 2, name: 'Volvo'},
    { id: 3, name: 'Honda' },
    { id: 4, name: 'BMW' },
    
];
  mySettings: IMultiSelectSettings = {
    enableSearch: false,
    checkedStyle: 'checkboxes',
    buttonClasses: 'btn btn-default',
    dynamicTitleMaxItems: 3,
    displayAllSelectedText: false
};
  myTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'item selected',
    checkedPlural: 'items selected',
    searchPlaceholder: 'Find',
    searchEmptyResult: 'Nothing found...',
    searchNoRenderText: 'Type in search box to see results...',
    defaultTitle: 'Select',
    
};
  constructor() { }

  ngOnInit(): void {

  //   this.myOptions = [
  //     { id: 1, name: 'Option 1' },
  //     { id: 2, name: 'Option 2' },
  //     { id: 3, name: 'Option 3' },
  // ];
  }

}
