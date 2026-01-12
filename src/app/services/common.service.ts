import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UPLOAD_IMAGE_URL } from '../shared/constant/urls';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  uploadImage(file: File): Observable<HttpEvent<any>>{
    const formData = new FormData();
    formData.append('file',file);

    const req = new HttpRequest('POST',UPLOAD_IMAGE_URL,formData,{
      reportProgress: true,
    });
    return this.http.post<any>(UPLOAD_IMAGE_URL,formData,{observe: 'events',reportProgress:true})
  }
}
