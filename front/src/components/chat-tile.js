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
        this.chatsActive = [
            {
                id: 1,
                chatId: 1,
                closed: 'false',
                styles: {
                    height: '100%',
                },
            },
            {
                id: 2,
                chatId: 4,
                closed: 'false',
                styles: {
                    height: '100%',
                },
            },
            {
                id: 3,
                chatId: 3,
                closed: 'false',
                styles: {
                    height: '100%',
                }
            }
        ]
    }

    created() {
    //    this.api.getMsgs().then(chats => this.chats = chats);
        this.chats = this.extractData();
    }
    
    extractData() {
        this.tempData = [];
        for (this.id = 0; this.id < this.chatsActive.length; this.id++) { 
            this.tempData.push(this.messageDetails(this.chatsActive[this.id].chatId));
        }
        return this.tempData;
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
    messageDetails(messageId) {
        return this.api.getMessageDetails(messageId);
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
        this.chatsActive[id - 1].styles.height = this.height + 'px';
        this.chatsActive[id - 1].closed = 'true';
        this.chatsOpen--;
    }
    open(id) {
        this.chatsActive[id - 1].styles.height = '100%';
        this.chatsActive[id - 1].closed = 'false';
        this.chatsOpen++;
    }
    sendMessage(id) {
        this.youtubeCom = this.tempMessage[id].indexOf('youtube.com/watch?v=');
        this.youtubeBe = this.tempMessage[id].indexOf('youtu.be/');
        this.youtubeId = '';
        if (this.tempMessage[id] == '') {

        }
        else if (this.youtubeCom >= 1) {
            this.youtubeId = this.tempMessage[id].substring(this.youtubeCom + 31, this.youtubeCom + 20); //youtube.com/watch?v= is 20 characters, and the ID is another 11.
            this.message = {
                data: this.tempMessage[id],
                from: 1,
                date: 'now',
                attachments: [
                    {
                        type: 'video',
                        id: this.youtubeId
                    }
                ],
            }
        }
        else if (this.youtubeBe >= 1) {
            this.youtubeId = this.tempMessage[id].substring(this.youtubeBe + 20, this.youtubeBe + 9); //youtu.be/ is 9 characters, and the ID is another 11.
            this.message = {
                data: this.tempMessage[id],
                from: 1,
                date: 'now',
                attachments: [
                    {
                        type: 'video',
                        id: this.youtubeId
                    }
                ],
            }
        }
        else {
            this.message = {
                data: this.tempMessage[id],
                from: 1,
                date: 'now',
            }
        }
        let found = this.chatsActive.filter(x => x.chatId == id)[0];
        console.log(found);
        this.chats[found.id - 1].messages.push(this.message);
        this.tempMessage[id] = '';
        this.inputId = "chat-input-" + id;
        this.inputEl = document.getElementById(this.inputId).value = '';
        this.message = {};
        setTimeout(function (){
            this.contentId = "chat-content-" + id;
            this.contentEl = document.getElementById(this.contentId);
            $('#' + this.contentId ).animate({ scrollTop: this.contentEl.scrollHeight }, 300);
        }, 30);
    }
}