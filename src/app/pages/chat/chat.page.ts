
import { Component, AfterViewChecked, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import {  Router, ActivatedRoute } from "@angular/router";
import { ChatserviceService } from 'src/app/services/chatservice.service';
import { privateMessageResponse } from '../../interfaces/privateMessageResponse';
import { userResponse } from '../../interfaces/usersResponse';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})

export class ChatPage implements AfterViewChecked {

  @ViewChild(IonContent)
  content!: IonContent;

  usuario_seleccionado!: userResponse;
  mensaje!:string;
  userid!:number;
  useridstring!:string;
  mensajes: privateMessageResponse[] = [];
  recibidos: privateMessageResponse[] = [];
  enviados: privateMessageResponse[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chatservice: ChatserviceService
  ) { 
    this.userid = parseInt(localStorage.getItem("userid")!);
    this.useridstring = "user"+this.userid.toString();
    this.route.queryParams.subscribe(
      params =>{
        if (this.router.getCurrentNavigation()?.extras.state){
          this.usuario_seleccionado = this.router.getCurrentNavigation()?.extras.state!['usuarioSeleccionado'];

          this.getMensajes();
        }
      }
    )
  }

  ngAfterViewChecked() {
    this.content.scrollToBottom();
  }

  scrollToBottom() {
    this.content.scrollToBottom();
  }

  identify(index: any, item:privateMessageResponse) {
    return item.id;
  }

  getMensajes() {
    if (this.userid === this.usuario_seleccionado.id) {
      this.chatservice.getPrivateMessages(this.userid, this.usuario_seleccionado.id).subscribe(
        data=>{
          let tmpnota = data;
          tmpnota.sort((a, b) => Date.parse(b.sent_at) - Date.parse(a.sent_at));
          this.mensajes = tmpnota;
        },
        error=>{
          console.log(error);
        }
      )
    } else {
      let tmpres:privateMessageResponse[] = [];
      let tmpenv:privateMessageResponse[] = [];
      this.chatservice.getPrivateMessages(this.userid, this.usuario_seleccionado.id).subscribe(
        data=>{
          tmpenv = data;
          this.chatservice.getPrivateMessages(this.usuario_seleccionado.id, this.userid).subscribe(
            data2=>{
              tmpres = data2;
              let tmpsort = [...tmpres, ...tmpenv];
              tmpsort.sort((a, b) => Date.parse(b.sent_at) - Date.parse(a.sent_at));
              this.mensajes = tmpsort;
              this.content.scrollToBottom();
            },
            error2=>{
              console.log(error2);
            }
          )
        },
        error=>{
          console.log(error);
        }
      )
    }
  }

  sendMsg() {
    this.chatservice.sendPrivateMessage(this.userid, this.usuario_seleccionado.id,this.mensaje).subscribe(
      data=>{
        console.log(data);
        this.getMensajes();
        this.mensaje = ""
      },
      error=>{
        console.log(error);
      }
    )
  }
}
