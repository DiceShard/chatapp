import { Component, ViewChild  } from '@angular/core';
import { IonContent } from '@ionic/angular';
import {  Router,ActivatedRoute,NavigationExtras } from "@angular/router";
import { ChatserviceService } from 'src/app/services/chatservice.service';
import { groupMessageResponse } from '../../interfaces/groupMessageResponse';
import { groupByUserResponse } from '../../interfaces/groupByUserResponse';

@Component({
  selector: 'app-chatgrupo',
  templateUrl: './chatgrupo.page.html',
  styleUrls: ['./chatgrupo.page.scss'],
})
export class ChatgrupoPage  {

  @ViewChild('content') content!: IonContent;

  grupo_seleccionado!: groupByUserResponse;
  mensajes:groupMessageResponse[] = [];
  mensaje!:string;
  userid!:number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chatservice: ChatserviceService
  ) {
    this.userid = parseInt(localStorage.getItem("userid")!)
    this.route.queryParams.subscribe(
      params =>{
        if (this.router.getCurrentNavigation()?.extras.state){
          this.grupo_seleccionado = this.router.getCurrentNavigation()?.extras.state!['grupoSeleccionado'];
          //console.log("Grupo: ", this.grupo_seleccionado)

          this.getMensajes();
        }
      }
    )
  }

  scrollToBottom() {
    this.content.scrollToBottom();
  }

  getMensajes() {
    this.chatservice.getGroupMessages(this.grupo_seleccionado.group_id).subscribe(
      data=>{
        let tmp = data;
        tmp.sort((a, b) => Date.parse(a.sent_at) - Date.parse(b.sent_at))
        this.mensajes = tmp;
      },
      error=>{
        console.log(error);
      }
    )
  }

  sendMsg() {
    this.chatservice.sendGroupMessage(this.userid,this.grupo_seleccionado.group_id,this.mensaje).subscribe(
      data=>{
        console.log(data);
        this.getMensajes();
      },
      error=>{
        console.log(error);
      }
    )
  }
}
