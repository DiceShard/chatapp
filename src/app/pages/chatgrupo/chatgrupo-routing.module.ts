import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatgrupoPage } from './chatgrupo.page';

const routes: Routes = [
  {
    path: '',
    component: ChatgrupoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatgrupoPageRoutingModule {}
