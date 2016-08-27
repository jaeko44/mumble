export class loginView {
    constructor() {
        this.page = '';
    }
    activate(params, navigationInstruction) {
        console.log('params: , navigationInstruction', params, navigationInstruction);
        if (params.page) {
            this.page = params.page;
        }
        else if (navigationInstruction.settings.page) {
            this.page = navigationInstruction.settings.page;
        }
        if (!this.page) {
            this.page = 'login';
        }
    }
}