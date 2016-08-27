export class sidebarSettingsMenu {

  activate(params) {
      this.page = params;
      if (this.page == 'profile' || this.page == 'security' || this.page == 'appearance' || this.page == 'channels' || this.page == 'contacts') {
          this.menu = 'settings';
      }
      else if (this.page == 'home') {
          this.menu = 'home';
      }
      console.log("Page being read by SETTINGS MENU: ", this.page);
  }

}
