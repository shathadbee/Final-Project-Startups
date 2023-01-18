import { Component, OnInit  } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls:  ['./slider.component.css'],

})
export class SliderComponent implements OnInit  {



  images = [
    {src:'https://firebasestorage.googleapis.com/v0/b/angular-c4826.appspot.com/o/cover%2Fbackground.jpg?alt=media&token=32a7349f-2864-4a96-b4a1-743f27a13e59'},
    {src: 'https://firebasestorage.googleapis.com/v0/b/angular-c4826.appspot.com/o/cover%2Fhero.jpeg?alt=media&token=f0dbcef1-7956-44ca-8656-8f825c848cda'},
    {src: 'https://firebasestorage.googleapis.com/v0/b/angular-c4826.appspot.com/o/cover%2Fistockphoto-1215119911-612x612.jpg?alt=media&token=2e307bc9-8593-4493-b3f9-3f6d114e80b7' }
  ];
  currentSlide = 0;

  constructor() { }

  ngOnInit() {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.images.length;
    }, 3000);
  }
}
