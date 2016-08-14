import {WebAPI} from '../data/web-api';
import {Profile} from '../app/profile';
import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';
import $ from 'jquery';
import {ChatsUpdated, ChatOpened, ChatClosed} from './chat-events';
import toastr from "toastr";
import Dropzone from 'dropzone';

@inject(WebAPI, Profile, EventAggregator)
export class chatTile {

    constructor(api, profile, ea) {
        this.profile = profile;
        this.api = api;
        this.ea = ea;
        this.account = profile.getProfile();
        this.settings = profile.getSettings();
        this.chats = [];
        this.tempMessage = [];
        this.layout = this.settings.layout;
        this.chatsActive = [
            {
                id: 1,
                chatId: 1,
                chatType: 'message',
                isOpen: true,
                unreadMsgs: 0,
                cooldown: false,
                closed: 'false',
                styles: {
                    height: '100%',
                },
            },
            {
                id: 2,
                chatId: 6,
                chatType: 'channel',
                isOpen: true,
                unreadMsgs: 0,
                cooldown: false,
                closed: 'false',
                styles: {
                    height: '100%',
                },
            },
            {
                id: 3,
                chatId: 3,
                chatType: 'message',
                isOpen: true,
                unreadMsgs: 0,
                cooldown: false,
                closed: 'false',
                styles: {
                    height: '100%'
                }
            }
        ]

        this.chatsOpen = this.chatsActive.length;
        ea.subscribe(ChatsUpdated, contact => this.displayChat(contact));
        ea.subscribe('saveLayout', layout => this.updateLayout(layout));
        console.log('sending this chatsActive', this.chatsActive);
    }
    created() {
        //this.api.getMsgs().then(chats => this.chats = chats);
        this.chats = this.extractData(this.chatsActive);
        //CAN BE REMOVED WHEN DYNAMIC DATA IS USED. FOR NOW WE ENSURE THESE CHATS ARE DETECTED OPEN
        let tempOpenChat = this.userDetails(2);
        this.updateNavbar();
    }
    attached() {
        for (var id = 1; id <= this.chatsActive.length; id++) {
            var dropZoneEl = "myDropZone-" + id;
            var dropzoneUpload = document.getElementById("myDropZone-" + id);
            var myDropzone = new Dropzone(dropzoneUpload, { url: "/file/post" });
        }
    }
    updateNavbar() {
        console.log('Update all navbar in 1 second.');
        setTimeout(() => {
            for (var id = 0; id < this.chatsActive.length; id++) {
                var chatActive = this.chatsActive[id];
                var chatProfile = this.profile.findChatId(chatActive.chatId);
                if (chatActive.isOpen == true) {
                    console.log('ChatOpened called from updateNavBar');
                    this.ea.publish(new ChatOpened(chatProfile));
                }
                else {
                    console.log('ChatClosed called from updateNavBar');
                    this.ea.publish(new ChatClosed(chatProfile));
                }
            }
        }, 1000);
    }
    extractData(array) {
        var tempData = [];
        for (let id = 0; id < array.length; id++) { 
            var tempMsg = this.messageDetailschatId(array[id].chatId);
            tempMsg.chatId = array[id].chatId;
            tempMsg.tmpId = id + 1;
            tempData.push(tempMsg);
        }
        return tempData;
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
    messageDetailschatId(chatId) {
        return this.api.getChatIdDetails(chatId);
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
    updateLayout(layout) {
        this.layout = layout;
        var purgedChat = this.chatsActive;
        //We need to update the navbar to reflect the open chats.
        while (this.layout.maximumChats < purgedChat.length) {
            var chatClosing = purgedChat.pop(); 
            console.log('ChatClosed called from updateLayout for ', chatClosing);
            this.ea.publish(new ChatClosed(chatClosing));
        }
    }
    displayChat(ChatsUpdated) {
        if (typeof found !== "undefined") {
            return found;
        }
        toastr.success('Gayyyyyyyyyyyyyyyyyyy.', 'Turtle Bay Resort', {timeOut: 5000});
        var last = this.chatsActive[this.chatsActive.length - 1]
        var chatId = ChatsUpdated.contact.chatId;
        var unreadMsgs = ChatsUpdated.contact.unreadMsgs;
        var purgedChat = this.chatsActive;
        if (this.layout.maximumChats <= purgedChat.length) {
            var chatClosing = purgedChat.pop(); 
            console.log('last & chatClosing', last, chatClosing);
            console.log('ChatClosed called from updateNavBar');
            this.ea.publish(new ChatClosed(last));
        }
        let found = purgedChat.filter(x => x.chatId === chatId)[0];
        var chatActive = {
            id: 1,
            chatId: chatId,
            unreadMsgs: unreadMsgs,
            cooldown: 'false',
            closed: 'false',
            styles : {
                height: '100%'
            }
        }
        for (let id = 0; id < purgedChat.length; id++) {
            purgedChat[id].id++;
        }
        purgedChat.unshift(chatActive);
        this.chatsActive = purgedChat;
        this.chats = this.extractData(purgedChat);
        console.log('ChatOpened called from displaychat');
        this.ea.publish(new ChatOpened(ChatsUpdated.contact));
        setTimeout(function (){
            let contentId = "chat-content-" + 1;
            let contentEl = document.getElementById(contentId);
            $('#' + contentId ).animate({ scrollTop: contentEl.scrollHeight }, 50);
            //contentEl.scrollTop = contentEl.scrollHeight;
        }, 30);
        setTimeout(function () {
            if (unreadMsgs >= 1) {
                purgedChat[0].cooldown = true;            
            }
        }, 1000);
        this.chatsActive = purgedChat;
        setTimeout(function () {
            if (unreadMsgs >= 1) {
                purgedChat[0].unreadMsgs = 0;
                purgedChat[0].cooldown = false;            
            }
        }, 7000);
        this.chatsActive = purgedChat;
    }
    sendMessage(id) {
        if (this.tempMessage[id] == '') {
            return;
        }
        let youtubeCom = this.tempMessage[id].indexOf('youtube.com/watch?v=');
        let youtubeBe = this.tempMessage[id].indexOf('youtu.be/');
        let youtubeId = '';
        if (youtubeCom >= 1) {
            youtubeId = this.tempMessage[id].substring(youtubeCom + 31, youtubeCom + 20); //youtube.com/watch?v= is 20 characters, and the ID is another 11.
            this.message = {
                data: this.tempMessage[id],
                from: 1,
                date: 'now',
                attachments: [
                    {
                        type: 'video',
                        id: youtubeId
                    }
                ],
            }
        }
        else if (this.youtubeBe >= 1) {
            youtubeId = this.tempMessage[id].substring(this.youtubeBe + 20, this.youtubeBe + 9); //youtu.be/ is 9 characters, and the ID is another 11.
            this.message = {
                data: this.tempMessage[id],
                from: 1,
                date: 'now',
                cooldown: false,
                attachments: [
                    {
                        type: 'video',
                        id: youtubeId
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
        this.chats[id - 1].messages.push(this.message);
        this.tempMessage[id] = '';
        let inputId = "chat-input-" + id;
        let inputEl = document.getElementById(inputId).value = '';
        setTimeout(function (){
            let contentId = "chat-content-" + id;
            let contentEl = document.getElementById(contentId);
            $('#' + contentId ).animate({ scrollTop: contentEl.scrollHeight }, 300);
        }, 30);
    }
}