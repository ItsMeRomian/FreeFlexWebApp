<?php
$success = 0;
include "../inc.php";

//Build query
$sql = "UPDATE Facturen
        SET
            factuur_payed = '1',
            factuur_number = :factuur_number,
            factuur_link = :factuur_link
        WHERE
            factuur_id = :factuur_id";
$stmt = $conn->prepare($sql);

//Check if all values are set
if (isset($data['factuur_id'])) {
    try {
        $stmt->bindParam(':factuur_id', $data['factuur_id']);
        $stmt->bindParam(':factuur_link', $data['factuur_link']);
        $stmt->bindParam(':factuur_number', $data['factuur_number']);
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