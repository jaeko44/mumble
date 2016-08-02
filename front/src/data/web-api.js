let latency = 200; //To mimic a real connection
let id = 0;

function getId() {
  return ++id;
}

let contacts = [
  {
    id: getId(),
    firstName: 'John',
    lastName: 'Tolkien',
    email: 'tolkien@inklings.com',
    phoneNumber: '867-5309',
    isOnline: 'online',
    unreadMsgs: 0
  },
  {
    id: getId(),
    firstName: 'Clive',
    lastName: 'Lewis',
    email: 'lewis@inklings.com',
    phoneNumber: '867-5309',
    isOnline: 'online',
    unreadMsgs: 4
  },
  {
    id: getId(),
    firstName: 'Owen',
    lastName: 'Barfield',
    email: 'barfield@inklings.com',
    phoneNumber: '867-5309',
    isOnline: 'offline',
    unreadMsgs: 0
  },
  {
    id: getId(),
    firstName: 'Charles',
    lastName: 'Williams',
    email: 'williams@inklings.com',
    phoneNumber: '867-5309',
    isOnline: 'away',
    unreadMsgs: 1
  },
  {
    id: getId(),
    firstName: 'Roger',
    lastName: 'Green',
    email: 'green@inklings.com',
    phoneNumber: '867-5309',
    isOnline: 'offline',
    unreadMsgs: 0
  }
];
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
    this.isRequesting = true;
    return new Promise(resolve => {
        setTimeout(() => {
            let found = contacts.filter(x => x.id == id)[0];
            resolve(JSON.parse(JSON.stringify(found)));
            this.isRequesting = false;
          }, latency);
      });
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
