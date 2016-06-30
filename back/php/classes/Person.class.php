<?php

/**
 * Implementation of the Person database table and related functions
 * Author: Geoff Grundy 30/06/2016
 */
class Person {

//===== CONSTANTS =====
//Table
    const TABLE = "people";
//Columns
    const COL_ID = "id";
    const COL_NAME = "name";
    const COL_PASSWORD = "password";
    const STATUS_PERSON = -1;

//===== ARGUMENTS =====
    private $id;

//===== METHODS =====
    /**
     * Creates a person object with id
     * @param type $_id
     */
    public function __construct($_id) {
        $this->id = $_id;
    }

    /**
     * Attempts to create a new Person, returning false if one already exists
     * with the same name, or creating a new one and returning the new id
     * @param type $name The username
     * @param type $password The password for the account
     * @return type
     */
    public static function Create($name, $password) {
        $exists = Table::select(Person::TABLE, array(
                    Person::COL_NAME => $name
        ));
        //The user exists, return false
        if ($exists != false)
            return false;

        //Doesn't exist, create person
        $result = Table::insert(Person::TABLE, array(
                    Person::COL_NAME => $name,
                    Person::COL_PASSWORD => $password
        ));
        return $result;
    }

    /**
     * Installs the table
     */
    public static function Install() {
        //Add table
        $table = new Table(Person::TABLE, array(
            Person::COL_ID => "INTEGER PRIMARY KEY",
            Person::COL_NAME => "CHAR(64)",
            Person::COL_PASSWORD => "CHAR(64)"
        ));
        $table->check_table();


        //Check that status user is installed
        $result = Table::select(Person::TABLE, array(
                    Person::COL_ID => Person::STATUS_PERSON
        ));
        if ($result != false)
            return;

        //If not, create
        Table::insert(Person::TABLE, array(
            Person::COL_NAME => "Status",
            Person::COL_PASSWORD => "",
            Person::COL_ID => Person::STATUS_PERSON
        ));
    }

}
