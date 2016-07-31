export class Profile {
    constructor(fName, lName, email) {
        this.fName = fName;
        this.lName = lName;
        this.email = email;
    }
    set changefName(fName) {
        this.fName = fName;
    }
    set changelName(lName) {
        this.lName = lName;
    }
    set changeEmail(email) {
        this.email = email;
    }
}