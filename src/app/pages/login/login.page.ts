/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { LoginResponse } from 'src/app/interfaces/login-response';
import { ChatserviceService } from 'src/app/services/chatservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  user = {username:'user1', password: 'password1'};
  datos_usuario!: LoginResponse;

  constructor(
    private serviceChat:ChatserviceService,
    private router:Router,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    localStorage.clear();
  }

  async Alerta(msg:string) {
    const alert = await this.alertController.create({
      header: 'Atención',
      message: msg,
      buttons: ['Aceptar']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  validar(){
    this.loadingController.create({
     message: 'Aguarde por favor...',
   }).then((res)=>{
     res.present();
   this.serviceChat.login(this.user.username,this.user.password).subscribe(
    data=>{
      res.dismiss();
      this.datos_usuario=data;

      localStorage.setItem("username",this.datos_usuario.data.username);
      localStorage.setItem("userid", this.datos_usuario.data.id.toString());
      localStorage.setItem("token",this.datos_usuario.data.token);

      this.router.navigateByUrl('/home');         
    },  
    error=>{
      res.dismiss();
      console.log(error.error.message);
      this.Alerta(error.error.message);
       
    }
  )});
 }
}
