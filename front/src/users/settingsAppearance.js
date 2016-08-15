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
    this.settings = profile.getSettings();
    this.appName = this.settings.appName;
    this.showChangeTheme = true;
    this.changingTheme = false;
    this.showChangeLayout = true;
    this.changingLayout = false;
    this.selectedTheme = this.settings.theme;
    this.selectedLayout = this.settings.layout;
    console.log('Original Selected layout : ', this.selectedLayout);
    this.themes = ['Light', 'Dark', 'Golden', 'Bronze', 'Silver', 'Red', 'Green', 'Blue'];
    this.layouts = [
      {
        id: 1,
        name: 'Full Height, 1 Chats per row, 1 row',
        rows: 1,
        maximumChats: 1
      },
      {
        id: 2,
        name: 'Full Height, 2 Chats per row, 1 row',
        rows: 1,
        maximumChats: 2
      },
      {
        id: 3,
        name: 'Full Height, 3 Chats per row, 1 row',
        rows: 1,
        maximumChats: 3
      },
      {
        id: 4,
        name: 'Half Height, 3 Chats per row, 2 rows',
        rows: 2,
        maximumChats: 6
      },
      {
        id: 5,
        name: 'Half Height, 2 Chats per row, 2 rows',
        rows: 2,
        maximumChats: 4
      },
      {
        id: 6,
        name: 'Half Height, 1 chat per row, 2 rows',
        rows: 2,
        maximumChats: 2
      }];
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
      this.selectedTheme = this.settings.theme;
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
