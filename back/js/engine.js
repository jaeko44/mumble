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
     * Log message object, containing the details of a log message
     * @param {type} _logType The type of error or message
     * @param {type} _message The message text
     * @param {type} _time The time of the log
     * @returns {undefined}
     */
    mumble.LogMessage = function(_logType, _message, _time){
        this.logType = _logType;
        this.message = _message;
        this.time = _time;
    };
    //Log Message Type constants
    mumble.LogMessage.WARNING = 0;
    mumble.LogMessage.INFO = 1;
    mumble.LogMessage.ERROR = 2;
    mumble.LogMessage.SUCCESS = 3;
    
    /**
     * Gets the log type as a string
     * @returns {String}
     */
    mumble.LogMessage.prototype.logTypeToString = function(){
        switch(this.logType){
            case 0:
                return "Warning";
            case 1:
                return "Info";
            case 3:
                return "Success";
            return "Error";
        }
    };
    

    /**
     * Maintains a log of messages from the system in the form of LogMessage
     * objects
     * @returns {undefined}
     */
    mumble.Log = function(){
        this.messages = [];
    };
    
    /**
     * Adds a new message to the MessageLog
     * @param {type} _logType The type of message
     * @param {type} _message The message to add
     */
    mumble.Log.prototype.add = function(_logType, _message){
        this.messages.push(new LogMessage(_logType, _message, Date.getTime()));
    };
    
    /**
     * Gets the size of the message log
     * @returns {engine_L1.mumble.Log.messages.length}
     */
    mumble.Log.prototype.size = function(){
        return this.messages.length;
    };
    /**
     * Gets a message from the message log
     * @param {type} index The index of the message in the log
     * @returns {engine_L1.mumble.Log.messages} A LogMessage object
     */
    mumble.Log.prototype.get = function(index){
        return this.messages[index];
    };
    
        
        
})(window.mumble = (window.mumble || {}, window.Date ));