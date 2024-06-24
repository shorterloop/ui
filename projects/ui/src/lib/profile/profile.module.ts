import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ImageModule } from '../image/image.module';
import { ErrorModule } from '../error/error.module';
import { InputModule } from '../input/input.module'


@NgModule({
  declarations: [
    ProfileComponent,
  ],
  exports: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ImageModule,
    ErrorModule,
    InputModule
  ]
})
export class ProfileModule { }
