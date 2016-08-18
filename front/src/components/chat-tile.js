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
        this.timeStamps = [[], [], [], [], [], []];
        this.dateStamps = [[], [], [], [], [], []];
        this.layout = this.settings.layout;
        this.chatsActive = [
            {
                id: 1,
                row: 1,
                chatId: 1,
                chatType: 'message',
                isOpen: true,
                contentId: 0,
                cooldown: false,
                closed: 'false',
                styles: {
                    height: '100%',
                },
            },
            {
                id: 2,
                row: 1,
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
                row: 1,
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
        this.updateTimeStamps();
        this.timeStampsLoop();
        for (var id = 1; id <= this.chatsActive.length; id++) {
            var dropZoneEl = "myDropZone-" + id;
            var dropzoneUpload = document.getElementById("myDropZone-" + id);
            var myDropzone = new Dropzone(dropzoneUpload, { url: "/file/post" });
        }
    }
    updateNavbar() {
        setTimeout(() => {
            this.chatsOpen = 0;
            for (var id = 0; id < this.chatsActive.length; id++) {
                var chatActive = this.chatsActive[id];
                var chatProfile = this.profile.findChatId(chatActive.chatId);
                if (chatActive.isOpen == true) {
                    this.chatsOpen++;
                    this.ea.publish(new ChatOpened(chatProfile));
                }
                else {
                    this.ea.publish(new ChatClosed(chatProfile));
                }
            }
        }, 1000);
    }
    // compareTime(time) {
    //     var d = new Date();
    //     var currTime = d.getTime();
    //     var timeDifference = currTime - time;
    //     var minutes = 1000 * 60;
    //     var hours = 60;
    //     var days = hours * 24;
    //     var years = days * 365;
    //     var minutesDifference = Math.round(timeDifference / minutes);
    //     if (minutesDifference <= 1) {
    //         return 'now';
    //     }
    //     else if (minutesDifference >= 1 && minutesDifference <= hours) {
    //         return minutesDifference + ' minutes ago';
    //     }
    //     else if (minutesDifference >= hours && minutesDifference / hours > 12 && minutesDifference / hours < 24) {
    //         let hoursAgo = Math.floor(minutesDifference/hours);
    //         let remainder = minutesDifference % hours;
    //         return hoursAgo + ' hours ago';
    //     }
    //     else if (minutesDifference / hours > 24) {
    //         let daysAgo = Math.floor(minutesDifference/days);
    //         let remainder = minutesDifference % days;
    //         return daysAgo + ' days ago';
    //     }
    // }
    timeStampsLoop() { //Create a 60 second loop to update all timestamps.
        console.log('Started update timestamps');
        setInterval(() => {
            this.chats.forEach(function(chat) {
                for (var index = 0; index < chat.messages.length; index++) {
                    this.updateTimeStamp(chat.tmpId - 1, index);
                }
            }, this);
        }, 60000);
    }
    updateTimeStamps() { //One time update (when the page loads)
        this.chats.forEach(function(chat) {
            for (var index = 0; index < chat.messages.length; index++) {
                this.updateTimeStamp(chat.tmpId - 1, index);
            }
        }, this);
    }
    updateTimeStamp(chatId, messageId) {
        var chat = this.chats[chatId];  
        var message = chat.messages[messageId];
        var d = new Date();
        var currTime = d.getTime();
        var compTime = new Date(+message.time);
        var date = compTime.toLocaleString();
        var seconds = compTime.getSeconds();
        var timeDifference = currTime - message.time;
        var minutes = 1000 * 60;
        var hours = 60;
        var days = hours * 24;
        var years = days * 365;
        var minutesDifference = Math.round(timeDifference / minutes);
        if (minutesDifference <= 1) {
            this.timeStamps[chat.tmpId - 1][messageId] = 'now';
        }
        else if (minutesDifference >= 1 && minutesDifference <= hours) {
            this.timeStamps[chat.tmpId - 1][messageId] = minutesDifference + ' minutes ago';
        }
        else if (minutesDifference >= hours && minutesDifference / hours > 12 && minutesDifference / hours < 24) {
            let hoursAgo = Math.floor(minutesDifference / hours);
            let remainder = minutesDifference % hours;
            this.timeStamps[chat.tmpId - 1][messageId] = hoursAgo + ' hours ago';
        }
        else if (minutesDifference / hours > 24) {
            let daysAgo = Math.floor(minutesDifference / days);
            let remainder = minutesDifference % days;
            this.timeStamps[chat.tmpId - 1][messageId] = daysAgo + ' days ago';
        }
        var timeSent = this.timeStamps[chat.tmpId - 1][messageId];
        if (timeSent == 'undefined') {
            console.log('Undefined timestamp: ', message);
        }
        this.dateStamps[chat.tmpId - 1][messageId] = date;
        let timeStampId = "chat-" + chat.tmpId + "-message-" + messageId;
        let timeStampEl = document.getElementById(timeStampId);
        timeStampEl.innerHTML = timeSent;
        timeStampEl.setAttribute('title', date);
        $(timeStampEl).tooltip('show').tooltip('hide');
        console.log(this.chats);
        console.log(this.timeStamps);
    }
    extractData(array) {
        var tempData = [];
        for (let id = 0; id < array.length; id++) {
            var tempMsg = this.messageDetailschatId(array[id].chatId);
            tempMsg.chatId = array[id].chatId;
            tempMsg.tmpId = id + 1;
            tempData.push(tempMsg);
        }
        console.log('This chats = ', tempData);
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
        console.log('this layout: ', layout);
        var purgedChat = this.chatsActive;
        //We need to update the navbar to reflect the open chats.
        while (this.layout.maximumChats < purgedChat.length) {
            var chatClosing = purgedChat.pop();
            this.ea.publish(new ChatClosed(chatClosing));
        }
    }
    displayChat(ChatsUpdated) {
        var _this = this;
        var purgedChat = this.chatsActive;
        let found = purgedChat.filter(x => x.chatId === chatId)[0];
        if (typeof found !== "undefined") {
            return found;
        }
        var last = this.chatsActive[this.chatsActive.length - 1]
        var chatId = ChatsUpdated.contact.chatId;
        var unreadMsgs = ChatsUpdated.contact.unreadMsgs;
        if (this.layout.maximumChats <= purgedChat.length) {
            var chatClosing = purgedChat.pop();
            this.ea.publish(new ChatClosed(last));
        }
        var chatHeight = "100%";
        var chatActive = {
            id: 1,
            chatId: chatId,
            unreadMsgs: unreadMsgs,
            cooldown: 'false',
            closed: 'false',
            styles: {
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
        setTimeout(function () {
            let contentId = "chat-content-" + 1; //The chatbox ID.
            let contentEl = document.getElementById(contentId);
            $('#' + contentId).animate({ scrollTop: contentEl.scrollHeight }, 300); //We scroll to the bottom whenever we send a message.
            _this.updateTimeStamps();
            //contentEl.scrollTop = contentEl.scrollHeight;
        }, 30);
        setTimeout(function () {
            if (unreadMsgs >= 1) {
                purgedChat[0].cooldown = true;
            }
            _this.chatsActive = purgedChat;
            _this.chats = _this.extractData(purgedChat);
        }, 1000);
        setTimeout(function () {
            if (unreadMsgs >= 1) {
                purgedChat[0].unreadMsgs = 0;
                purgedChat[0].cooldown = false;
            }
            _this.chatsActive = purgedChat;
            _this.chats = _this.extractData(purgedChat);
        }, 7000);
    }
    sendMessage(id) {
        if (this.tempMessage[id] == '') {
            return;
        }
        this.appendMessage(this.tempMessage[id], 1, id);
        this.tempMessage[id] = '';
        let inputId = "chat-input-" + id;
        let inputEl = document.getElementById(inputId).value = '';
        setTimeout(function () {
            let contentId = "chat-content-" + id; //The chatbox ID.
            let contentEl = document.getElementById(contentId);
            $('#' + contentId).animate({ scrollTop: contentEl.scrollHeight }, 300); //We scroll to the bottom whenever we send a message.
        }, 30);
    }
    scrollDown(chatId) {
        let contentId = "chat-content-" + id; //The chatbox ID.
        let contentEl = document.getElementById(contentId);
        $('#' + contentId).animate({ scrollTop: contentEl.scrollHeight }, 300); //We scroll to the bottom whenever we send a message.
        setTimeout(function () {
            if (this.chatsActive[id - 1].unreadMsgs >= 1) {
                purgedChat[0].unreadMsgs = 0;
                purgedChat[0].cooldown = false;
            }
        }, 7000);
    }
    appendMessage(messageData, messageFrom, chatId) {
        if (this.messageData == '') {
            return;
        }
        if (messageFrom > 1) { //Means that the message is coming from an external user.
            this.chatsActive[this.chats[chatId - 1].tmpId - 1].unreadMsgs++;
        }
        var message = {};
        var d = new Date();
        var timeNow = d.getTime();
        let youtubeCom = messageData.indexOf('youtube.com/watch?v=');
        let youtubeBe = messageData.indexOf('youtu.be/');
        let youtubeId = '';
        if (youtubeCom >= 1) {
            youtubeId = messageData.substring(youtubeCom + 31, youtubeCom + 20); //youtube.com/watch?v= is 20 characters, and the ID is another 11.
            message = {
                data: messageData,
                from: messageFrom,
                time: timeNow,
                attachments: [
                    {
                        type: 'video',
                        id: youtubeId
                    }
                ],
            }
        }
        else if (this.youtubeBe >= 1) {
            youtubeId = messageData.substring(this.youtubeBe + 20, this.youtubeBe + 9); //youtu.be/ is 9 characters, and the ID is another 11.
            message = {
                data: messageData,
                from: messageFrom,
                time: timeNow,
                attachments: [
                    {
                        type: 'video',
                        id: youtubeId
                    }
                ],
            }
        }
        else {
            message = {
                data: messageData,
                from: messageFrom,
                date: '',
                time: timeNow
            }
        }
        let msgId = this.chats[chatId - 1].messages.length;
        this.open(this.chats[chatId - 1].tmpId);
        this.chats[chatId - 1].messages.push(message);
        var _this = this;
        setTimeout(function () {
            _this.updateTimeStamp(chatId - 1, msgId);
        }, 30);
    }
}