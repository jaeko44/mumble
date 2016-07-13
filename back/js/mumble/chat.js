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
     * 
     * @param {type} _id
     * @param {type} _message
     * @param {type} _callback
     */
    mumble.Chat.sendMessage = function (_id, _message, _callback) {
        if (_callback != undefined) {
            callback();
        }
    };


})(window.mumble = (window.mumble || {}, window.Date));