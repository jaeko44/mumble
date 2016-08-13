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
    ea.subscribe(ChatOpened, contact => this.clear(contact));
    //Remove active class.
    ea.subscribe(ChatClosed, contact => this.close(contact)); 
  }

  created(){
    this.getContacts();
    this.getChannels();
  }

  getContacts() {
    this.api.getContactList().then(contacts => this.contacts = contacts);
  }
  getChannels() {
    this.api.getChannelList().then(channels => this.channels = channels);
  }
  getContactbyChatId(chatId) {
    return this.api.getContactbyChatId(chatId);
  }
  open(contact) {
    this.ea.publish(new ChatsUpdated(contact));
  }
  
  clear(contact) {
    var foundContact = this.contacts.filter(x => x.chatId === contact.contact.chatId)[0];
    var foundChannel = this.channels.filter(x => x.chatId === contact.contact.chatId)[0];
    var foundContact = false;
    var foundChannel = false;
    for (var i in this.contacts) {
     if (this.contacts[i].chatId == contact.contact.chatId) {
        this.contacts[i].isOpen = true;
        this.contacts[i].unreadMsgs = 0;
        this.contacts[i].alert = 0;
        foundContact = true;
        break; //Stop this loop, we found it!
      }
    }
    for (var i in this.channels) {
     if (this.channels[i].chatId == contact.contact.chatId) {
        this.channels[i].isOpen = true;
        this.channels[i].unreadMsgs = 0;
        foundChannel = true;
        break; //Stop this loop, we found it!
      }
    }
    if (foundChannel && foundContact == false) {
      console.log('not found: (contact.chatId) ', contact.contact.chatId);
      console.log('Contact of not found', contact)
    }
  }
  close(contact) {
    var foundContact = false;
    var foundChannel = false;
    for (var i in this.contacts) {
     if (this.contacts[i].chatId == contact.contact.chatId) {
        this.contacts[i].isOpen = false;
        this.contacts[i].unreadMsgs = 0;
        this.contacts[i].alert = 0;
        foundContact = true;
        break; //Stop this loop, we found it!
      }
    }
    for (var i in this.channels) {
     if (this.channels[i].chatId == contact.contact.chatId) {
        this.channels[i].isOpen = false;
        this.channels[i].unreadMsgs = 0;
        foundChannel = true;
        break; //Stop this loop, we found it!
      }
    }
    if (foundChannel && foundContact == false) {
      console.log('not found: (contact.chatId) ', contact.contact.chatId);
      console.log('Contact of not found', contact)
    }
  }

  chatSync(chatsActive) {
    this.chatsOpen = chatsActive;
    console.log(this.chatsOpen);
  }
}