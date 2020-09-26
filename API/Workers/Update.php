<?php
$success = 0;
include "../inc.php";

//Build query
$sql = "UPDATE Workers
        SET
            worker_btwnumber = :worker_btwnumber,
            worker_kvknumber = :worker_kvknumber,
            worker_address = :worker_address,
            worker_city = :worker_city,
            worker_country = :worker_country
        WHERE
            worker_id = :worker_id";
$stmt = $conn->prepare($sql);

//Check if all values are set
if (isset($data['worker_btwnumber'], $data['worker_kvknumber'], $data['worker_address'], $data['worker_city'], $data['worker_country'], $data['worker_id'])) {
    try {
        $stmt->bindParam(':worker_btwnumber', $data['worker_btwnumber']);
        $stmt->bindParam(':worker_kvknumber', $data['worker_kvknumber']);
        $stmt->bindParam(':worker_address', $data['worker_address']);
        $stmt->bindParam(':worker_city', $data['worker_city']);
        $stmt->bindParam(':worker_country', $data['worker_country']);
        $stmt->bindParam(':worker_id', $data['worker_id']);
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