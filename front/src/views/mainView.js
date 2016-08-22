import {Profile} from '../app/profile';
import {inject} from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import * as toastr from "toastr";

@inject(Profile, EventAggregator)
export class mainView {

  constructor(profile, ea){
    this.ea = ea;
    ea.subscribe('saveTheme', theme => this.updateTheme(theme));
    ea.subscribe('updateTheme', theme => this.updateTheme(theme));
    ea.subscribe('isPhone', isPhone => this.updatePhoneClass(isPhone));
    ea.subscribe('myAccount', account => this.myAccount = account);

    this.isPhone = false;
    this.profile = profile;
    this.account = profile.getProfile();
  }
  updateTheme(theme) {
    this.theme = theme;
  }
  updatePhoneClass(isPhone) {
    this.isPhone = isPhone;
  }
  activate(params, navigationInstruction) {
      this.route = navigationInstruction;
      console.log('printing params of homeView followed by navigationInstruction');
      console.log(navigationInstruction);
      console.log(params);
      if (this.route.name == 'home') {
          this.page = 'home';
      }
      else if (this.route.name == 'settings') {
          this.page = params.page;
      }
      firebase.auth().onAuthStateChanged(function(user) { //MAKE SURE ACCOUNT IS LOGGED IN
          if (!user) {
              location.assign('/');
          }
      });
  }
  toggleNavigation() {
    if (this.myAccount.settings.navigation == 2) {
      this.myAccount.settings.navigation = 1;
      this.profile.setNavigationTo(1);
    }
    else {
      this.myAccount.settings.navigation = 2;
      this.profile.setNavigationTo(2);
    }
  }
  logout() {
    firebase.auth().signOut().then(function() {
      location.assign('/');
    }, function(error) {
      alert('Failed to logout :(');
    });
  }
}