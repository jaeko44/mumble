import {Profile} from '../app/profile';
import {Redirect} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';

@inject(Profile, EventAggregator)
export class leftView {

  constructor(profile, ea) {
    this.ea = ea;
    this.ea.subscribe('myAccount', account => this.myAccount = account);
    this.profile = profile;
    this.account = profile.getProfile();
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
    this.router.navigateToRoute('settings', { page: 'profile' });
  }
}
