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
