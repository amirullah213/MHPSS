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
  

}
