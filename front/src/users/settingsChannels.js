import {Profile} from '../app/profile';
import {inject} from 'aurelia-framework';
import {WebAPI} from '../data/web-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import $ from 'jquery';

@inject(Profile, WebAPI)
export class settingsChannels {

  constructor(profile, api) {
    this.api = api;
    this.profile = profile;
    this.channels = [];
    this.account = profile.getProfile();
    this.settings = profile.getSettings();
    this.searchTerm = '';
  }
  created() {
      this.getChannels();
  }
  getChannels() {
    this.channels = this.api.getChannels();
  }
}
