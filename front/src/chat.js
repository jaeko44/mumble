import {Profile} from './profile';

export class Chat {

  constructor() {
    this.appName = '... mumble';
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
}
