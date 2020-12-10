import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../../core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http: HttpClient, private router: Router,) { }

  getPatList(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getallusers';
    return this.http.post(url, obj);
  }
  addUser(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'adduser';
    return this.http.post(url, obj);
  }
  updateUser(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'updateuser';
    return this.http.post(url, obj);
  }
  deleteUser(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'deleteuser';
    return this.http.post(url, obj);
  }
  getDiagList(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getalldiagnosis';
    return this.http.post(url, obj);
  }
  getAllPathlogyList(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getalldiagnosis';
    return this.http.post(url, obj);
  }
  getAllMedicsList(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getmedicines';
    return this.http.post(url, obj);
  }
  addNewMedic(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'addmedicine ';
    return this.http.post(url, obj);
  }
  deleteMedic(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'deletemedicine  ';
    return this.http.post(url, obj);
  }
  updateMed(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'updatemedicine  ';
    return this.http.post(url, obj);
  }
  getAmbulances(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getambulances  ';
    return this.http.post(url, obj);
  }

  addambulance(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'addambulance  ';
    return this.http.post(url, obj);
  }
  deleteambulance(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'deleteambulance   ';
    return this.http.post(url, obj);
  }
  updateAmbulance(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'updateambulance   ';
    return this.http.post(url, obj);
  }
  allsigns(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getsigns';
    return this.http.post(url, obj);
  }
  addnewSign(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'addsign';
    return this.http.post(url, obj);
  }
  deleteSign(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'deletesign';
    return this.http.post(url, obj);
  }
  updateSign(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'updatesign';
    return this.http.post(url, obj);
  }
  allComplaints(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getcomplaints';
    return this.http.post(url, obj);
  }
  addComp(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'addcomplaint';
    return this.http.post(url, obj);
  }
  deleteComp(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'deletecomplaint';
    return this.http.post(url, obj);
  }
  updateComp(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'updatecomplaint';
    return this.http.post(url, obj);
  }
  getPatology(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'gettests';
    return this.http.post(url, obj);
  }

  addTest(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'addpathologytest';
    return this.http.post(url, obj);
  }
  delTest(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'deletetest ';
    return this.http.post(url, obj);
  }

  updateTest(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'updatetest  ';
    return this.http.post(url, obj);
  }
  addNewRadiology(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'addradiologytest  ';
    return this.http.post(url, obj);
  }
  getRadTypes(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getradiologytypes  ';
    return this.http.post(url, obj);
  }
  emrSummaryReort(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'emrsummaryreport  ';
    return this.http.post(url, obj);
  }
  searchDiagnosis(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'searchdiagnosis  ';
    return this.http.post(url, obj);
  }
  
  addDiagnosis(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'adddiagnosis  ';
    return this.http.post(url, obj);
  }
  deletDiagnosis(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'deletediagnosis';
    return this.http.post(url, obj);
  }
  getlocaldataforsync(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'getlocaldataforsync';
    return this.http.post(url, obj);
  }
  syncMerfDHIS(obj: any) {
    let url ="https://yoa6yqfdfg.execute-api.us-east-1.amazonaws.com/merf_dhis/syncmerfdhis";
    return this.http.post(url, obj);
  }
  updatesyncstatus(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'updatesyncstatus';
    return this.http.post(url, obj);
  }
  covidPats(obj: any) {
    let url = APP_CONFIG.apiBaseUrl + 'covid19patientsreport  ';
    return this.http.post(url, obj);
  }

}
