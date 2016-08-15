import {Profile} from '../app/profile';
import {inject} from 'aurelia-framework';
import {WebAPI} from '../data/web-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import $ from 'jquery';

@inject(Profile, WebAPI)
export class settingsContacts {

  constructor(profile, api) {
    this.api = api;
    this.profile = profile;
    this.contacts = [];
    this.account = profile.getProfile();
    this.settings = profile.getSettings();
  }
  created() {
      this.getContacts();
  }
  getContacts() {
    this.api.getContactList().then(contacts => this.contacts = contacts);
  }
}
