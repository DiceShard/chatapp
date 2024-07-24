import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { LoginResponse } from '../interfaces/login-response';

@Injectable({
  providedIn: 'root'
})
export class ChatserviceService {

  constructor(private http:HttpClient) { }

  login(username:string, password:string) {
    let url = 'https://www.hostcatedral.com/api/app-chat/public/login';
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return this.http.post<LoginResponse>(url, formData);
  }
}
