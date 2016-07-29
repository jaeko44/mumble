<?php

include_once "DB.class.php";

/**
 * A class that handles making sure installation is successful and upgrading
 * a database table if new columns are added, as well as searching, inserting
 * and modifying table contents.
 * Author: Geoff Grundy 28/06/2015
 */
class Table {

//    ===INSTANCE VARIABLES===
    //The name of the table
    private $table_name;
    //The column names and definition
    private $columns = array(
            //COLUMN_NAME=>definition
    );

    /**
     * Creates the table object.
     * @param type $table_name The name of the table
     * @param type $columns The column names and definitions
     */
    function __construct($table_name, $columns) {
        $this->table_name = $table_name;
        $this->columns = $columns;
    }

    /**
     * Creates the table
     * @param type $db The open database object
     */
    private function create_table($db) {
        echo $this->table_name . " table did not exist. Creating it. <br/>";

        //Turn definitions into a useful string
        $definitions = array();
        foreach ($this->columns as $col => $defn) {
            $definitions[] = $col . " " . $defn;
        }

        //Create the query
        $query = "create table {$this->table_name} ("
                . implode(",", $definitions) . ");";
        $result = $db->query($query);
        //Relay success
        echo $this->table_name . " table creation " . ($result ? "" : "not ") . "successful.<br/>";
    }

    /**
     * Creates the table
     * @param type $args Additional arguments to the table constructor
     */
    public function create_table_extended($args) {
        $db = new DB();
        echo "Creating " . $this->table_name . ".<br/>";
                
        //Turn definitions into a useful string
        $definitions = array();
        foreach ($this->columns as $col => $defn) {
            $definitions[] = $col . " " . $defn;
        }

        //Create the query
        $query = "create table {$this->table_name} ("
                . implode(",", $definitions) . ", ".$args.");";
        $result = $db->query($query);
        //Relay success
        echo $this->table_name . " table creation " . ($result ? "" : "not ") . "successful.<br/>";
    }

    /**
     * Check if the columns match the definitions
     * @param type $db
     */
    private function check_columns($db) {
        //Get column info from db
        $result = $db->query("PRAGMA table_info({$this->table_name})");

        //Create array of columns in db to match against
        $columns = array();
        while ($row = $result->fetchArray()) {
            $columns[$row["name"]] = false;
        }
		$result->close();

        //Match existing columns versus defined columns
        foreach (array_keys($this->columns) as $name) {
            $exists = false;
            foreach (array_keys($columns) as $col) {
                //Now matched, set as already existing
                if ($col == $name) {
                    $exists = true;
                    break;
                }
            }
            //If definition column doesn't exist, create it
            if (!$exists) {
                $this->create_column($db, $name);
            }
        }
    }

    /**
     * Creates a column on the table
     * @param type $db The database object
     * @param type $name The name of the column
     */
    private function create_column($db, $name) {
        echo "Column '{$name}' doesn't exist. Adding column. <br/>";
        $query = "ALTER TABLE {$this->table_name} ADD COLUMN {$name} {$this->columns['$name']};";
        $result = $db->query($query);
        echo "Column '{$name}' creation " . ($result ? "" : "not ") . "successful.<br/>";
    }

    /**
     * Checks the current state of the table, and creates it if it doesn't exist,
     * otherwise adds new columns to it if they don't exist yet
     */
    public function check_table() {
        $db = new DB();
        //Create it if it doesn't exist
        if (!$db->is_table($this->table_name)) {
            $this->create_table($db);
        } else {
            echo "Table '{$this->table_name}' already exists. Checking columns. <br/>";
            //Check that column definitions are current
            $this->check_columns($db);
        }
        $db->close();
    }

