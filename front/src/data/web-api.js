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
    firstName: 'Charles',
    lastName: 'Williams',
    email: 'williams@inklings.com',
    phoneNumber: '867-5309',
    isOnline: 'away',
    unreadMsgs: 1,
    icon: 'face4.ico'
  },
  {
    id: getId(),
    firstName: 'Roger',
    lastName: 'Green',
    email: 'green@inklings.com',
    phoneNumber: '867-5309',
    isOnline: 'offline',
    unreadMsgs: 0,
    icon: 'face5.ico'
  }
];
id = 0;
let activeChats = [
  {
    id: getId(),
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
    id: getId(),
    type: 'channel',
    from: 2,
    messages: [
      {
        from: 3,
        data: 'Hey guys, how\'s the app developing so far?',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 1,
        data: 'Buggy buggy, we need more resources or time to get this done.',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 4,
        data: 'Yea, this is no where close to release.',
        date: '2012-04-23T18:25:43.511Z'
      },
      {
        from: 3,
        data: 'Hey guys, how\'s the app developing so far?',
        date: '2012-04-23T18:25:43.511Z'
      }
    ]
  },
  {
    id: getId(),
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
id = 0;
let channels = [
  {
    id: getId(),
    channelName: 'General'
  },
  {
    id: getId(),
    channelName: 'Development'
  },
  {
    id: getId(),
    channelName: 'Design'
  }
];

export class WebAPI {
  isRequesting = false;

  getContactList() {
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
          let results = contacts.map(x => {
              return {
                  id: x.id,
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
    let found = contacts.filter(x => x.id == id)[0];
    return found;
  }
  getChannelDetails(id) {
    let found = channels.filter(x => x.id == id)[0];
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
