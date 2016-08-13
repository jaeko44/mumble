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
    this.selectedTheme = this.settings.theme;
    this.themes = ['Light', 'Dark', 'Golden', 'Bronze', 'Silver', 'Red', 'Green', 'Blue'];
  }
  
  displayChangeTheme() {
    this.cancel('other'); //Cancel all others
    this.showChangeTheme = false;
    this.changingTheme = true;
  }
  cancel(setting) {
    if (setting == 'theme') {
      this.showChangeTheme = true;
      this.changingTheme = false;
      this.selectedTheme = this.settings.theme;
      this.ea.publish('updateTheme', this.selectedTheme);
    }
  }

  updateTheme() {
      this.ea.publish('updateTheme', this.selectedTheme);
  }
  
  saveTheme(theme) {
      this.ea.publish('saveTheme', theme);
      this.cancel('theme');
  }
}
