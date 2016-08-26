import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';

let latency = 200; //To mimic a real connection
let id = 0;

function getId() {
  return ++id;
}
let myAccount = {};

let Accounts = [
  {
    id: 1,
    firstName: 'Jonathan',
    lastName: 'Philipos',
    email: 'jonathan@det.io',
    password: 'unencrypted',
    phone: '867-5309',
    status: 'offline',
    icon: 'face5.ico',
    title: 'Front-End Engineer',
    about: 'Been overworking on this stuipid thing lately'
  },
  {
    id: 2,
    firstName: 'John',
    lastName: 'Tolkien',
    email: 'tolkien@mumble.com',
    password: 'unencrypted',
    phone: '867-5309',
    status: 'offline',
    icon: 'face2.ico',
    title: 'Back-End Engineer',
    about: 'Been really busy lately!'
  },
  {
    id: 3,
    firstName: 'Borat',
    lastName: '',
    email: 'borat@mumble.com',
    password: 'unencrypted',
    phone: '0420-420-420',
    status: 'offline',
    icon: 'face.ico',
    title: 'Front-End Developer',
    about: 'Progress, progress, we gotta finish this thing!'
  },
]
let contacts = [ //CONTACTS IS A SPECIFIC ARRAY FOR THE CURRENTLY LOGGED IN USER. THIS IS UNIQUE TO THAT USER AND LOADS THE CHATS ACCORDINGLY.
  {
    id: 2, //WE SAVE ID: 1 for myAccount.. 
    chatId: 1, //This is what CHAT ID is linked to this CONTACT, each CONTACT has one UNIQUE chatId.
    //We can design this two ways. 1. Have CHATID as a unique number in the whole DB and then when the contacts are loaded loop an array and load the chats of the customer.
    //2. OR have it done by the back-end so that the back-end returns both contacts/chats together and has wired each chatId together. 
    //2 - THIS WILL WORK WITH NO CODE CHANGES
    isOpen: false, //This means the chat isOpen or Closed. If it is Open then it is loaded into the UI. However, it is also LIMITED to the layout of the user. 
    //Meaning if the user has a settings layout of 3, and there are 4 open chats. Then the last chat is closed automatically.
    title: 'Back-End Engineer', //We allow each user to setup a title for their profile in settings.
    about: 'Been really busy lately!', //& An about
    firstName: 'John',
    lastName: 'Tolkien',
    email: 'tolkien@mumble.com',
    phone: '04-dont-call-me',
    status: 'online',
    unreadMsgs: 0, //These are the unread messages from this user. The back-end will increment unreadMsgs when new messages have been directed to MYACCOUNT. 
    icon: 'face2.ico'
  },
  {
    id: 3,
    chatId: 2,
    isOpen: false,
    title: 'Front-End Developer',
    about: 'Progress, progress, we gotta finish this thing!',
    firstName: 'Borat',
    lastName: '',
    email: 'borat@mumble.com',
    phone: '0420-420-420',
    status: 'online',
    unreadMsgs: 4,
    icon: 'face.ico'
  },
  {
    id: 4,
    chatId: 3,
    isOpen: false,
    firstName: 'Owen',
    title: 'Graphics Designer',
    about: 'Why do you guys pay me anyways?',
    lastName: 'Barfield',
    email: 'barfield@mumble.com',
    phone: '0410-410-410',
    status: 'offline',
    unreadMsgs: 0,
    icon: 'face3.ico'
  },
  {
    id: 5,
    chatId: 4,
    isOpen: false,
    title: 'Sales Mgr.',
    about: 'Every bug makes my job harder!',
    firstName: 'Charles',
    lastName: 'Williams',
    email: 'williams@mumble.com',
    phone: '0400-400-400',
    status: 'away',
    unreadMsgs: 0,
    icon: 'face4.ico'
  },
  {
    id: 6,
    chatId: 5,
    isOpen: false,
    title: 'C.E.O',
    about: 'I want mulla..',
    firstName: 'Roger',
    lastName: 'Green',
    email: 'green@mumble.com',
    phone: '1800-MULLA',
    status: 'offline',
    unreadMsgs: 1,
    icon: 'face5.ico'
  }
];
let channels = [
  {
    id: 1,
    chatId: 6,
    unreadMsgs: 15,
    channelName: 'General',
    users: [1, 2, 3, 4, 5],
    isOpen: false
  },
  {
    id: 2,
    chatId: 7,
    unreadMsgs: 0,
    channelName: 'Development',
    users: [1, 3, 4],
    isOpen: false,
  },
  {
    id: 3,
    chatId: 8,
    unreadMsgs: 0,
    channelName: 'Design',
    users: [1, 2, 5],
    isOpen: false,
  }
];