    /**
     * Convenience method for deleting entries from a table
     * @param type $table The table name
     * @param type $getters The where clause, typically id=>1
     * @return type
     */
    public static function delete($table, $getters) {

        $get_list = array();
        foreach ($getters as $key => $value) {
            $get_list[] = $key . "=" . (is_string($value) ? "'" . $value . "'" : $value);
        }

        $db = new DB();
        $query = "DELETE FROM {$table} "
                . (count($get_list) > 0 ? "WHERE " . implode(" AND ", $get_list) : "");
        $result = $db->query($query);
		$db->close();
        return $result;
    }

    /**
     * Convenience method for inserting data into the database
     * @param type $table The table to insert into
     * @param type $values The key value pairs, typically "name"=>"bob"
     * @return type
     */
    public static function insert($table, $values) {

        //Quote strings
        foreach ($values as $key => $value) {
            if (is_string($value))
                $values[$key] = "'" . $value . "'";
        }

        $db = new DB();
        $query = "INSERT INTO {$table} "
                . "(" . implode(",", array_keys($values)) . ") "
                . "VALUES(" . implode(",", $values) . ")";

//                print_r($query);
        $result = $db->query($query);
        $db->close();
        return $result;
    }

    /**
     * Convenience method for updating a table
     * @param type $table The table name
     * @param type $getters Where selector. Typically id=>1
     * @param type $setters Values to set, Typically username=>bob
     * @return boolean Returns boolean true or false depending on success
     */
    public static function update($table, $getters, $setters) {

        $set_list = array();
        foreach ($setters as $key => $value) {
            $set_list[] = $key . "=" . (is_string($value) ? "'" . $value . "'" : $value);
        }

        $get_list = array();
        foreach ($getters as $key => $value) {
            $get_list[] = $key . "=" . (is_string($value) ? "'" . $value . "'" : $value);
        }

        $db = new DB();
        $query = "UPDATE {$table} "
                . "SET " . implode(",", $set_list) . " "
                . (count($get_list) > 0 ? "WHERE " . implode(" AND ", $get_list) : "");
//        print_r($query);
        $result = $db->query($query);
        $db->close();
        return $result;
    }

    /**
     * Convenience function for custom select query
     * @param boolean $multiple_rows Whether to return the first row, or multiple
     * @return array Returns an array or a multidimensional array representing the query results
     */
    public static function query($query, $multiple_rows = false) {
        $db = new DB();

        if ($multiple_rows) {
            $rows = array();
            $result = $db->query($query);
            while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
                $rows[] = $row;
            }
        } else {
            $result = $db->query($query);
			$rows = $result->fetch_array(MYSQLI_ASSOC);
        }
		$result->close();
        $db->close();
        return $rows;
    }
    
    /**
     * Convenience function for custom exec query
     * @param boolean $multiple_rows Whether to return the first row, or multiple
     * @return array Returns an array or a multidimensional array representing the query results
     */
    public static function exec($query) {
        $db = new DB();
        $result = $db->query($query);
        $db->close();
        return $result;
    }

    /**
     * Convenience function for getting rows of a database
     * @param type $table The table name
     * @param type $getters The selection clause
     * @param boolean $multiple_rows Whether to return the first row, or multiple
     * @return array Returns an array or a multidimensional array representing the query results
     */
    public static function select($table, $getters, $multiple_rows = false, $order_string = false) {
        $get_list = array();
        foreach ($getters as $key => $value) {
            $get_list[] = $key . "=" . (is_string($value) ? "'" . $value . "'" : $value);
        }

        $db = new DB();
        $query = "SELECT * "
                . "FROM {$table} "
                . (count($get_list) > 0 ? "WHERE " . implode(" AND ", $get_list) : "")
                . ($order_string != false ? " ORDER BY " . $order_string : "");

        if ($multiple_rows) {
            $rows = array();
            $result = $db->query($query);
			if(!$result)
				echo "Query Failed: ".$query;
            while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
                $rows[] = $row;
            }
        } else {
            $result = $db->query($query);
			if(!$result)
				echo "Query Failed: ".$query;
			$rows = $result->fetch_array(MYSQLI_ASSOC);
        }
		$result->close();
        $db->close();
        return $rows;
    }

}
?>

