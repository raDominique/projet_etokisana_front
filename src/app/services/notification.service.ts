import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NOTIFICATION_ADD_URL, NOTIFICATION_BY_ID_URL, NOTIFICATION_BY_OWNER_URL, NOTIFICATION_NEW_URL, NOTIFICATION_REMOVE_URL, NOTIFICATION_UPDATE_URL, NOTIFICATION_URL } from '../shared/constant/urls';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent } from '../components/partials/notification-dialog/notification-dialog.component';
import { Router } from '@angular/router';
import { Notification } from '../shared/models/Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  readonly dialog = inject(MatDialog);
  constructor(
    private http:HttpClient,
    private router:Router,
  ) { }
  getAll() : Observable<Notification[]>{
    return this.http.get<Notification[]>(NOTIFICATION_URL);
  }    
  getNotificationById(id:string) : Observable<Notification>{
    return this.http.get<Notification>(NOTIFICATION_BY_ID_URL+id);
  }
  getNotificationByOwner(userId:string) : Observable<Notification[]>{
    return this.http.get<Notification[]>(NOTIFICATION_BY_OWNER_URL+userId);
  }
  getNotificationNew(userId:string) : Observable<Notification[]>{
    return this.http.get<Notification[]>(NOTIFICATION_NEW_URL+userId);
  }
  addNotification(NotificationData:Notification):Observable<Notification>{
    return this.http.post<Notification>(NOTIFICATION_ADD_URL,NotificationData);
  }
  updateNotification( NotificationID:string,newNotificationData:any){
    console.log(newNotificationData);
    return this.http.patch<Notification>(NOTIFICATION_UPDATE_URL+NotificationID,newNotificationData);
  }
  deleteNotification(NotificationId:string){
    return this.http.delete(NOTIFICATION_REMOVE_URL+NotificationId);
  }
  openNotificationDialog( yn:boolean =false,title:string , message:string, url : string | null,reload:boolean =false){
    const dialogRef = this.dialog.open(NotificationDialogComponent,{
      data : {
        yn,
        title,
        message
      }
    })
    dialogRef.afterClosed().subscribe(result=>{
      if (result == true && !url && reload == true) {
        window.location.reload();
        return;
      }
      if(result == true && url && reload == false){
        this.router.navigateByUrl(url);
      }
    })
  }
}
