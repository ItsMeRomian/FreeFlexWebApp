<?php
$success = 0;
include "../inc.php";

//Build the query
$sql = "INSERT INTO Opdrachtgevers 
        (opdrachtgever_name, opdrachtgever_contact) VALUES 
        (:opdrachtgever_name, :opdrachtgever_contact)";

$stmt = $conn->prepare($sql);

//Check if values are not empty
if (isset($data['opdrachtgever_name'], $data['opdrachtgever_contact'])) {
    try {
        $stmt->bindParam(':opdrachtgever_name', $data['opdrachtgever_name']);
        $stmt->bindParam(':opdrachtgever_contact', $data['opdrachtgever_contact']);
    } catch (PDOException $e) {
        print_r($e->getMessage());
    }
}
try {
    //Exec the query
    $success = $stmt->execute();
} catch (PDOException $e) {
    print_r($e->getMessage());
}

echo (
json_encode(
    array(
        "sendData" => $data,
        "success" => $success,
        "SQLRan" => $sql,
        "error" => array(
            "connResponse" => $conn,
            "stmtErrorInfo" => $stmt->errorInfo(),
            "stmtErrorCode" => $stmt->errorCode(),
            //"exec" => $exec
        ),
    )
)
);