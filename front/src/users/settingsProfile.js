import {Profile} from '../app/profile';
import {inject} from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import $ from 'jquery';

@inject(Profile)
export class settingsProfile {

  constructor(profile) {
    this.profile = profile;
    this.account = profile.getProfile();
    this.settings = profile.getSettings();
    this.appName = this.settings.appName;
    this.number = this.settings.mnumber;
    this.saveNumber;
    this.showAddPhone = true;
    this.showAddEmail = true;
    this.showAddName = true;
    this.showAddIcon = true;
  }
  
  displayAddPhone() {
    this.cancel('name');
    this.cancel('email');
    this.cancel('icon');
    this.addingPhone = true;
    this.showAddPhone = false;
  }
  savePhone() {
    console.log(this.saveNumber);
  }
  displayAddEmail() {
    this.cancel('name');
    this.cancel('phone');
    this.cancel('icon');
    this.showAddEmail = false;
    this.addingMail = true;
  }
  displayAddName() {
    this.cancel('email');
    this.cancel('phone');
    this.cancel('icon');
    this.showAddName = false;
    this.addingName = true;
  }
  displayAddIcon() {
    this.cancel('email');
    this.cancel('phone');
    this.cancel('name');
    this.showAddIcon = false;
    this.addingIcon = true;
  }
  fullName() {
    return `${this.account.firstName} ${this.account.lastName}`;
  }
  cancel(setting) {
    if (setting == 'name') {
      this.showAddName = true;
      this.addingName = false;
    }
    else if (setting == 'email') {
      this.showAddEmail = true;
      this.addingMail = false;
    }
    else if (setting == 'phone') {
      this.showAddPhone = true;
      this.addingPhone = false;
    }
    else if (setting == 'icon') {
      this.showAddIcon = true;
      this.addingIcon = false;
    }
  }
}
