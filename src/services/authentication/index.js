'use strict';

const authentication = require('feathers-authentication');

const GithubStrategy = require('passport-github').Strategy;
const GithubTokenStrategy = require('passport-github-token');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;
const LinkedinTokenStrategy = require('passport-linkedin-token-oauth2').Strategy;

module.exports = function() {
  const app = this;

  let config = app.get('auth');
  
  config.github.strategy = GithubStrategy;
  config.github.tokenStrategy = GithubTokenStrategy;
  config.google.strategy = GoogleStrategy;
  config.google.tokenStrategy = GoogleTokenStrategy;
  config.linkedin.strategy = LinkedinStrategy;
  config.linkedin.tokenStrategy = LinkedinTokenStrategy;

  app.set('auth', config);
  app.configure(authentication(config));
};
