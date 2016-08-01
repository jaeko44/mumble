import {WebAPI} from '../data/web-api';

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
}