id = 0;

let mySettings = {
  id: 1,
  layout: {
    id: 3,
    name: 'Full Height, 3 Chats per row, 1 row',
    rows: 1,
    maximumChats: 3,
    chatsPerRow: 3
  },
  navigation: 1,
  appName: 'mumble-static',
  theme: 'Blue',
  mnumber: 0
}

@inject(EventAggregator)
export class WebAPI {
  constructor(ea) {
    this.isRequesting = true;
    this.isLoaded = false;
    this.myAccount;
    this.ea = ea;
    ea.subscribe('saveTheme', theme => this.updateTheme(theme));
    ea.subscribe('saveLayout', layout => this.updateLayout(layout));
    ea.subscribe('extractData', chatsActive => this.extractData(chatsActive));
    ea.subscribe('registerAccount', user => this.deployAccount(user));
    var config = {
      apiKey: "AIzaSyDuvCKBC1I9c5laWNFH0P4ML6bSgEgw3OQ",
      authDomain: "mumble-cce1c.firebaseapp.com",
      databaseURL: "https://mumble-cce1c.firebaseio.com",
      storageBucket: "",
    };
    firebase.initializeApp(config);
    //REFERENCES TO DB
    this.database = firebase.database();
    this.rootDB = firebase.database().ref();
    this.settingsDB = this.rootDB.child("settings");
    var _this = this;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        if (!_this.isCreatingAccount) {
          console.log('Detected account LOGGED in: ', user);
          _this.loadAccount(user);
        }
      }
      else {
        _this.isLoaded = true;
        _this.isRequesting = false;
      }
    });
  }
  loadAccount(user) {
    var _this = this;
    this.isLoaded = false;
    this.isRequesting = true;
    var contactsExtract;
    console.log('User authenticated in WEBAPI : ' + user.uid);
    this.accountDB = this.rootDB.child("users/" + user.uid);
    this.accountDB.once('value', function (accountDB) {
      console.log('Publishing myAccount: ', accountDB.val());
      var value = accountDB.val();
      _this.ea.publish('myAccount', accountDB.val());
      _this.myAccount = accountDB.val();
      _this.isRequesting = false;
      _this.isLoaded = true;
    });
    this.isRequesting = true;
    this.contactsDB = this.rootDB.child("users/" + user.uid + "/contacts");
    this.contactsDB.on('child_added', function (contact) {
      let contactExtract = contact.val();
      console.log('finding contact: ', contact);
      if (contactExtract != "uid") {
        let contactDB = _this.rootDB.child("users/" + contactExtract[0]);
        contactDB.once('value', function (accountDB) {
          var value = accountDB.val();
          console.log('Publishing contact: ', accountDB.val().details);
          _this.ea.publish('contactLoaded', accountDB.val().details);
          _this.isRequesting = false;
        });
      }
    });
    this.isRequesting = true;
    this.contactsDB.on('child_removed', function (contact) {
      let contactExtract = contact.val();
      console.log('finding contact: ', contact);
      if (contactExtract != "uid") {
        let contactDB = _this.rootDB.child("users/" + contactExtract[0]);
        contactDB.once('value', function (accountDB) {
          var value = accountDB.val();
          console.log('Publishing contact: ', accountDB.val().details);
          _this.ea.publish('contactRemoved', accountDB.val().details);
          _this.isRequesting = false;
        });
      }
    });
    this.isRequesting = true;
    this.chatsActiveDB = this.rootDB.child("users/" + user.uid + "/chatsActive");
    this.chatsActiveDB.on('child_added', function (chatActive) {
      let chatActiveExtract = chatActive.val();
      console.log('finding chat: ', chatActiveExtract);
      let chatFound = _this.rootDB.child("chats/" + user.uid + "/" + chatActiveExtract.chatId);
      chatFound.once('value', function (chatDB) {
        if (chatDB.val()) {
          _this.ea.publish('ChatOpened', chatDB.val());
          _this.isRequesting = false;
        }
      });
    });
    this.isRequesting = true;
    this.allChatsDB = this.rootDB.child("chats/" + user.uid);
    this.allChatsDB.on('child_added', function (chatDB) {
        console.log('chatLoaded CALLED: ', chatDB.val());
        _this.ea.publish('chatLoaded', chatDB.val());
        let chatMessages = _this.rootDB.child("chats/" + user.uid + "/" + chatDB.val().from + "/messages");
        console.log("Monitoring: chats/" + user.uid + "/" + chatDB.val().from + "/messages");
        chatMessages.on('child_added', function (messageDB) {
          if (messageDB.val()) {
            var appendMessage = {
              chatId: chatDB.val(),
              message: messageDB.val()
            }
            console.log('Appending message', appendMessage);
            _this.ea.publish('appendMessage', appendMessage);
            _this.isRequesting = false;
          }
        });
    });
  }
  deployAccount(user) {
    var _this = this;
    this.isCreatingAccount = true;
    var d = new Date();
    var timeNow = d.getTime();
    var settings = {
      id: 1,
      layout: {
        id: 3,
        name: "Full Height, 3 Chats per row, 1 row",
        rows: 1,
        maximumChats: 3,
        chatsPerRow: 3
      },
      navigation: 1,
      appName: "mumble-new",
      theme: "Blue",
      mnumber: 0
    };
    var details = {
      uid: user.uid,
      title: '',
      about: '',
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: '',
      status: 'online',
      unreadMsgs: 0,
      icon: 'faceDefault.png',
      chatId: user.uid,
      created: timeNow
    };
    var chatsActive = [
      {
        chatId: 'default',
        chatType: 'message',
        closed: 'false',
        cooldown: 'false',
        isOpen: true,
        row: 1,
        styles: {
          height: '100%'
        },
        unreadMsgs: 0
      }
    ];
    var notifications = [
      {
        notification: 'Welcome to mubmle, something you\'ll never be leaving behind frmo now on.',
        time: timeNow,
        read: false
      }
    ];
    var contacts = ['uid'];
    firebase.database().ref('users/' + user.uid).set({
      settings: settings,
      details: details,
      chatsActive: chatsActive,
      contacts: contacts,
      notifications: notifications
    }).then(function(value) {
      _this.loadAccount(user.user);
      _this.isCreatingAccount = false;
    });
  }
  changePassword(currPass, newPass) {
    this.isRequesting = true;
    var _this = this;
      if (this.user) {
        this.user.updatePassword(newPass).then(function() {
          _this.isRequesting = false;
          _this.ea.publish('successSecurity', "Successfully changed password");
        }, function(error) {
          _this.isRequesting = false;
          _this.ea.publish('errorSecurity', error);
        });
      }
      else {
        _this.isRequesting = false;
        _this.ea.publish('errorSecurity', "Please reset your session by logging in again");
      }
  }
  pushMessage(chatId, message, msgId) {
    _this.isRequesting = true;
    console.log('This chatID sending to: ', chatId);
    console.log('This message sending: ', message);
    firebase.database().ref('chats/' + this.user.uid + '/' + chatId + '/messages/' + msgId).set(message);
    message.direction = 'incoming';
    firebase.database().ref('chats/' + chatId + '/' + this.user.uid + '/messages/' + msgId).set(message);
    this.isRequesting = false;
  }
  extractData(chatsActive) {
    var _this = this;
    _this.isRequesting = true;
    _this.isLoaded = false;
    return new Promise(resolve => {
      var publishedChats = false;
      this.chats = [
        {
          chatsOpen: 0
        }
      ];
      for (var index = 0; index < chatsActive.length; index++) {
        var chat = chatsActive[index];
        if (chat.chatId != 'default') {
          this.chatsDB = this.rootDB.child("chats/" + this.user.uid + "/" + chat.chatId);
          this.chatsDB.on('value', function (chatDB) {
            console.log('Found specific chat: ', chatDB.val());
            if (chatDB.val() != null) {
              _this.chats.push(chatDB.val());
              _this.chats[0].chatsOpen++;
            }
            if (index >= chatsActive.length) {
              _this.isLoaded = true;
            }
          });
        }
      }
      setInterval(() => {
        if (this.isLoaded == true && publishedChats == false) {
          console.log('Publising chatsLoaded - ', _this.chats);
          _this.ea.publish('chatsLoaded', _this.chats);
          resolve(_this.chats);
          publishedChats = true;
          _this.isRequesting = false;
          _this.isLoaded = true;
        }
      }, 150);
    });
  }


  addContact(contactEmail) {
    if (contactEmail == this.user.email) {
      this.ea.publish('ContactNotFound', 'Error: You cannot add your self');
      return;
    }
    var _this = this;
    this.isRequesting = true;
    console.log('Looking for: ', contactEmail);
    firebase.database().ref('users').orderByChild('details/email')
    .equalTo(contactEmail)
    .once('value', function(snap){
         var foundUser = snap.val();
         if (foundUser) {
            var foundUserDetails = foundUser[Object.keys(foundUser)[0]].details;
            //  _this.getContactbyEmail(contactEmail);
            var user = firebase.auth().currentUser;
            var found = false;
            for (var index = 0; index < _this.myAccount.contacts.length; index++) {
              var contact = _this.myAccount.contacts[index];
              if (Object.keys(foundUser)[0] == contact) {
                found = true;
              }
            }
            var d = new Date();
            var timeNow = d.getTime();
            var initializeChat = {
              from: Object.keys(foundUser)[0],
              outgoing: _this.myAccount.details,
              incoming: foundUserDetails,
              type: 'message',
              messages: [
                {
                  from: user.uid,
                  direction: 'outgoing',
                  time: timeNow,
                  data: _this.myAccount.details.firstName + ' has requested to add ' + contactEmail,
                  unread: false,
                }
              ]
            }
            var initializeChatIncoming = {
              from: _this.myAccount.details.uid,
              outgoing: foundUserDetails,
              incoming: _this.myAccount.details,
              type: 'message',
              messages: [
                {
                  direction: 'incoming',
                  time: timeNow,
                  data: _this.myAccount.details.firstName + ' has requested to add ' + contactEmail,
                  unread: true,
                }
              ]
            }
            var initializeActiveChats = {
                  chatId: Object.keys(foundUser)[0],
                  chatType: 'message',
                  closed: 'false',
                  cooldown: 'false',
                  isOpen: true,
                  row: 1,
                  styles: {
                    height: '100%'
                  },
                  unreadMsgs: 0
            }
            var initializeActiveChatsIncoming = {
                  chatId: user.uid,
                  chatType: 'message',
                  closed: 'false',
                  cooldown: 'false',
                  isOpen: true,
                  row: 1,
                  styles: {
                    height: '100%'
                  },
                  unreadMsgs: 0
            }
            _this.myAccount.contacts.push(Object.keys(foundUser));
            _this.myAccount.chatsActive.unshift(initializeActiveChats);
            foundUser[Object.keys(foundUser)[0]].contacts.push(user.uid);
            foundUser[Object.keys(foundUser)[0]].chatsActive.unshift(initializeActiveChatsIncoming);
            while (_this.myAccount.settings.layout.maximumChats < _this.myAccount.chatsActive.length - 1) {
                var last = _this.myAccount.chatsActive[_this.myAccount.chatsActive.length - 1];
                var chatClosing = _this.myAccount.chatsActive.pop();
                _this.ea.publish('ChatClosedSuccesfully', last.chatId);
            }
            if (found == false) {
                firebase.database().ref('users/' + user.uid + '/contacts').set(_this.myAccount.contacts);
                firebase.database().ref('users/' + user.uid + '/chatsActive').set(_this.myAccount.chatsActive);
                firebase.database().ref('chats/' + user.uid + '/' + Object.keys(foundUser)[0]).set(initializeChat);
                firebase.database().ref('chats/' + Object.keys(foundUser)[0] + '/' + user.uid).set(initializeChatIncoming);
                firebase.database().ref('users/' + Object.keys(foundUser)[0] + '/chatsActive').set(foundUser[Object.keys(foundUser)[0]].chatsActive);
                firebase.database().ref('users/' + Object.keys(foundUser)[0] + '/contacts').set(foundUser[Object.keys(foundUser)[0]].contacts);
            }
         }
         else {
           _this.ea.publish('ContactNotFound', 'Error: Email entered was not found');
         }
         _this.isRequesting = false;
    });
  }
  getChats() {
    this.getContactbyEmail('email').then(function(res) {
      // do whatever with res here = res = contact
      
    });
  }
  getContactbyEmail(contactEmail) {
    var _this = this;
    console.log('Looking for: ', contactEmail);
    firebase.database().ref('users').orderByChild('details/email')
    .equalTo(contactEmail)
    .once('value', function(snap){
         var foundUser = snap.val();
         var user = firebase.auth().currentUser;
         return foundUser;
    });
  }
  removeContact(contactEmail) {
    var _this = this;
    console.log('Looking for: ', contactEmail);
    firebase.database().ref('users').orderByChild('details/email')
    .equalTo(contactEmail)
    .once('value', function(snap){
         var foundUser = snap.val();
         var user = firebase.auth().currentUser;
         var found = 0;
         for (var index = 0; index < _this.myAccount.contacts.length; index++) {
           var contact = _this.myAccount.contacts[index];
           console.log('This contact: ', contact, Object.keys(foundUser));
           if (Object.keys(foundUser)[0] == contact) {
             found = true;
             _this.myAccount.contacts.splice(index, 1);
             console.log('New contacts', _this.myAccount.contacts);
           }
           else {
             console.log('Not this one', contact);
           }
         }
         if (found == true) {
            firebase.database().ref('users/' + user.uid + '/contacts').set(_this.myAccount.contacts);
            return 'removed succesfully';
         }
         else {
           return 'not found';
         }
    });
  }
  arraysIdentical(a, b) {
    var i = a.length;
    if (i != b.length) return false;
    while (i--) {
        if (a[i] !== b[i]) return false;
    }
    return true;
  };
  updateTheme(theme) {
    mySettings.theme = theme;
  }
  updateLayout(layout) {
    mySettings.layout = layout;
  }
  getContactList() {
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let results = contacts.map(x => {
          return {
            id: x.id,
            chatId: x.chatId,
            title: x.title,
            firstName: x.firstName,
            isOpen: x.isOpen,
            lastName: x.lastName,
            email: x.email,
            status: x.status,
            phone: x.phone,
            about: x.about,
            icon: x.icon,
            alert: 1,
            unreadMsgs: x.unreadMsgs
          };
        });
        resolve(results);
        this.isRequesting = false;
      }, latency);
    });
  }
  
  getMsgs() {
    var _this = this;
    var user = firebase.auth().currentUser;
    this.isRequesting = true;
    return new Promise(resolve => {
      firebase.database().ref('chats' + user.uid).orderByChild('isOpen')
      .equalTo(true)
      .once('value', function(snap){
          var foundChats = snap.val();
          resolve(foundChats);
      });
    });    
  }

  getChannelList() {
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let results = channels.map(x => {
          return {
            id: x.id,
            chatId: x.chatId,
            isOpen: x.isOpen,
            unreadMsgs: x.unreadMsgs,
            channelName: x.channelName,
            users: x.users
          };
        });
        resolve(results);
        this.isRequesting = false;
      }, latency);
    });
  }
  getChannels() {
    return channels;
  }
  getMessageDetails(id) {
    let found = activeChats.filter(x => x.id === id)[0];
    return found;
  }
  getContactDetails(id) {
    this.isRequesting = true;
    var _this = this;
    return new Promise(resolve => {
      console.log('finding contact: ', id);
      let contactDB = _this.rootDB.child("users/" + id);
      contactDB.once('value', function (accountDB) {
        console.log('Found contact: ', accountDB.val().details);
        resolve(accountDB.val().details);
        _this.isRequesting = false;
      });
    });
  }
  getContactbyChatId(id) {
    let found = contacts.filter(x => x.chatId === id)[0];
    return found;
  }
  findChatId(id) {
    let foundContact = contacts.filter(x => x.chatId === id)[0];
    let foundChannel = channels.filter(x => x.chatId === id)[0];
    if (typeof foundContact !== "undefined") {
      return foundContact;
    }
    else if (typeof foundChannel !== "unfedined") {
      return foundChannel;
    }
    else {
      return false;
    }
  }
  getChannelDetails(id) {
    let found = channels.filter(x => x.id === id)[0];
    return found;
  }
  getChatIdDetails(chatId) {
    this.isRequesting = true;
    var user = firebase.auth().currentUser;
    var _this = this;
    return new Promise(resolve => {
      this.chatsDB = this.rootDB.child("chats/" + this.user.uid + "/" + id);
      this.chatsDB.once('value', function (chatDB) {
        console.log('Found specific chat: ', chatDB.val());
        _this.ea.publish('chatLoaded', chatDB.val());
        resolve(chatDB.val());
        _this.isRequesting = false;
      });
    });
  }
  getProfile() {
    return myAccount;
  }
  getAccounts() {
    return Accounts;
  }
  authenticate(email, password) {
    let accountMatch = false;
    let passwordMatch = false;
    Accounts.forEach(function (account) {
      if (account.email == email) {
        accountMatch = true;
        if (account.password == password) {
          passwordMatch = true;
          this.ea.publish('loggedSuccesfully', account);
          myAccount = account;
        }
      }
    }, this);

    if (accountMatch == true) {
      if (passwordMatch == true) {
        return 1;
      }
      else {
        return 2;
      }
    }
    else {
      return 3;
    }
  }
  saveContact(contact) {
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let instance = JSON.parse(JSON.stringify(contact));
        let found = contacts.filter(x => x.id == contact.id)[0];

        if (found) {
          let index = contacts.indexOf(found);
          contacts[index] = instance;
        } else {
          instance.id = getId();
          contacts.push(instance);
        }

        this.isRequesting = false;
        resolve(instance);
      }, latency);
    });
  }

  getSettings() {
    return mySettings;
  }

  saveSettings(settings) {
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let instance = JSON.parse(JSON.stringify(settings));
        mySettings = instance;
        this.isRequesting = false;
        resolve(instance);
      }, latency);
    });
  }

  getNavigationState() {
    return mySettings.navigation;
  }
  saveNavigationState(navId) {
    mySettings.navigation = navId;
  }
}
