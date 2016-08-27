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
    this.channelNew = '';
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
  displayAddChannel() {
    this.addChannel = true;
  }
  saveChannel() {
    var channel = {
      id: this.channels.length + 1,
      chatId: 9,
      unreadMsgs: 0,
      channelName: this.channelNew,
      users: [],
      isOpen: false
    }
    this.channels.push(channel);
    this.addChannel = false;
  }

  cancelChannel() {
    this.addChannel = false;
  }
}
