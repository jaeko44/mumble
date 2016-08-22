import {Profile} from '../app/profile';
import {inject} from 'aurelia-framework';
import {WebAPI} from '../data/web-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import $ from 'jquery';

@inject(Profile, WebAPI, EventAggregator)
export class settingsContacts {

  constructor(profile, api, ea) {
    ea.subscribe('myAccount', account => this.myAccount = account);
    ea.subscribe('contactLoaded', account => this.addContact(account));
    this.api = api;
    this.profile = profile;
    this.contacts = [];
    this.account = profile.getProfile();
    this.settings = profile.getSettings();
    this.contactEmail = '';
  }

  addContact(account) {
    this.contacts.push(account);
  }
  removeContact(account) {
    console.log('Removing contact: ', account);
    this.api.removeContact(account.details.email);
    for(var i = 1; i < this.contacts.length; i++) {
      if(this.contacts[i].details.email == account.details.email) {
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
