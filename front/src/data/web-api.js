let latency = 200; //To mimic a real connection
let id = 0;

function getId() {
  return ++id;
}
let myAccount = {
    id: getId(),
    firstName: 'Jonathan',
    lastName: 'Philipos',
    email: 'jonathan@det.io',
    phoneNumber: '867-5309',
    isOnline: 'online',
    icon: 'face5.ico'
}
let contacts = [
  {
    id: getId(),
    chatId: 1,
    firstName: 'John',
    lastName: 'Tolkien',
    email: 'tolkien@inklings.com',
    phoneNumber: '867-5309',
    isOnline: 'online',
    unreadMsgs: 0,
    icon: 'face2.ico'
  },
  {
    id: getId(),
    chatId: 2,
    firstName: 'Borat',
    lastName: '',
    email: 'borat@inklings.com',
    phoneNumber: '867-5309',
    isOnline: 'online',
    unreadMsgs: 4,
    icon: 'face.ico'
  },
  {
    id: getId(),
    chatId: 3,
    firstName: 'Owen',
    lastName: 'Barfield',
    email: 'barfield@inklings.com',
    phoneNumber: '867-5309',
    isOnline: 'offline',
    unreadMsgs: 0,
    icon: 'face3.ico'
  },
  {
    id: getId(),
    chatId: 4,
    firstName: 'Charles',
    lastName: 'Williams',
    email: 'williams@inklings.com',
    phoneNumber: '867-5309',
    isOnline: 'away',
    unreadMsgs: 0,
    icon: 'face4.ico'
  },
  {
    id: getId(),
    chatId: 5,
    firstName: 'Roger',
    lastName: 'Green',
    email: 'green@inklings.com',
    phoneNumber: '867-5309',
    isOnline: 'offline',
    unreadMsgs: 1,
    icon: 'face5.ico'
  }
];
id = 0;
let channels = [
  {
    id: getId(),
    chatId: 6,
    channelName: 'General'
  },
  {
    id: getId(),
    chatId: 7,
    channelName: 'Development'
  },
  {
    id: getId(),
    chatId: 8,
    channelName: 'Design'
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
        date: '2012-04-23T18:25:43.511Z' //the date & time this was sent on
      },
      {
        from: 1,
        data: 'What do you need?',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 2,
        data: 'Im stuck on this issue, and cannot debug it.. Can you help?',
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
        date: '2012-04-23T18:25:43.511Z'
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
        date: '2012-04-23T18:25:43.511Z' //the date & time this was sent on
      },
      {
        from: 3,
        data: 'What about it??',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 1,
        data: 'It\'s horrible! Ours is like 5 times better and is a real usecase!',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 3,
        data: 'Good! I hope our marks reflect that...',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 3,
        data: 'oi man i need help...',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 3,
        data: 'r u there???',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 3,
        data: 'seriously!',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 3,
        data: 'hellloooo',
        date: '2012-04-23T18:25:43.511Z'
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
        date: '2012-04-23T18:25:43.511Z' //the date & time this was sent on
      },
      {
        from: 1,
        data: 'My cars in the repair shop man, Im sorry. Maybe angela can pick you up.',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 4,
        data: 'She\'s stuck up! I doubt it',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 1,
        data: 'I can tell her for you if you want??.',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 4,
        data: 'Please do asap im waiting in the rain... this is horrible',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 1,
        data: 'ok one sec brb',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 4,
        data: 'what did sshe say???',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 1,
        data: 'shes on her way now, see not so bad.',
        date: '2012-04-23T18:25:43.511Z'
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
        date: '2012-04-23T18:25:43.511Z' //the date & time this was sent on
      },
      {
        from: 1,
        data: 'yee lets go ranked!',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 5,
        data: 'pls carry me ye?',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 1,
        data: 'im the man for that job :D',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 1,
        data: 'yee lets go ranked!',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 5,
        data: 'pls carry me ye?',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 1,
        data: 'im the man for that job :D',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 1,
        data: 'yee lets go ranked!',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 5,
        data: 'Im bored, lets do something?',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 1,
        data: '',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 1,
        data: 'yee lets go ranked!',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 5,
        data: 'Im bored, lets do something?',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 1,
        data: 'ummmm....',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 1,
        data: 'How about a game of league??',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 5,
        data: 'Why the hell not?',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 1,
        data: 'Sounds like a plan, ranked or normals?',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 1,
        data: 'I wanna rank tbh',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 5,
        data: 'pls carry me ye?',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 1,
        data: 'im the man for that job :D',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 1,
        data: 'yee lets go ranked!',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 5,
        data: 'now that\'s what im talking about!',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 1,
        data: 'cool stuff',
        date: '2012-04-23T18:25:43.511Z'
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
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 6,
        data: 'No you do it, I dont like working on this assignment',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 1,
        data: 'That\s unsportsmanlike man!',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 6,
        data: 'IDC ! I got better things to worry about!',
        date: '2012-04-23T18:25:43.511Z'
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
        data: 'Can someone link me with a good Ember tutorial?',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 1,
        data: '',
        date: '2012-04-23T18:25:43.511Z',
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
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 3,
        data: 'Who can link me with a borat movie!',
        date: '2012-04-23T18:25:43.511Z'
      }
    ]
  }
]

export class WebAPI {
  isRequesting = false;

  getContactList() {
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
          let results = contacts.map(x => {
              return {
                  id: x.id,
                  chatId: x.chatId,
                  firstName: x.firstName,
                  lastName: x.lastName,
                  email: x.email,
                  isOnline: x.isOnline,
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
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
          let results = activeChats.map(x => {
              return {
                  id: x.id,
                  type: x.type,
                  from: x.from,
                  messages: x.messages
                };
            });
          resolve(results);
          this.isRequesting = false;
        }, latency);
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
                  channelName: x.channelName,
                  users: ['User1', 'User2', 'User3']
                };
            });
          resolve(results);
          this.isRequesting = false;
        }, latency);
    });
  }
  getContactDetails(id) {
    let found = contacts.filter(x => x.id === id)[0];
    return found;
  }
  getChannelDetails(id) {
    let found = channels.filter(x => x.id === id)[0];
    return found;
  }
  getMessageDetails(id) {
    let found = activeChats.filter(x => x.id === id)[0];
    return found;
  }
  getProfile() {
    return myAccount;
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
}
