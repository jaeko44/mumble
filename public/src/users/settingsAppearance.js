import {Profile} from '../app/profile';
import {inject} from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import $ from 'jquery';

@inject(Profile, EventAggregator)
export class settingsAppearance {

  constructor(profile, ea) {
    this.ea = ea;
    this.profile = profile;
    this.account = profile.getProfile();
    ea.subscribe('myAccount', account => this.unpackAccount(account));

    this.showChangeTheme = true;
    this.changingTheme = false;
    this.showChangeLayout = true;
    this.changingLayout = false;

    this.themes = ['Light', 'Dark', 'Golden', 'Bronze', 'Silver', 'Red', 'Green', 'Blue'];
    this.layouts = [
      {
        id: 1,
        name: 'Full Height, 1 Chats per row, 1 row',
        rows: 1,
        maximumChats: 1,
        chatsPerRow: 1
      },
      {
        id: 2,
        name: 'Full Height, 2 Chats per row, 1 row',
        rows: 1,
        maximumChats: 2,
        chatsPerRow: 2
      },
      {
        id: 3,
        name: 'Full Height, 3 Chats per row, 1 row',
        rows: 1,
        maximumChats: 3,
        chatsPerRow: 3
      },
      {
        id: 4,
        name: 'Half Height, 1 chat per row, 2 rows',
        rows: 2,
        maximumChats: 2,
        chatsPerRow: 1
      },
      {
        id: 5,
        name: 'Half Height, 2 Chats per row, 2 rows',
        rows: 2,
        maximumChats: 4,
        chatsPerRow: 2
      },
      {
        id: 6,
        name: 'Half Height, 3 chat per row, 2 rows',
        rows: 2,
        maximumChats: 6,
        chatsPerRow: 3
      }];
  }

  attached() {
    if (this.isMobile == true) {
      this.saveLayout(1);
      this.showChangeLayout = false;
      this.ea.publish('isPhone', true);
    }

  }
  unpackAccount(account) {
    this.myAccount = account;
    this.selectedTheme = account.settings.theme;
    this.selectedLayout = account.settings.layout;
    this.settings = account.settings;
    this.appName = this.settings.appName;
  }
 detectmob() { 
  if( navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/Windows Phone/i)
  ){
      return true;
    }
  else if (window.innerWidth <= 800 && window.innerHeight <= 600) {
    return true;
  }
  else {
      return false;
    }
  }
  displayChangeTheme() {
    this.cancel('layout');
    this.showChangeTheme = false;
    this.changingTheme = true;
  }
  displayChangeLayout() {
    this.cancel('theme');
    this.showChangeLayout = false;
    this.changingLayout = true;
  }
  cancel(setting) {
    if (setting == 'theme') {
      this.showChangeTheme = true;
      this.changingTheme = false;
      this.selectedTheme = this.myAccount.settings.theme;
      this.ea.publish('updateTheme', this.selectedTheme);
    }
    else if (setting == 'layout') {
      this.showChangeLayout = true;
      this.changingLayout = false;
    }
  }
  saveTheme(theme) {
      this.ea.publish('saveTheme', theme);
      this.cancel('theme');
  }
  updateTheme() {
      this.ea.publish('updateTheme', this.selectedTheme);
  }
  saveLayout(layoutId) {
    for (var i = 0; i < this.layouts.length; i++) {
      if (this.layouts[i].id == layoutId) {
        this.ea.publish('saveLayout', this.layouts[i]);
        this.cancel('layout');
        return;
      }
    }
  }
}
