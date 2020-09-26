<?php
$success = 0;
include "../inc.php";

//Build the query
$sql = "INSERT INTO Workers 
        (worker_firstname, worker_lastname, worker_btwnumber, worker_kvknumber, worker_address, worker_city, worker_country) VALUES 
        (:worker_firstname, :worker_lastname, :worker_btwnumber, :worker_kvknumber, :worker_address, :worker_city, :worker_country)";

$stmt = $conn->prepare($sql);

//Check if values are not empty
if (isset($data['worker_firstname'], $data['worker_lastname'], $data['worker_btwnumber'], $data['worker_kvknumber'], $data['worker_address'], $data['worker_city'], $data['worker_country'])) {
    try {
        $stmt->bindParam(':worker_firstname', $data['worker_firstname']);
        $stmt->bindParam(':worker_lastname', $data['worker_lastname']);
        $stmt->bindParam(':worker_btwnumber', $data['worker_btwnumber']);
        $stmt->bindParam(':worker_kvknumber', $data['worker_kvknumber']);
        $stmt->bindParam(':worker_address', $data['worker_address']);
        $stmt->bindParam(':worker_city', $data['worker_city']);
        $stmt->bindParam(':worker_country', $data['worker_country']);
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