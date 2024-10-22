import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageSliderComponent } from './image-slider.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    ImageSliderComponent
  ],
  exports: [
    ImageSliderComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
  ]
})
export class ImageSliderModule { }
