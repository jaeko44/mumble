import {WebAPI} from '../data/web-api';
import {Profile} from '../app/profile';
import {inject} from 'aurelia-framework';
import $ from 'jquery';

@inject(WebAPI, Profile)
export class chatTile {

    constructor(api, profile) {
        this.profile = profile;
        this.api = api;
        this.account = profile.getProfile();
        this.chats = [];
        this.tempMessage = [];
        this.chatsOpen = 3;
        this.chatStyles = [
            {
                id: 1,
                closed: 'false',
                height: 'auto',
                styles: {
                    width: '100%',
                    height: '100%',
                    'background-color': 'red'
                },
            },
            {
                id: 2,
                closed: 'false',
                height: 'auto',
                styles: {
                    width: '100%',
                    height: '100%',
                    'background-color': 'blue'
                },
            },
            {
                id: 3,
                closed: 'false',
                height: 'auto',
                styles: {
                    width: '100%',
                    height: '100%',
                    'background-color': 'yellow'
                }
            }
        ]
    }

    created() {
       this.api.getMsgs().then(chats => this.chats = chats);
    }

    userDetails(userId) {
        if (userId == 1) {
            return this.api.getProfile();
        }
        else {
            return this.api.getContactDetails(userId);
        }
    }
    channelDetails(channelId) {
        return this.api.getChannelDetails(channelId);
    }
    displayChats() {
        alert('Display chats called');
        console.log('Folllowed by activechats array: [] ');
        console.log(this.chats);
    }
    myHeight(id) {
        this.element = "chat-" + id;
        this.h = document.getElementById(this.element).offsetHeight;
        return this.h;
    }
    close(id) {
        this.height = this.myHeight(id);
        this.chatStyles[id - 1].styles.height = this.height + 'px';
        this.chatStyles[id - 1].closed = 'true';
        this.chatsOpen--;
    }
    open(id) {
        this.chatStyles[id - 1].styles.height = '100%';
        this.chatStyles[id - 1].closed = 'false';
        this.chatsOpen++;
    }
    sendMessage(id) {
        this.message = {
            data: this.tempMessage[id],
            from: 1,
            date: 'now'
        }
        this.chats[id - 1].messages.push(this.message);
        this.tempMessage[id] = '';
        this.inputId = "chat-input-" + id;
        this.contentId = "chat-content-" + id;
        this.inputEl = document.getElementById(this.inputId).value = '';
        this.message = {};
        console.log(this.tempMessage);
        this.contentEl = document.getElementById(this.contentId);
        console.log(this.contentEl.scrollHeight, this.contentEl.clientHeight);
        setTimeout(function (){
            this.contentId = "chat-content-" + id;
            this.contentEl = document.getElementById(this.contentId);
            $('#' + this.contentId ).animate({ scrollTop: this.contentEl.scrollHeight }, 300);
        }, 30);
    }
}