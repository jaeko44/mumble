import {customAttribute, bindable, inject} from 'aurelia-framework';
import "bootstrap";

@customAttribute('bootstrap-tooltip')
@inject(Element)
export class BootstrapTooltip {
  @bindable title;

  constructor(element) {
    this.element = element;
  }

  bind() {
    $(this.element).tooltip();
  }

  unbind() {
    $(this.element).tooltip('destroy');
  }

  titleChanged() {
    this.changeTitle(this.title);
  }

  changeTitle(titleChanged) {
    $(this.element).data('tooltip').options.title = titleChanged;
  }
}
