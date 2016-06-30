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
    const COL_AVATAR = "avatar";
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
                    Person::COL_PASSWORD => password_hash($password, "PASSWORD_BCRYPT"),
                    Person::COL_AVATAR => -1
        ));
        return $result;
    }

    /**
     * Authenticates the supplied username and password against those stored
     * in the database.
     * @param type $username The username
     * @param type $password The password
     * @return type Returns the id if the person is authenticated or false otherwise
     */
    public static function Authenticate($username, $password) {
        $result = Table::select(Person::TABLE, array(
                    Person::COL_NAME => $this->$username
        ));
        if (password_verify($password, $result[Person::COL_PASSWORD])) {
            return $result[Person::COL_ID];
        }
        return false;
    }

    /**
     * Gets the information about this person
     * Columns retrieved in order:
     * id, name, avatar_title, avatar_file
     */
    public function Get() {
        return Table::query(""
                        . "select p." . Person::COL_ID . ", p." . Person::COL_NAME . ", a." . Avatar::COL_TITLE . ", a." . Avatar::COL_FILE . ""
                        . "from " . Avatar::TABLE . " a, " . Person::TABLE . " p"
                        . "where a." . Avatar::COL_ID . " = p." . Person::COL_AVATAR . ""
                        . "and p." . Person::COL_ID . "=" . $this->id . "");
    }

    /**
     * Deletes the person from the database
     */
    public function Delete() {
        //Delete person
        Table::delete(Person::TABLE, array(
            Person::COL_ID => $this->id
        ));
    }

    /**
     * Installs the table
     */
    public static function Install() {
        //Add table
        $table = new Table(Person::TABLE, array(
            Person::COL_ID => "INTEGER PRIMARY KEY",
            Person::COL_NAME => "CHAR(64)",
            Person::COL_PASSWORD => "CHAR(64)",
            Person::COL_AVATAR => "INTEGER"
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
            Person::COL_ID => Person::STATUS_PERSON,
            Person::COL_AVATAR => -1
        ));
    }

}
