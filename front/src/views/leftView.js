import {Profile} from '../app/profile';
import {Redirect} from 'aurelia-router';
import {inject} from 'aurelia-framework';

@inject(Profile)
export class leftView {

  constructor(profile, ea) {
    this.ea = ea;
    this.profile = profile;
    this.account = profile.getProfile();
    this.settings = profile.getSettings();
    this.appName = this.settings.appName;
  }
  activate(params) {
      this.page = params;
  }
  appearOffline() {
    console.log('start appearing offline function');
  }
  fullName() {
    console.log('printing account1');
    console.log(this.account);
    return `${this.account.firstName} ${this.account.lastName}`;
  }
  toSettings() {
    console.log('redirecting to settings: ');
    new Redirect('settings');
  }
}
