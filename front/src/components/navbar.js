import {customAttribute, inject} from 'aurelia-framework';
import $ from 'jquery';

@customAttribute('navbar')
@inject(Element)
export class navbar {
  constructor(element) {
    this.element = element;
    this.parent = $(element).parent();
    console.log(this.parent); //this.parent is valid here
  }
  attached() {
    this.element.addEventListener('click', () =>  this.open());
    console.log(this.parent); //this.parent is valid here
  }
  deattached() {
    this.element.removeEventListener('click', () =>  this.open());
  }
  open() {
    console.log(this.element); //undefined - Why is it undefined here??
    console.log(this.parent); //undefined
    if ($(this.parent).is('.active')) {
      console.log('Is active');
      $(this.parent).removeClass('active active-sm');
      $('ul:first', this.parent).slideUp();
    } else {
      console.log('Is not active');
      $(this.parent).addClass('active');
      $('ul:first', this.parent).slideDown();
    }
  }
}
