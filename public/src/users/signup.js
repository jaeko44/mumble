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
        this.password = null;
        this.firstName = null;
        this.lastName = null;
        var _this = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                _this.showSpin = false;
                location.assign('#/home');
            }
            else {
               
            }
        });
        _this.showSpin = false;
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
                    email: _this.email,
                    user: user
                }
                if (_this.firstName && _this.lastName && _this.password) {
                    console.log('Signup.js -> : ', newUser + 'User: ', user);
                    _this.ea.publish('registerAccount', newUser);
                }
                else {
                    _this.response = 'Please enter all the fields';
                    return;
                }
                _this.firstName = null;
                _this.lastName = null;
                _this.password = null;
            }
        });
    }
}