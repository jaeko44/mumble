import {customAttribute, inject} from 'aurelia-framework';
import $ from 'jquery';

@customAttribute('navbar')
@inject(Element)
export class navbar {
  constructor(element) {
    this.element = element;
    this.parent = $(element).parent();
  }
  attached() {
    this.element.addEventListener('click', () =>  this.open());
  }
  deattached() {
    this.element.removeEventListener('click', () =>  this.open());
  }
  open() {
    console.log(this.parent);
    if ($(this.parent).is('.active')) {
      $(this.parent).removeClass('active active-sm');
      $('ul:first', this.parent).slideUp();
    } else {
      $(this.parent).addClass('active');
      $('ul:first', this.parent).slideDown();
    }
  }
}