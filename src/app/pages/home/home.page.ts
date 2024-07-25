import { Component } from '@angular/core';
import { ChatserviceService } from 'src/app/services/chatservice.service';
import { groupByUserResponse } from '../../interfaces/groupByUserResponse';
import { NavigationExtras, Router } from '@angular/router';
import { userResponse } from 'src/app/interfaces/usersResponse';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  grupos:groupByUserResponse[] = [];
  users:userResponse[] = []
  userid:number = 0;

  constructor(
    private router: Router,
    private chatservice: ChatserviceService
  ) {
    this.userid = parseInt(localStorage.getItem('userid')!);
    this.getGroups()
    this.getUsers()
  }

  getGroups() {
    this.chatservice.buscargrupos(this.userid).subscribe(
      data=>{
        //console.log(data);
        this.grupos=data;
      },
      error=>{
        console.log(error);
      }
    )
  }

  ingresarGrupo(item:groupByUserResponse) {
    //console.log(item);
    let navigationExtras: NavigationExtras = {
      state: {
        grupoSeleccionado: item
      }
    }
    
    this.router.navigate(['/chatgrupo'], navigationExtras);

  }

  ingresarDM(item:userResponse){
    console.log(item)
  }

  getUsers() {
    this.chatservice.getUsers().subscribe(
      data=>{
        this.users = data
        //console.log(this.users);
      },
      error=>{
        console.log(error);
      }
    )
  }

}
