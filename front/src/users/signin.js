import {inject} from 'aurelia-framework';
import {Profile} from '../app/profile';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from '../data/web-api';
import $ from 'jquery';

@inject(Profile, Router, EventAggregator, WebAPI)
export class login {

    constructor(profile, router, ea, api) {
        this.api = api;
        this.ea = ea;
        this.router = router;
        this.profile = profile;
        this.showSpin = false;
        this.account = profile.getProfile();
        this.email = '';
        this.response = 'none';
        this.password = '';
        var _this = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                _this.showSpin = false;
                console.log('User uid, token : ', user.uid, user.getToken());
                location.assign('#/home');
            }
            else {
                _this.showSpin = false;
            }
        });
    }

    login() {
        var _this = this;
        this.showSpin = true;
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(function() {
            _this.response = "Succesfully Authenticated";
            var accountEmail = this.email;
            _this.ea.publish('loggedSuccesfully', accountEmail);
        }).catch(function(error) {
            var errorCode = error.code;
            _this.response = error.message;
            _this.showSpin = false;
        });
    }
}