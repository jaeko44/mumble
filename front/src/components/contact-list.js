import {WebAPI} from '../data/web-api';
import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';
import {ChatsUpdated, ChatOpened, ChatClosed} from './chat-events';

let alertDelay = 5000; 

@inject(WebAPI, EventAggregator)

export class ContactList {

  constructor(api, ea){
    this.api = api;
    this.ea = ea;
    this.contacts = [];
    this.openChats = [];
    ea.subscribe(ChatOpened, contact => this.clear(contact));
  }

  created(){
    this.api.getContactList().then(contacts => this.contacts = contacts);
  }

  open(contact) {
    this.ea.publish(new ChatsUpdated(contact));
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
      }, alertDelay);
      contact.alert = 1;
    }
  }
  
  clear(ChatOpened) {
    console.log('Clear called');
    var contact = ChatOpened.contact;
    let found = this.contacts.filter(x => x.id === contact.id)[0];
    if (typeof found !== "undefined") {
       console.log('found: ', found);
       console.log(this.openChats);
    }
    else {
      console.log('not found: ', found);
    }
    contact.unreadMsgs = 0;
    contact.alert = 3;
  }
}