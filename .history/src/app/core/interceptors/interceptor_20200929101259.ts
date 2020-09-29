import { Injectable, Inject, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { GlobalService } from '../services';



@Injectable()

export class Interceptor {
    // implements HttpInterceptor
    constructor(private global: GlobalService, private router: Router) { }

   
}
