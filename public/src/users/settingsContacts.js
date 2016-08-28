import {Profile} from '../app/profile';
import {inject} from 'aurelia-framework';
import {WebAPI} from '../data/web-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import $ from 'jquery';

@inject(Profile, WebAPI, EventAggregator)
export class settingsContacts {

  constructor(profile, api, ea) {
    this.api = api;
    this.contacts = [];
    this.response = '';
    ea.subscribe('myAccount', account => this.myAccount = account);
    ea.subscribe('contactLoaded', account => this.addContact(account));
    ea.subscribe('ContactNotFound', response => this.response = response);
    this.profile = profile;
    this.contactEmail = '';
  }

  addContact(account) {
    console.log('ADDING CONTACT IN SETTINGS CONTACTJS', account, this.contacts);
    this.response = '';
    this.contacts.push(account);
  }
  removeContact(account) {
    this.api.removeContact(account.email);
    for (var i = 0; i < this.contacts.length; i++) {
      if (this.contacts[i].email == account.email) {
        this.contacts.splice(i, 1);
        break;
      }
    }
  }
  displayAddContact() {
    var _this = this;
    swal({ 
      title: "Request to add a contact",
      text: "Add contact via email:",
      type: "input",
      showCancelButton: true,
      closeOnConfirm: false,
      inputPlaceholder: "Email Address",
      showLoaderOnConfirm: true,
     }, 
    function (inputValue) {
      if (inputValue === false) {
        return false; 
      }
      if (inputValue === "") { 
        swal.showInputError("You need to write something!");
        return false;
      }
      if (_this.validateEmail(inputValue)) {
        var res = _this.api.addContact(inputValue).then(function(res) {
          swal("Contact Added.", res, "success");
          messages.create({text: 'Succesfulyl added: ', res});
        messages.create({text: 'Hello from Aurelia WEBSOCKET'});
        }).catch(function(e) {
          swal.showInputError(e);
        });
      }
      else {
        swal.showInputError("Please enter a valid email");
      }
    });
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  saveContact() {
    var res = this.api.addContact(this.contactEmail);
    this.response = res;
    this.addingContact = false;
    this.contactEmail = '';
  }
}
