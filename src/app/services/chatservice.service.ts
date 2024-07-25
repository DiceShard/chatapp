import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { LoginResponse } from '../interfaces/login-response';
import { groupByUserResponse } from '../interfaces/groupByUserResponse'
import { userResponse } from '../interfaces/usersResponse'
import { groupMessageResponse } from '../interfaces/groupMessageResponse'

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

  buscargrupos(userid:number) {
    let url = `https://www.hostcatedral.com/api/app-chat/public/group-members-by-user/${userid}`
    return this.http.get<groupByUserResponse[]>(url)
  }

  getUsers() {
    let url = 'https://www.hostcatedral.com/api/app-chat/public/users';
    return this.http.get<userResponse[]>(url);
  }

  getGroupMessages(groupid:number) {
    let url = `https://www.hostcatedral.com/api/app-chat/public/group-messages-by-group/${groupid}`
    return this.http.get<groupMessageResponse[]>(url);
  }

  sendGroupMessage(senderid:number, groupid:number, content:string) {
    let url = 'https://www.hostcatedral.com/api/app-chat/public/group-messages';
    
    let body = {
      sender_id: senderid,
      group_id: groupid,
      content: content
    }

    let options = {
      headers:{
        'Authorization':'Bearer ' + localStorage.getItem('token')
      }
    }

    return this.http.post(url, body, options)
  }
}
