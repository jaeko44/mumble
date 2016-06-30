<?php

/**
 * Implementation of the Room database table and related functions
 * Author: Geoff Grundy 30/06/2016
 */
class Room {

//===== CONSTANTS =====
//Table
    const TABLE = "rooms";
//Columns
    const COL_ID = "id";
    const COL_NAME = "name";
    const COL_PRIVATE = "private";

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
     * Attempts to create a new Room, returning the id if one already exists
     * with the same name, or creating a new one and returning the new id
     * @param type $name The room name
     * @param boolean $private Whether the room is private
     * @return type
     */
    public static function Create($name, $private) {
        $exists = Table::select(Room::TABLE, array(
                    Room::COL_NAME => $name
        ));
        //The room exists, return id
        if ($exists != false)
            return $exists[Room::COL_ID];

        //Convert private to an integer
        //Doesn't exist, create room
        $result = Table::insert(Room::TABLE, array(
                    Room::COL_NAME => $name,
                    Room::COL_PRIVATE => ($private == FALSE ? 0 : 1)
        ));
        return $result;
    }

    /**
     * Deletes the room from the database
     */
    public function Delete() {
        Table::delete(Room::TABLE, array(
            Room::COL_ID => $this->id
        ));
    }

    /**
     * Installs the table
     */
    public static function Install() {
        //Add table
        $table = new Table(Room::TABLE, array(
            Room::COL_ID => "INTEGER PRIMARY KEY",
            Room::COL_NAME => "CHAR(64)",
            Room::COL_PRIVATE => "INTEGER"
        ));
        $table->check_table();
    }

}
