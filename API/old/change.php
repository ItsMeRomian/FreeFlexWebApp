<?php
include_once "connect.php";

//{
//	"action": "update",
//	"updateType": "Jobs",
//	"rowName": "job_title",
//	"newValue": "Nieuwe geupdate Naam",
//	"id": 4
//}
if (isset($data['action']) && $data['action'] == "update") {
    switch ($data['updateType']) {
        case "test_table":
            $sql = "UPDATE test_table SET " . $data['rowName'] . " = " . $data['newValue'] . " WHERE test_table_id = " . $data['id'];
            break;
        case "Jobs":
            $sql = "UPDATE Jobs SET " . $data['rowName'] . " = '" . $data['newValue'] . "' WHERE job_id = " . $data['id'];
            break;
        case "Facturen":
            $sql = "UPDATE Facturen SET " . $data['rowName'] . " = " . $data['newValue'] . " WHERE factuur_id = " . $data['id'];
            break;
        case "Opdrachtgevers":
            $sql = "UPDATE Opdrachtgevers SET " . $data['rowName'] . " = " . $data['newValue'] . " WHERE opdrachtgever_id = " . $data['id'];
            break;

    }
    $stmt = $conn->prepare($sql);
    $exec = $stmt->execute();
    if ($exec) {
        echo json_encode(array("succes" => true, "inserted data" => $data, "stmt" => $stmt));
    } else {
        echo json_encode (array("succes" => false, "inserted data" => $data, "stmt" => $stmt));
    }
}