<?php

/**
 * Implementation of the rooms_people database table and related functions
 * Author: Geoff Grundy 30/06/2016
 */
class PersonRoom {

//===== CONSTANTS =====
//Table
    const TABLE = "rooms_people";
//Columns
    //COMPOSITE KEY
    const COL_ROOM = "room_id";
    const COL_PERSON = "person_id";
    //The last post that the user saw from the room
    const COL_LAST_POST = "last_post";

//===== ARGUMENTS =====
    private $person, $room;

//===== METHODS =====
    /**
     * Creates a room object with id
     * @param type $_id
     */
    public function __construct($_person, $_room) {
        $this->person = $_person;
        $this->room = $_room;
    }

    /**
     * Attempts to create a new Person Room connection, 
     * @param type $person The id of the person
     * @param type $room The id of the room to put them in
     * @return type
     */
    public static function Create($person, $room) {
        $exists = Table::select(Room::TABLE, array(
                    PersonRoom::COL_PERSON => $person,
                    PersonRoom::COL_ROOM => $room
        ));
        //The room exists, return
        if ($exists != false)
            return;

        //Doesn't exist, create connection
        $result = Table::insert(Room::TABLE, array(
                    PersonRoom::COL_PERSON => $person,
                    PersonRoom::COL_ROOM => $room,
                    PersonRoom::COL_LAST_POST => -1
        ));
        return $result;
    }

    /**
     * Deletes the person room connection from the database
     */
    public function Delete() {
        Table::delete(PersonRoom::TABLE, array(
            PersonRoom::COL_PERSON => $this->person,
            PersonRoom::COL_ROOM => $this->room
        ));
    }

    /**
     * Installs the table
     */
    public static function Install() {
        //Add table
        $table = new Table(PersonRoom::TABLE, array(
            PersonRoom::COL_ROOM => "INTEGER",
            PersonRoom::COL_PERSON => "INTEGER",
            PersonRoom::COL_LAST_POST => "INTEGER"
        ));
        $table->create_table_extended("PRIMARY KEY (" . PersonRoom::COL_ROOM . ", " . PersonRoom::COL_PERSON . ")");
    }

}
