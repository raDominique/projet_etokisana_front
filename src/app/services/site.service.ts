import { Injectable } from '@angular/core';
import { Site } from '../shared/models/Sites';
import { SITE_ADD_URL, SITE_BY_ID_URL, SITE_BY_USERID_URL, SITE_REMOVE_URL, SITE_UPDATE_URL, SITE_URL } from '../shared/constant/urls';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor(private http : HttpClient) { }

  addSite(siteData:Site):Observable<Site>{
    return this.http.post<Site>(SITE_ADD_URL,siteData);
  }
  getAll() : Observable<Site[]>{
    return this.http.get<Site[]>(SITE_URL);
  }
  getSiteByUserId(userId :string) : Observable<Site[]>{
    return this.http.get<Site[]>(SITE_BY_USERID_URL+ userId);
  }
  getSiteById(siteId :string) : Observable<Site>{
    return this.http.get<Site>(SITE_BY_ID_URL+ siteId);
  }
  update(updateData : any, siteId : string){
    return this.http.put<Site>(SITE_UPDATE_URL + siteId, updateData)
  }
  deleteSite(SiteId:string){
    return this.http.delete(SITE_REMOVE_URL+SiteId);
  }

}
