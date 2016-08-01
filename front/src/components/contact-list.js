import {WebAPI} from '../data/web-api';
let latency = 5000; 

export class ContactList {
  static inject() { return [WebAPI] };

  constructor(api){
    this.api = api;
    this.contacts = [];
  }

  created(){
    this.api.getContactList().then(contacts => this.contacts = contacts);
  }

  select(contact){
    this.selectedId = contact.id;
    return true;
  }
  refresh(contact) {
    if (contact.unreadMsgs >= 1) {
      contact.unreadMsgs = 0;
      contact.alert = 3;
    }
    else {
      contact.unreadMsgs = 2; //EXAMPLE OF MSG POPPING UP
      setTimeout(() => {
          contact.alert = 2;
      }, latency);
      contact.alert = 1;
    }
  }
}