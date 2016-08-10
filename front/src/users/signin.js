import {inject} from 'aurelia-framework';
import {Profile} from '../app/profile';
import {Router} from 'aurelia-router';
import $ from 'jquery';

@inject(Profile, Router)
export class login {

  constructor(profile, router) {
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
        if (this.email == this.account.email) {
            this.response = "Account found";
            if (this.password == this.account.password) {
                    location.assign('#/home');
            }
            else {
                this.showSpin = false;
                this.password = '';
                this.response = "Password entered does not match your password.";
            }
        }
        else {
            this.email = '';
            this.showSpin = false;
            this.response = "No account found by that email."
        }
      }, 600);
  }
}