/**
 * Contains functions and classes for implementation of a Message Logging system
 * @param {type} mumble The mumble object
 * @param {type} Date The window Date object
 * @param {type} undefined The undefined value for comparisons
 * @returns {undefined}
 */
(function(mumble, Date, undefined){
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
    
    /**
     * Gets the last message from the message log. If there are no messages,
     * returns false
     * @returns {engine_L1.mumble.Log.messages} A LogMessage object
     */
    mumble.Log.prototype.getLast = function(){
        if(this.messages.length === 0)
            return false;
        return this.messages[this.messages.length-1];
    };
    
        
        
})(window.mumble = (window.mumble || {}, window.Date ));
