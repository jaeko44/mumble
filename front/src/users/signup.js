import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from '../data/web-api';
import $ from 'jquery';

@inject(Router, EventAggregator, WebAPI)
export class register {

    constructor(router, ea, api) {
        this.api = api;
        this.ea = ea;
        this.router = router;
        this.showSpin = false;
        this.email = '';
        this.response = 'none';
        this.password = '';
        this.firstName = '';
        this.lastName = '';
    }
    register() {
        this.showSpin = true;
        var _this = this;
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(function() {
            _this.response = "Succesfully Created Account";
        }).catch(function(error) {
            var errorCode = error.code;
            _this.response = error.message;
            _this.showSpin = false;
        });
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                _this.showSpin = false;
                var newUser = {
                    uid: user.uid,
                    firstName: _this.firstName,
                    lastName: _this.lastName,
                    email: _this.email
                }
                _this.ea.publish('registerAccount', newUser);
                location.assign('#/home');
            }
        });
    }
}