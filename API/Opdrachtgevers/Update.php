<?php
$success = 0;
include "../inc.php";

//Build query
$sql = "UPDATE Opdrachtgevers
        SET
            opdrachtgever_name = :opdrachtgever_name,
            opdrachtgever_contact = :opdrachtgever_contact
        WHERE
            opdrachtgever_id = :opdrachtgever_id";
$stmt = $conn->prepare($sql);

//Check if all values are set
if (isset($data['opdrachtgever_name'], $data['opdrachtgever_contact'], $data['opdrachtgever_id'])) {
    try {
        $stmt->bindParam(':opdrachtgever_name', $data['opdrachtgever_name']);
        $stmt->bindParam(':opdrachtgever_contact', $data['opdrachtgever_contact']);
        $stmt->bindParam(':opdrachtgever_id', $data['opdrachtgever_id']);
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