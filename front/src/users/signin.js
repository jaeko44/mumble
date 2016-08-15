import {inject} from 'aurelia-framework';
import {Profile} from '../app/profile';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from '../data/web-api';
import $ from 'jquery';

@inject(Profile, Router, EventAggregator, WebAPI)
export class login {

  constructor(profile, router, ea, api) {
    this.api = api;
    this.ea = ea;
    this.router = router;
    console.log('the router ', router);
    this.profile = profile;
    this.showSpin = false;
    this.account = profile.getProfile();
    this.email = '';
    this.response = 'none';
    this.password = '';
  }
  
  login() {
      this.showSpin = true;
      setTimeout(() => {
          var response = this.api.authenticate(this.email, this.password);
          if (response == 1) {
              this.response = 'Authentication Successfull';
              location.assign('#/home');
          }
          else if (response == 2) {
              this.response = 'Mismatched Password';
          }
          else if (response == 3) {
              this.response = 'Account not found';
          }
          else {
              this.response = 'No response from server';
          }
          this.showSpin = false;
      }, 600);
  }
}