import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddanimalPage } from './addanimal';

@NgModule({
  declarations: [
    AddanimalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddanimalPage),
  ],
})
export class AddanimalPageModule {}
