/**
 * Contains implementations of functions and classes required to chat and receive
 * messages
 * @param {type} mumble The mumble object
 * @param {type} Date The date object
 * @param {type} undefined The undefined value for comparison
 * @returns {undefined}
 */
(function (mumble, Date, undefined) {

    /**
     * An object that contains details of a chat message
     * @param {type} _userId The id of the user that sent the message
     * @param {type} _roomId The id of the room the message was sent to
     * @param {type} _message The text of the message
     * @param {type} _time The time that the message was sent
     * @returns {undefined}
     */
    mumble.ChatMessage = function (_userId, _roomId, _message, _time) {
        this.userId = _userId;
        this.roomId = _roomId;
        this.message = _message;
        this.time = _time;
    };

    /**
     * Chat class that allows posting and receiving messages
     * @returns {undefined}
     */
    mumble.Chat = function () {
        this.messageList = [];
    };

    /**
     * Adds a message to chat message list
     * @param {type} message The message to add
     */
    mumble.Chat.prototype.addMessage = function (message) {
        this.messageList.push(message);
    };
    /**
     * Clears the messages in the message list
     */
    mumble.Chat.prototype.clear = function () {
        this.messageList = [];
    };
    mumble.Chat.prototype.getMessagesByRoom = function(roomId){
        var roomMessages = [];
        for(var i = 0; i<this.messageList.length; i++)
        {
            if(this.messageList[i].roomId == roomId)
                roomMessages.push(this.messageList[i]);
        }
        return roomMessages();
    };

    /**
     * Sends a message to the chat and callbacks success
     * @param {type} _room The room id to send it to
     * @param {type} _message The message to send
     * @param {type} _callback A callback function with signature func(success)
     * where success = true if successful, false otherwise
     */
    mumble.Chat.sendMessage = function (_roomId, _message, callback) {
        if (_callback != undefined) {
            callback(true);
        }
    };
    
    /**
     * Called on a timer or when the database is polled, receives messages from
     * the database and passes them on to the event handler
     * @param {type} callback
     * @returns {undefined}
     */
    var checkMessages = function(callback){
        
    };
    
    //Array of message EventHandlers
    var messageHandlers = [];
    
    /**
     * Called when a message is received from the server, and delegates responses
     * to the registered event handlers
     * @param {type} chat The chat object
     * @returns {undefined}
     */
    function onMessageReceived(chat){
        for(var i = 0; i < messageHandlers.length; i++)
            messageHandlers[i](chat);
    }
    
    /**
     * Registers an event handler for the message received event. When the database
     * is checked for messages, returns results in a callback function
     * @param {type} callback The function to call when results are returned. Has
     * the signature func(chat) where chat is a chat object providing functionality
     * for getting messages by room.
     */
    mumble.Chat.addMessageEventHandler = function(callback){
        messageHandlers.push(callback);
    };
    
    /**
     * Removes a previously registered event handler from the list if it exists
     * @param {type} callback The handler to remove
     */
    mumble.Chat.removeMessageEventHandler = function(callback){
        for(var i = messageHandlers.length-1; i >= 0; i--)
            if(messageHandlers[i] == callback)
                messageHandlers.splice(i, 1);
    };


})(window.mumble = (window.mumble || {}, window.Date));