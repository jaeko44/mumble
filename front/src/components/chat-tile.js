import {WebAPI} from '../data/web-api';
import {Profile} from '../app/profile';
import {inject} from 'aurelia-framework';

@inject(WebAPI, Profile)
export class chatTile {

    constructor(api, profile) {
        this.profile = profile;
        this.api = api;
        this.account = profile.getProfile();
        this.activeChats = [];
    }

    created() {
        this.api.getMsgs().then(activeChats => this.activeChats = activeChats);
    }

    userDetails(userId) {
        if (userId == 1) {
            return this.api.getProfile();
        }
        else {
            return this.api.getContactDetails(userId);
        }
    }

    displayChats() {
        alert('Display chats called');
        console.log('Folllowed by activechats array: [] ');
        console.log(this.activeChats);
    }
}