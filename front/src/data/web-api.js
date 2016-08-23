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
let activeChats = [
  {
    id: 1,
    type: 'message', //message or channel
    from: 2, //What channel or user it is from
    messages: [ //array of messages (store only upto 100 messages locally, rest should be archived.)
      {
        from: 2, //user who sent this message
        data: 'Hey bro, I really need your help on some stuff..', //message contents
        date: '', time: '1471129731354' //the timestamp utilizes JS Date.getTime() method which returns the number of milliseconds since 1970
      },
      {
        from: 1,
        data: 'What do you need?',
        date: '', time: '1471125331354'
      },
      {
        from: 2,
        data: 'Im stuck on this issue, and cannot debug it.. Can you help?',
        date: '', time: '1471129323354',
        attachments: [
          {
            type: 'image',
            id: 'error.png'
          }
        ],
      },
      {
        from: 1,
        data: 'That means that you are breaking the syntax rules, you need to check the documentation and follow their parameters.',
        date: '', time: '1471129723354'
      }
    ]
  },
  {
    id: 2,
    type: 'message',
    from: 3,
    messages: [
      {
        from: 1,
        data: 'Haha dude, have you seen the project we had to review?', //message contents
        date: '', time: '1471121731354', //the date & time this was sent on
        unread: false
      },
      {
        from: 3,
        data: 'What about it??',
        date: '', time: '1471122731354',
        unread: false
      },
      {
        from: 1,
        data: 'It\'s horrible! Ours is like 5 times better and is a real usecase!',
        date: '', time: '1471123731354',
        unread: false
      },
      {
        from: 3,
        data: 'Good! I hope our marks reflect that...',
        date: '', time: '1471129321354',
        unread: false
      },
      {
        from: 3,
        data: 'oi man i need help...',
        date: '', time: '1471129421354',
        unread: true
      },
      {
        from: 3,
        data: 'r u there???',
        date: '', time: '1471129521354',
        unread: true
      },
      {
        from: 3,
        data: 'seriously!',
        date: '', time: '1471129611354',
        unread: true
      },
      {
        from: 3,
        data: 'hellloooo',
        date: '', time: '1471129811354',
        unread: true
      }
    ]
  },
  {
    id: 3,
    type: 'message',
    from: 4,
    messages: [
      {
        from: 4,
        data: 'The weather is crazy! Can you pick me up!', //message contents
        date: '', time: '1471129731354' //the date & time this was sent on
      },
      {
        from: 1,
        data: 'My cars in the repair shop man, Im sorry. Maybe angela can pick you up.',
        date: '', time: '1471129731354'
      },
      {
        from: 4,
        data: 'She\'s stuck up! I doubt it',
        date: '', time: '1471129731354'
      },
      {
        from: 1,
        data: 'I can tell her for you if you want??.',
        date: '', time: '1471129731354'
      },
      {
        from: 4,
        data: 'Please do asap im waiting in the rain... this is horrible',
        date: '', time: '1471129731354'
      },
      {
        from: 1,
        data: 'ok one sec brb',
        date: '', time: '1471129731354'
      },
      {
        from: 4,
        data: 'what did sshe say???',
        date: '', time: '1471129731354'
      },
      {
        from: 1,
        data: 'shes on her way now, see not so bad.',
        date: '', time: '1471129731354'
      }
    ]
  },
  {
    id: 4,
    type: 'message',
    from: 5,
    messages: [
      {
        from: 5,
        data: 'lololol so bored wanna play league of legends??', //message contents
        date: '', time: '1471129731354' //the date & time this was sent on
      },
      {
        from: 1,
        data: 'yee lets go ranked!',
        date: '', time: '1471129731354'
      },
      {
        from: 5,
        data: 'pls carry me ye?',
        date: '', time: '1471129731354'
      },
      {
        from: 1,
        data: 'im the man for that job :D',
        date: '', time: '1471129731354'
      },
      {
        from: 1,
        data: 'yee lets go ranked!',
        date: '', time: '1471129731354'
      },
      {
        from: 5,
        data: 'pls carry me ye?',
        date: '', time: '1471129731354'
      },
      {
        from: 1,
        data: 'im the man for that job :D',
        date: '', time: '1471129731354'
      },
      {
        from: 1,
        data: 'yee lets go ranked!',
        date: '', time: '1471129731354'
      },
      {
        from: 5,
        data: 'Im bored, lets do something?',
        date: '', time: '1471129731354'
      },
      {
        from: 1,
        data: '',
        date: '', time: '1471129731354'
      },
      {
        from: 1,
        data: 'yee lets go ranked!',
        date: '', time: '1471129731354'
      },
      {
        from: 5,
        data: 'Im bored, lets do something?',
        date: '', time: '1471129731354'
      },
      {
        from: 1,
        data: 'ummmm....',
        date: '', time: '1471129731354'
      },
      {
        from: 1,
        data: 'How about a game of league??',
        date: '', time: '1471129731354'
      },
      {
        from: 5,
        data: 'Why the hell not?',
        date: '', time: '1471129731354'
      },
      {
        from: 1,
        data: 'Sounds like a plan, ranked or normals?',
        date: '', time: '1471129731354'
      },
      {
        from: 1,
        data: 'I wanna rank tbh',
        date: '', time: '1471129731354'
      },
      {
        from: 5,
        data: 'pls carry me ye?',
        date: '', time: '1471129731354'
      },
      {
        from: 1,
        data: 'im the man for that job :D',
        date: '', time: '1471129731354'
      },
      {
        from: 1,
        data: 'yee lets go ranked!',
        date: '', time: '1471129731354'
      },
      {
        from: 5,
        data: 'now that\'s what im talking about!',
        date: '', time: '1471129731354'
      },
      {
        from: 1,
        data: 'cool stuff',
        date: '', time: '1471129731354'
      }
    ]
  },
  {
    id: 5,
    type: 'message',
    from: 6,
    messages: [
      {
        from: 1,
        data: 'Oi do you have task4 ready so we can submit the assignment?',
        date: '', time: '1471129731354'
      },
      {
        from: 6,
        data: 'No you do it, I dont like working on this assignment',
        date: '', time: '1471129731354'
      },
      {
        from: 1,
        data: 'That\s unsportsmanlike man!',
        date: '', time: '1471129731354'
      },
      {
        from: 6,
        data: 'IDC ! I got better things to worry about!',
        date: '', time: '1471129731354'
      }
    ]
  },
  {
    id: 6,
    type: 'channel',
    from: 1,
    messages: [
      {
        from: 5,
        data: 'Can someone give me the docs of the framework Aurelia we are using?!',
        date: '', time: '1471129731354'
      },
      {
        from: 1,
        data: 'Here you go!',
        date: '', time: '1471129731354',
        attachments: [
          {
            type: 'web',
            id: 'http://aurelia.io/hub.html#/doc/persona/developer'
          }
        ]
      },
      {
        from: 4,
        data: 'I\'s im learning it quickly! :)',
        date: '', time: '1471129731354'
      },
      {
        from: 2,
        data: 'Yeah, and its simple and effective.',
        date: '', time: '1471129731354'
      },
      {
        from: 3,
        data: 'Dont forget the backend',
        date: '', time: '1471129731354'
      }
    ]
  },
  {
    id: 7,
    type: 'channel',
    from: 2,
    messages: [
      {
        from: 5,
        data: 'Can someone link me with a good Ember tutorial?',
        date: '', time: '1471129731354'
      },
      {
        from: 1,
        data: '',
        date: '', time: '1471129731354',
        attachments: [
          {
            type: 'video',
            id: 'T1SC44NJA_A'
          }
        ]
      },
      {
        from: 4,
        data: 'Very informative.',
        date: '', time: '1471129731354'
      },
      {
        from: 3,
        data: 'Who can link me with a borat movie!',
        date: '', time: '1471129731354'
      }
    ]
  },
  {
    id: 8,
    type: 'channel',
    from: 3,
    messages: [
      {
        from: 5,
        data: 'What does the current logo look like?',
        date: '', time: '1471129731354'
      },
      {
        from: 1,
        data: 'This is the temporary logo, just waiting on Morgan to get the logo done.',
        date: '', time: '1471129731354',
        attachments: [
          {
            type: 'image',
            id: 'logo-attachment.png'
          }
        ]
      },
      {
        from: 3,
        data: 'I think we should just keep this tbh.',
        date: '', time: '1471129731354'
      },
      {
        from: 2,
        data: 'Looks good enough, but any imrpovement is acceptable!',
        date: '', time: '1471129731354'
      }
    ]
  }
]

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
    this.loadAccount();
  }
  loadAccount() {
    var _this = this;
    firebase.auth().onAuthStateChanged(function (user) { //MAKE SURE ACCOUNT IS LOGGED IN
      if (user) {
        _this.user = user;
        _this.isRequesting = true;
        var contactsExtract;
        console.log('User authenticated in WEBAPI : ' + user.uid);
        _this.accountDB = _this.rootDB.child("users/" + user.uid);
        _this.accountDB.once('value', function (accountDB) {
          console.log('Publishing myAccount: ', accountDB.val());
          var value = accountDB.val();
          _this.ea.publish('myAccount', accountDB.val());
          _this.myAccount = accountDB.val();
          _this.isRequesting = false;
          _this.isLoaded = true;
        });
        _this.contactsDB = _this.rootDB.child("users/" + user.uid + "/contacts");
        _this.contactsDB.on('child_added', function (contact) {
          let contactExtract = contact.val();
          console.log('finding contact: ', contact);
          if (contactExtract != "uid") {
            let contactDB = _this.rootDB.child("users/" + contactExtract);
            contactDB.once('value', function (accountDB) {
              var value = accountDB.val();
              console.log('Publishing contact: ', accountDB.val().details);
              _this.ea.publish('contactLoaded', accountDB.val().details);
            });
          }
        });
        _this.contactsDB.on('child_removed', function (contact) {
          let contactExtract = contact.val();
          console.log('finding contact: ', contact);
          if (contactExtract != "uid") {
            let contactDB = _this.rootDB.child("users/" + contactExtract);
            contactDB.once('value', function (accountDB) {
              var value = accountDB.val();
              console.log('Publishing contact: ', accountDB.val().details);
              _this.ea.publish('contactRemoved', accountDB.val().details);
            });
          }
        });
        _this.chatsActiveDB = _this.rootDB.child("users/" + user.uid + "/chatsActive");
        _this.chatsActiveDB.on('child_added', function (chatActive) {
          let chatActiveExtract = chatActive.val();
          console.log('finding chat: ', chatActiveExtract);
          let chatFound = _this.rootDB.child("chats/" + user.uid + "/" + chatActiveExtract.chatId);
          chatFound.once('value', function (chatDB) {
            if (chatDB.val()) {
              _this.ea.publish('ChatOpened', chatDB.val());
            }
          });
        });
        _this.allChatsDB = _this.rootDB.child("chats/" + user.uid);
        _this.allChatsDB.on('child_added', function (chatDB) {
            console.log('chatLoaded CALLED: ', chatDB.val());
            _this.ea.publish('chatLoaded', chatDB.val());
        });
      }
      else {
        _this.isLoaded = true;
        _this.isRequesting = false;
      }
    });
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

  deployAccount(user) {
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
    });
    console.log('added user');
  }
  addContact(contactEmail) {
    var _this = this;
    this.isRequesting = true;
    console.log('Looking for: ', contactEmail);
    firebase.database().ref('users').orderByChild('details/email')
    .startAt(contactEmail)
    .endAt(contactEmail)
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
    .startAt(contactEmail)
    .endAt(contactEmail)
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
    .startAt(contactEmail)
    .endAt(contactEmail)
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
