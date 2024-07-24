import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatgrupoPageRoutingModule } from './chatgrupo-routing.module';

import { ChatgrupoPage } from './chatgrupo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatgrupoPageRoutingModule
  ],
  declarations: [ChatgrupoPage]
})
export class ChatgrupoPageModule {}
