/**
 * Contains implementations of functions and classes required to interact with
 * users
 * @param {type} mumble The mumble object
 * @param {type} Date The date object
 * @param {type} undefined The undefined value for comparison
 * @returns {undefined}
 */
(function(mumble, Date, undefined){
    /**
     * User class
     * Used for accessing and interacting with user objects
     * @param {number} _id The id of the user
     * @param {text} _name The name of the user
     * @param {number} _avatar The avatar id of the user
     * @returns {undefined}
     */
    mumble.User = function(_id, _name, _avatar){
        this.id = _id;
        this.name = _name;
        this.avatar = _avatar;
    };
    /**
     * Registers a new user
     * @param {type} name The name of the user
     * @param {type} password The password of the user in plaintext
     * @param {type} avatar The avatar the user will use as an avatar_id
     * @returns {undefined}
     */
    mumble.User.register = function(name, password, avatar){};
        
    /**
     * Gets the data for the user
     * @param {type} id The id to get the data for
     * @param {type} callback The function to call on success, with signature 
     * func(user) where user is a User object
     * @returns {undefined}
     */
    mumble.User.get = function(id, callback){
        if(callback !== undefined)
            callback(new User(1, "name", 1));
    };
    /**
     * Logs the user in and returns the user's data
     * @param {type} name The user name
     * @param {type} password The user password
     * @param {type} callback The function to call on completion, with signature 
     * func(user) where user is a User object if successful or false if the
     * credentials were incorrect
     * @returns {undefined}
     */
    mumble.User.login = function(name, password, callback){
        if(callback !== undefined)
            callback(new User(1, "name", 1));
    };   
    
        
})(window.mumble = (window.mumble || {}, window.Date ));