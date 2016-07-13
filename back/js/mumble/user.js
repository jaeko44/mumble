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
    
    /**
     * A class handling notifications to the user about events that occur
     * @param {type} _notifyType The type of notification as a constant
     * @param {type} _message The message to send to the user
     * @param {type} _triggeringUser The User that triggered the notification if
     * applicable
     * @param {type} _time The time that the event occurred
     * @returns {undefined}
     */
    mumble.Notification = function(_notifyType, _message, _triggeringUser, _time){
      this.notificationType = _notifyType;
      this.message = _message;
      this.triggeringUser = _triggeringUser;
      this.time = _time;
    };
    //Notification type constants
    mumble.Notification.MENTION = 0;
    mumble.Notification.JOIN = 1;
    mumble.Notification.LEAVE = 2;
    mumble.Notification.MESSAGE = 3;
    
    //An array that contains handlers registered to be called when a user is
    //notified of an event
    var notificationHandlers = [];
    /**
     * Adds an event handler to be called when the user is notified about an event
     * @param {type} callback A callback function with the signature func(notification)
     * where notification is a notification object containing the properties:
     * notificationType (An integer representing the NotificationType flag)
     * message (The message to be sent to the user)
     * triggeringUser (The user who caused the event to be triggered if applicable)
     * time (The time that the event was triggered)
     */
    mumble.User.addNotifyEventHandler = function(callback){
        notificationHandlers.push(callback);
    };
    
    /**
     * Called when a notify event occurs, triggering any registered notify event
     * handlers
     * @param {type} notification A notification object
     * @returns {undefined}
     */
    function onNotify(notification){
        for(var i = 0; i<notificationHandlers.length; i++)
            notificationHandlers(notification);
    }
        
})(window.mumble = (window.mumble || {}, window.Date ));