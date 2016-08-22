import {Profile} from '../app/profile';
import {inject} from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import $ from 'jquery';

@inject(Profile, EventAggregator)
export class settingsProfile {

  constructor(profile, ea) {
    this.profile = profile;
    ea.subscribe('myAccount', account => this.unpackAccount(account));
    this.settings;
    this.account;
    this.saveNumber;
    this.showAddPhone = true;
    this.showAddEmail = true;
    this.showAddName = true;
    this.showAddIcon = true;
    this.addingMail = false;
    this.showAddTitle = true;
  }
  unpackAccount(account) {
    this.myAccount = account;
    this.settings = account.settings;
    this.account = account.details;
    console.log('this account: ', this.account);
    this.appName = this.settings.appName;
    this.number = this.settings.mnumber;
    let addNameEl = document.getElementById("displayAddName");
    let addEmailEl = document.getElementById("displayAddEmail");
    addEmailEl.setAttribute('data-original-title', this.account.email);
    addNameEl.setAttribute('data-original-title', this.account.firstName);
    $(addNameEl).tooltip('show').tooltip('hide');
    $(addEmailEl).tooltip('show').tooltip('hide');
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
  saveEmail() {
    if (this.validateEmail(this.saveMail)) {
      if (this.account.email == this.currMail) {
        this.ea.publish('updateMail', this.saveMail);
      }
      else {
        this.response = 'The current email entered doesn\'t match your account';
      }
    }
    else {
      this.response = 'The entered email is not a valid one';
    }

    this.currMail = this.saveMail;
    this.saveMail = '';
  }
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  displayAddEmail() {
    this.cancel('name');
    this.cancel('phone');
    this.cancel('title');
    this.cancel('icon');
    this.showAddEmail = false;
    this.addingMail = true;
  }
  displayAddName() {
    this.cancel('email');
    this.cancel('phone');
    this.cancel('icon');
    this.cancel('title');
    this.showAddName = false;
    this.addingName = true;
  }
  displayAddTitle() {
    this.cancel('email');
    this.cancel('phone');
    this.cancel('icon');
    this.cancel('name');
    this.showAddTitle = false;
    this.addingTitle = true;
  }
  displayAddIcon() {
    this.cancel('email');
    this.cancel('phone');
    this.cancel('name');
    this.cancel('title');
    this.showAddIcon = false;
    this.addingIcon = true;
  }
  cancel(setting) {
    this.response = '';
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
    else if (setting == 'title') {
      this.showAddTitle = true;
      this.addingTitle = false;
    }
  }
}
