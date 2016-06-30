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
    private $id;

//===== METHODS =====
    /**
     * Creates a room object with id
     * @param type $_id
     */
    public function __construct($_id) {
        $this->id = $_id;
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
        $table->create_table_extended("PRIMARY KEY (".PersonRoom::COL_ROOM.", ".PersonRoom::COL_PERSON.")");
    }
}
