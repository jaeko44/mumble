<?php

/**
 * Class to handle abstracting interaction with the SQLite database
 * Author: Geoff Grundy 28/06/2015
 */
class DB extends mysqli {

//    ===CONSTANTS===
    //Connection
    const PATH = "localhost";
    const USERNAME = "mumble_admin";
    const PASSWORD = "jzL2x5z5zuWQ2Nvf";
    const DATABASE = "mumble_db";

//    ===CONSTRUCTOR===

    /**
     * Creates a new instance of the database object, opening the database and
     * creating it if it doesn't exist
     */
    function __construct() {
        parent::__construct(DB::PATH, DB::USERNAME, DB::PASSWORD, DB::DATABASE);

        if (mysqli_connect_error()) {
            die('Connect Error (' . mysqli_connect_errno() . ') '
                    . mysqli_connect_error());
        }
    }

//    ===EXISTENTIAL===

    /**
     * Determines whether the specified table exists in the database
     * @param type $tableName The name of the table
     * @return boolean Returns true if it exists, false otherwise
     */
    public function is_table($tableName = null) {
        if ($tableName == null)
            return false;
        $result = $this->query("SHOW TABLES LIKE '{$tableName}'");
        $success = $result->num_rows > 0;
        $result->close();
        return $success;
    }

}
