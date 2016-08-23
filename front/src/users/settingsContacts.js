import {Profile} from '../app/profile';
import {inject} from 'aurelia-framework';
import {WebAPI} from '../data/web-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import $ from 'jquery';

@inject(Profile, WebAPI, EventAggregator)
export class settingsContacts {

  constructor(profile, api, ea) {
    this.contacts = [];
    this.response = '';
    ea.subscribe('myAccount', account => this.myAccount = account);
    ea.subscribe('contactLoaded', account => this.addContact(account));
    ea.subscribe('ContactNotFound', response => this.response = response);
    this.api = api;
    this.profile = profile;
    this.account = profile.getProfile();
    this.settings = profile.getSettings();
    this.contactEmail = '';
  }

  addContact(account) {
    console.log('ADDING CONTACT IN SETTINGS CONTACTJS', account, this.contacts);
    this.response = '';
    this.contacts.push(account);
  }
  removeContact(account) {
    this.api.removeContact(account.email);
    for(var i = 0; i < this.contacts.length; i++) {
      if(this.contacts[i].email == account.email) {
          this.contacts.splice(i, 1);
          break;
      }
    }
  }
  
  displayAddContact() {
    this.addingContact = true;
  }
  saveContact() {
    this.api.addContact(this.contactEmail);
    this.addingContact = false;
    this.contactEmail = '';
  }
}
