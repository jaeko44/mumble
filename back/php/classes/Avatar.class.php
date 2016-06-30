<?php

/**
 * Implementation of Avatars DB table and avatar object allowing users to select
 * an avatar from a range
 * Author: Geoff Grundy 30/06/2016
 */
class Avatar {

//===== CONSTANTS =====
//Table
    const TABLE = "avatars";
//Columns
    const COL_ID = "id";
    const COL_TITLE = "title";
    const COL_FILE = "filename";

//===== ARGUMENTS =====
    private $id;

//===== METHODS =====
    /**
     * Creates an Avatar class => only id so no unnecessary DB query
     * @param type $_id
     */
    public function __construct($_id) {
        $this->id = $_id;
    }

    /**
     * Attempts to create a new avatar, returning the id if one already exists
     * with the same title, or creating a new one and returning the new id
     * @param type $title The title of the avatar
     * @param type $file The path to the avatar image
     * @return type
     */
    public static function Create($title, $file) {
        $exists = Table::select(Avatar::TABLE, array(
                    Avatar::COL_TITLE => $title
        ));
        //The avatar exists, return id
        if ($exists != false)
            return $exists[Avatar::COL_ID];

        //Doesn't exist, create avatar
        $result = Table::insert(Avatar::TABLE, array(
                    Avatar::COL_TITLE => $title,
                    Avatar::COL_FILE => $file
        ));
        return $result;
    }

    /**
     * Gets a list of all the avatars in the database, sorted by title
     */
    public static function GetAll() {
        return Table::select(Avatar::TABLE, array(), true, Avatar::COL_TITLE + " ASC");
    }

    /**
     * Gets the information about this avatar
     */
    public function Get() {
        return Table::select(Avatar::TABLE, array(
                    Avatar::COL_ID => $this->id
        ));
    }

    /**
     * Deletes the avatar from the database
     */
    public function Delete() {
        //TODO: Check if users have avatar and change it first
        //Delete avatar
        Table::delete(Avatar::TABLE, array(
            Avatar::COL_ID => $this->id
        ));
    }

    /**
     * Installs the table
     */
    public static function Install() {
        //Add table
        $table = new Table(Avatar::TABLE, array(
            Avatar::COL_ID => "INTEGER PRIMARY KEY",
            Avatar::COL_TITLE => "CHAR(64)",
            Avatar::COL_FILE => "CHAR(128)",
        ));
        $table->check_table();
    }

}
