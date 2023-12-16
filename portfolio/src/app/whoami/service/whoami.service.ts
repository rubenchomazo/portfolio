import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Notification } from '../shared/notification.model';

@Injectable({ providedIn: 'root' })
export class WhoamiService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  sendNotification(notify: Notification) {
    let url = environment.apiNotification;
    this.http.post(url, notify, this.httpOptions).subscribe((data: any) => {
      console.log(data);
    });
  }
}
