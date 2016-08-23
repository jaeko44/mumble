import {Profile} from '../app/profile';
import {WebAPI} from '../data/web-api';
import {inject} from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import $ from 'jquery';

@inject(Profile, EventAggregator, WebAPI)
export class settingsSecurity {

  constructor(profile, ea, api) {
    this.api = api;
    this.profile = profile;
    this.responseError;
    this.responseSuccess;
    ea.subscribe('successSecurity', response => this.responseSuccess = response);
    ea.subscribe('errorSecurity', response => this.responseError = response);
    this.showChangePassword = true;
    this.currPass;
    this.newPass;
  }

  displayChangePassword() {
    this.changingPassword = true;
    this.showChangePassword = false;
  }

  cancel(setting) {
    this.response = '';
    if (setting == 'password') {
      this.showChangePassword = true;
      this.changingPassword = false;
    }
  }
  
  savePassword() {
    this.responseError = '';
    this.responseSuccess= '';
    this.api.changePassword(this.currPass, this.newPass);
    this.currPass = '';
    this.newPass = '';
  }
}
