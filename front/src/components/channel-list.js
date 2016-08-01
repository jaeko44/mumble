import {WebAPI} from '../data/web-api';

export class ChannelList {
  static inject() { return [WebAPI] };

  constructor(api){
    this.api = api;
    this.channels = [];
  }

  created(){
    this.api.getChannelList().then(channels => this.channels = channels);
  }

  select(channel){
    this.selectedId = channel.id;
    return true;
  }
}