import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentSliderComponent } from './content-slider.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    ContentSliderComponent
  ],
  exports: [
    ContentSliderComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
  ]
})
export class ContentSliderModule { }
