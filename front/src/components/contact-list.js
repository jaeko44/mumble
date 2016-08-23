import {WebAPI} from '../data/web-api';
import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';
import {ChatsUpdated, ChatOpened, ChatClosed, ChatSyncNav} from './chat-events';

let alertDelay = 5000; 

@inject(WebAPI, EventAggregator)

export class ContactList {

  constructor(api, ea){
    this.api = api;
    this.ea = ea;
    this.contacts = [];
    this.channels = [];
    this.chatsOpen = [];
    //Open chat, set unread messages to 0 and apply active class.
    ea.subscribe('ChatOpenedSuccesfully', chatId => this.clear(chatId));
    //Remove active class.
    ea.subscribe('ChatClosedSuccesfully', contact => this.close(chatId)); 
    ea.subscribe('contactsLoaded', contacts => this.contacts = contacts); 
    ea.subscribe('contactLoaded', contact => this.addContact(contact)); 
    ea.subscribe('channelsLoaded', contacts => this.contacts = contacts); 
  }

  created(){
    this.getChannels();
  }

  addContact(contact) {
    if (contact) {
      console.log('Contact list - adding contact', contact);
      this.contacts.push(contact);
    }
  }

  getChannels() {
    this.api.getChannelList().then(channels => this.channels = channels);
  }
  getContactbyChatId(chatId) {
    return this.api.getContactbyChatId(chatId);
  }
  open(contact) {
    this.ea.publish('ChatOpened', contact.chatId);
  }
  
  clear(chatId) {
    console.log('clear called', this.contacts);
    var foundChannel = false;
    var foundContact = false;
    for (var i in this.contacts) {
     if (this.contacts[i].chatId == chatId) {
        this.contacts[i].isOpen = this.contacts[i].isOpen || true;
        this.contacts[i].isOpen = true;
        this.contacts[i].unreadMsgs = 0;
        this.contacts[i].alert = 0;
        foundContact = true;
        break; //Stop this loop, we found it!
      }
    }
    for (var i in this.channels) {
     if (this.channels[i].chatId == chatId) {
        this.channels[i].isOpen = true;
        this.channels[i].unreadMsgs = 0;
        foundChannel = true;
        break; //Stop this loop, we found it!
      }
    }
    if (foundChannel && foundContact == false) {
      console.log('not found: (contact.chatId) ', contact.contact.chatId);
    }
  }
  close(chatId) {
    var foundContact = false;
    var foundChannel = false;
    for (var i in this.contacts) {
     if (this.contacts[i].chatId == chatId) {
        this.contacts[i].isOpen = false;
        this.contacts[i].unreadMsgs = 0;
        this.contacts[i].alert = 0;
        foundContact = true;
        break; //Stop this loop, we found it!
      }
    }
    for (var i in this.channels) {
     if (this.channels[i].chatId == chatId) {
        this.channels[i].isOpen = false;
        this.channels[i].unreadMsgs = 0;
        foundChannel = true;
        break; //Stop this loop, we found it!
      }
    }
    if (foundChannel && foundContact == false) {
      console.log('not found: ', chatId);
    }
  }

  chatSync(chatsActive) {
    this.chatsOpen = chatsActive;
    console.log(this.chatsOpen);
  }
}