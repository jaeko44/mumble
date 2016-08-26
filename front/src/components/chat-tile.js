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
        this.chats = [];
        this.userChats = [];
        this.messages;
        this.contacts = [];
        this.activeChatsUsers = [];
        this.tempMessage = [];
        this.timeStamps = [[], [], [], [], [], []];
        this.dateStamps = [[], [], [], [], [], []];
        this.extractedChats = [{
            chatsOpen: 0
        }];
        this.allChats = [];
        this.chatsActive = [];
        this.chatsOpen = this.chatsActive.length;
        ea.subscribe('ChatOpened', chat => this.openChat(chat));
        ea.subscribe('saveLayout', layout => this.updateLayout(layout));
        ea.subscribe('myAccount', account => this.accountLoaded(account));
        ea.subscribe('contactsLoaded', contacts => this.contacts = contacts); 
        ea.subscribe('contactLoaded', contact => this.addContact(contact)); 
        ea.subscribe('appendMessage', messageContents => this.appendMessageNew(messageContents)); 
        ea.subscribe('chatLoaded', chat => this.chatLoaded(chat));
        console.log('sending this chatsActive', this.chatsActive);
    }
    appendMessageNew(messageContents) {
        var chatId = messageContents.chatId;
        var message = messageContents.message;
        this.extractedChats.forEach(function(chat) {
            if (chat.from == chatId) {
                chat.push(message);
            }
        }, this);
        this.allChats.forEach(function(chat) {
            if (chat.from == chatId) {
                chat.push(message);
            }
        }, this);
    }
    addContact(contact) {
        if (contact) {
            console.log('Contact list - adding contact', contact);
            this.contacts.push(contact);
        }
    }
    openChat(chat) {
        this.displayChat(chat.from);
    }
    accountLoaded(account) {
        console.log('ACcount loaded in chat-tile', account);
        this.myAccount = account;
        this.layout = account.settings.layout;
        this.settings = account.settings;
    }
    updateNavbar() {
        this.chatsOpen = 0;
        for (var id = 0; id < this.chatsActive.length; id++) {
            var chatActive = this.chatsActive[id];
            var chatProfile = this.profile.findChatId(chatActive.chatId);
            if (chatActive.isOpen == true) {
                this.chatsOpen++;
                this.ea.publish('ChatOpenedSuccesfully', chatActive.chatId);
            }
            else {
                this.ea.publish('ChatClosedSuccesfully', chatActive.chatId);
            }
        }
    }
    inViewMessagesLoop() {
        var _this = this;
        console.log('Started update unread messages');
        setInterval(() => {
            this.extractedChats.forEach(function (chat) {
                if (chat.messages == null) {

                }
                else {
                    for (var index = 0; index < chat.messages.length; index++) {
                        var chatId = index;
                        if (chat.messages[index].unread == true) {
                            console.log('Object keys success', this.chats[chat]);
                            var _this = this;
                            let messageElementId = "chat-" + chatId + "-message-" + index;
                            let msgEl = document.getElementById(messageElementId);
                            var msgInView = this.isMsginView(msgEl);
                            if (msgInView === true) {
                                if (_this.chatsActive[chatId].unreadMsgs > 0) {
                                    _this.chatsActive[chatId].unreadMsgs--;
                                }
                                _this.chatsActive[chatId].cooldown = true;
                                _this.chats[chatId].messages[index].unread = 'cooling';
                                setTimeout(function () { 
                                    return function() { //return function() allows us to run this timeout for multiple messages. SINCE we are looping.
                                        _this.chats[chatId].messages[index].unread = false;
                                        _this.chatsActive[chatId].cooldown = false;
                                    }
                                }, 5000);
                            }
                        }
                    }
                }
            });
        }, 1000);
    }
    timeStampsLoop() { //Create a 60 second loop to update all timestamps.
        var _this = this;
        console.log('Started update timestamps');
        setInterval(() => {
            for (var index = 0; index < this.extractedChats.length; index++) {
                var chatId = index;
                var chat = this.extractedChats[index];
                if (chat.messages == null) {

                }
                else {
                    for (var index = 0; index < chat.messages.length; index++) {
                        this.updateTimeStamp(chat.tmpId - 1, index);
                    }
                }
            }
        }, 60000);
    }
    updateTimeStamps() { //One time update (when the page loads)
        for (var index = 0; index < this.extractedChats.length; index++) {
            var chatId = index;
            var chat = this.extractedChats[index];
            if (chat.messages == null) {

            }
            else {
                for (var index = 0; index < chat.messages.length; index++) {
                    this.updateTimeStamp(chatId, index);
                }
            }
        }
    }
    updateTimeStamp(tmpId, messageId) {
        var chat = this.extractedChats[tmpId];
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
            this.timeStamps[tmpId][messageId] = 'now';
        }
        else if (minutesDifference >= 1 && minutesDifference <= hours) {
            this.timeStamps[tmpId][messageId] = minutesDifference + ' minutes ago';
        }
        else if (minutesDifference >= hours && minutesDifference / hours < 24) {
            let hoursAgo = Math.floor(minutesDifference / hours);
            let remainder = minutesDifference % hours;
            this.timeStamps[tmpId][messageId] = hoursAgo + ' hours ago';
        }
        else if (minutesDifference / hours > 24) {
            let daysAgo = Math.floor(minutesDifference / days);
            let remainder = minutesDifference % days;
            this.timeStamps[tmpId][messageId] = daysAgo + ' days ago';
        }
        var timeSent = this.timeStamps[tmpId][messageId];
        if (timeSent == 'undefined') {
            console.log('Undefined timestamp: ', message);
        }
        this.dateStamps[tmpId][messageId] = date;
        let timeStampId = "chat-" + tmpId + "-timestamp-" + messageId;
        let timeStampEl = document.getElementById(timeStampId);
        timeStampEl.innerHTML = timeSent;
        timeStampEl.setAttribute('title', date);
        $(timeStampEl).tooltip('show').tooltip('hide');
        console.log(this.chats);
        console.log(this.timeStamps);
    }
    extractData(chatsActive) {
        console.log('Request extracted data now');
        this.api.extractData(chatsActive).then(chats => this.chatsLoaded(chats));
    }
    chatsLoaded(chats) {
        this.chatsExtracted = chats;
        console.log('This extractedChats now: ', this.extractedChats);
        chats.forEach(function (chat) { console.log('chat: ', chat); });
        this.updateTimeStamps();
        this.timeStampsLoop(); //Updates timestamps every so often (60 seconds)
        this.inViewMessagesLoop(); //Checks if messages are in view every so often (2 seconds).
        this.updateNavbar();
    }
    chatLoaded(chat) {
        console.log('ADding chat to allChats: ', chat);
        this.allChats.push(chat);
    }
    chatRemoved(chat) {
        if (this.chatsExtracted) {
            for (var index = 0; index < this.extractedChats.length; index++) {
                var chat = this.extractedChats[index];
                if (chat) {
                    
                }
            }
        }
    }
    userDetailsLookup(userId) {
        return this.api.getContactDetails(userId);
    }
    userDetails(userId) {
        if (this.contacts) {
            for (var index = 0; index < this.contacts.length; index++) {
                var contact = this.contacts[index];
                if (contact.uid == userId) {
                    return contact;
                }
            }
        }
    }
    channelDetails(channelId) {
        return this.api.getChannelDetails(channelId);
    }
    messageDetails(messageId) {
        return this.api.getMessageDetails(messageId);
    }
    messageDetailschatId(chatId) {
        return new Promise(resolve => {
            this.api.getChatIdDetails(chatId).then(function(res) {
                resolve(res);
            });
        });
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
    scroll(id) {
        let contentId = "chat-content-" + id; //The chatbox ID.
        let contentEl = document.getElementById(contentId);
        this.chatsActive[id - 1].unreadMsgs = 0;
        $('#' + contentId).animate({ scrollTop: contentEl.scrollHeight }, 300); //We scroll to the bottom whenever we send a message.
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
    displayChat(chatId) {
        var _this = this;
        var purgedChat = this.chatsActive;
        let found = purgedChat.filter(x => x.chatId === chatId)[0];
        if (typeof found !== "undefined") {
            console.log('This chats already open');
            return found;
        }
        while (this.layout.maximumChats <= purgedChat.length - 1) {
            var last = this.chatsActive[this.chatsActive.length - 1];
            var chatClosing = purgedChat.pop();
            this.ea.publish('ChatClosedSuccesfully', last.chatId);
        }
        var chatHeight = "100%";
        var chatActive = {
            id: 1,
            chatId: chatId,
            unreadMsgs: 0,
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
        this.openChats(purgedChat);
        this.chatsActive = purgedChat;
        this.ea.publish('ChatOpenedSuccesfully', chatId);
        setTimeout(function () {
            let contentId = "chat-content-" + 0; //The chatbox ID.
            let contentEl = document.getElementById(contentId);
            $('#' + contentId).animate({ scrollTop: contentEl.scrollHeight }, 300); //We scroll to the bottom whenever we send a message.
            _this.updateTimeStamps();
            //contentEl.scrollTop = contentEl.scrollHeight;
        }, 30);
        setTimeout(function () {
            return function() {
                if (unreadMsgs >= 1) {
                    purgedChat[0].cooldown = true;
                }
                if (purgedChat[1].unreadMsgs > 0) {
                    purgedChat[1].unreadMsgs = 0;
                    purgedChat[1].cooldown = false;
                }
                _this.chatsActive = purgedChat;
                _this.ea.publish('chatsActiveUpdated', this.chatsActive);
            }
        }, 1000);
        setTimeout(function () {
            return function() {
                if (unreadMsgs >= 1) {
                    var messages = _this.chats[0].messages;
                    for (var index = messages.length - unreadMsgs; index < messages.length; index++) {
                        _this.chats[0].messages[index].unread = false; //we set all the unread messages to false.
                    }
                    purgedChat[0].unreadMsgs = 0;
                    purgedChat[0].cooldown = false;
                }
                _this.chatsActive = purgedChat;
                _this.ea.publish('chatsActiveUpdated', this.chatsActive);
            }
        }, 5000);
    }
    openChats(chatsActive) {
        var _this = this;
        this.extractedChats = [];
        this.userChat = [];
        console.log('This chatsActive', chatsActive);
        console.log('This all chats: ', this.allChats);
        this.chatsActive.forEach(function(chatActive) {
            for (var index = 0; index < this.allChats.length; index++) {
                var chat = this.allChats[index];
                if (chat.from == chatActive.chatId) {
                    var userChat = {
                        outgoing: chat.outgoing,
                        incoming: chat.incoming
                    }

                    _this.userChat.push(userChat);
                    this.extractedChats.push(chat);
                    console.log('This extractedChats now after openchats: ', this.extractedChats);
                }
            }
        }, this);
    }
    isMsginView(el) {
        //special bonus for those using jQuery
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }

        var rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );
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
    printParent(print) {
        console.log(print);
        return 'Printed';
    }
    appendMessage(messageData, messageFrom, chatId) {
        if (messageData === '') {
            return;
        }
        var chatTempId = chatId;
        var message = {};
        var direction = '';
        var d = new Date();
        if (messageFrom == 1) {
            direction = 'outgoing'
        }
        var timeNow = d.getTime();
        let youtubeCom = messageData.indexOf('youtube.com/watch?v=');
        let youtubeBe = messageData.indexOf('youtu.be/');
        let youtubeId = '';
        if (youtubeCom >= 1) {
            youtubeId = messageData.substring(youtubeCom + 31, youtubeCom + 20); //youtube.com/watch?v= is 20 characters, and the ID is another 11.
            message = {
                data: messageData,
                direction: direction,
                time: timeNow,
                unread: false,
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
                direction: direction,
                time: timeNow,
                unread: false,
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
                direction: direction,
                date: '',
                time: timeNow,
                unread: false
            }
        }
        let msgId = this.extractedChats[chatId].messages.length;
        this.open(chatId + 1);
        this.api.pushMessage(this.extractedChats[chatId].from, message, this.extractedChats[chatId].messages.length);
        this.extractedChats[chatId].messages.push(message);
        var _this = this;
        setTimeout(function () {
            _this.updateTimeStamp(chatId, msgId);
            let messageElementId = "chat-" + chatId + "-message-" + msgId;
            let msgEl = document.getElementById(messageElementId);
            var msgInView = _this.isMsginView(msgEl);
            if (msgInView === true) {
                _this.scroll(chatId);
            }
            if (msgInView === false && messageFrom > 1) {
                _this.chatsActive[chatId].unreadMsgs++;
                console.log("Message not in view - ", _this.chatsActive[chatId + 1].unreadMsgs)
                _this.extractedChats[chatId].messages[msgId].unread = true;
                toastr.options.preventDuplicates = true;
                toastr.info('Received message from  ' + _this.extractedChats.user.firstName);
            }
        }, 30);
    }
}