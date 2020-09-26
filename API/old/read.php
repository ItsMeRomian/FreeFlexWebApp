<?php
include_once "connect.php";

//Read a whole table out
//Example request:
//{
//	"action": "read",
//	"readWholeTable": true,
//	"tableName": "Facturen"
//}
if (isset($data['readWholeTable'])) {
    $allowedTableLookups = array("Jobs", "Facturen", "Opdrachtgevers", "Workers");

    //Check if tableName is allowed
    if (in_array($data['tableName'], $allowedTableLookups)) {
        $sql = "SELECT * FROM " . $data['tableName'];
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode(array("error" => true, "message" => "tableName is not allowed."));
    }

}


//Find a specific row or rows
//Handy if you want to find jobs of a specific user or opdrachtgever
//Example request:
//{
//	"action": "read",
//	"readSpecific": true,
//	"tableName": "Opdrachtgevers",
//	"column": "opdrachtgever_name",
//	"value": "Opvallers"
//}
if (isset($data['readSpecific'])) {
    $allowedTableLookups = array("Jobs", "Facturen", "Opdrachtgevers", "Workers", "Expenses");

    if (in_array($data['tableName'], $allowedTableLookups)) {
        $sql = "SELECT * FROM " . $data['tableName'] . " WHERE " . $data['column'] . " = :value";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':value', $data['value']);
        $stmt->execute();
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode(array("error" => true, "message" => "tableName is not allowed."));
    }

}

if (isset($data['readSorted'])) {
    $allowedTableLookups = array("Jobs", "Facturen", "Opdrachtgevers", "Workers", "Expenses");

    if (in_array($data['tableName'], $allowedTableLookups)) {
        if (isset($data['sortDesc'])) {
            $sql = "SELECT * FROM " . $data['tableName'] . " ORDER BY " . $data['sort'] . " DESC";
        } else {
            $sql = "SELECT * FROM " . $data['tableName'] . " ORDER BY " . $data['sort'];
        }
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':value', $data['value']);
        $stmt->execute();
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode(array("error" => true, "message" => "tableName is not allowed."));
    }

}