import {WebAPI} from '../data/web-api';

export class Profile {
    static inject() { return [WebAPI] };

    constructor(api) {
        this.api = api;
        this.contacts = [];
        this.user = '';
    }

    getUser(userId) {
        this.api.getContactDetails(userId).then(user => this.user = user);
        return this.user;
    }
    getSettings() {
        return this.api.getSettings();
    }
    getProfile() {
        return this.api.getProfile();
    }
    setNavigationTo(navId) {
        this.api.saveNavigationState(navId);
    }
}