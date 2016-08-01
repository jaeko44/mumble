import {Profile} from '../app/profile';
import $ from 'jquery';
import 'bootstrap';

export class Chat {

  constructor() {
    this.appName = '... mumble';
    this.navigation = 1;
    this.setfName = '';
    this.getfName = 'Jonathan';
    this.setlName = '';
    this.getlName = 'Philipos';
    this.setEmail = '';
    this.getEmail = 'jonathan@det.io';
    this.user = new Profile();
  }
  addUser() {
    if (this.setfName) {
      alert("Adding custom user now");
      this.navigation = 2;
      this.user = new Profile(this.setfName, this.getlName, this.getEmail);
      this.getfName = this.setfName;
      this.setfName = '';
    }
    else {
      alert("Adding default user now");
      this.user = new Profile(this.getfName, this.getlName, this.getEmail);
    }
  }
  fullName() {
    return `${this.getfName} ${this.getlName}`;
  }
  updateEmail() {
    if (this.setEmail) {
      this.user = new Profile(this.getfName, this.getlName, this.setEmail);
      this.getEmail = this.setEmail;
      this.setEmail = '';
    }
  }
  toggleNavigation() {
    if (this.navigation == 2) {
      this.navigation = 1;
    }
    else {
      this.navigation = 2;
    }
  }
}
