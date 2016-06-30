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
    
    const COL_ROOM = "room";
    const COL_POST = "last_post";
    
    const COL_COLOR = "color";
    const COL_TIME = "time";
    const DISTINCT_COLORS = 10;
//    const COL_PASSWORD = "password";
    const STATUS_PERSON = -1;

//===== ARGUMENTS =====
    private $id;

//===== METHODS =====
    /**
     * Gets a person from the database
     * @param type $_id
     */
    public function __construct($_id) {
        $this->id = $_id;
    }

    
}
