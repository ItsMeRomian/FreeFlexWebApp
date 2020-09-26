<?php
$success = 0;
include "../inc.php";

//Build query
$sql = "UPDATE Facturen
        SET
            factuur_isYoungOnes = :factuur_isYoungOnes,
            factuur_number = :factuur_number,
            factuur_link = :factuur_link,
            factuur_time = :factuur_time,
            factuur_payed = :factuur_payed
        WHERE
            factuur_id = :factuur_id";
$stmt = $conn->prepare($sql);

//Check if all values are set
if (isset($data['factuur_isYoungOnes'], $data['factuur_number'], $data['factuur_link'], $data['factuur_time'], $data['factuur_payed'], $data['factuur_id'])) {
    try {
        $stmt->bindParam(':factuur_isYoungOnes', $data['factuur_isYoungOnes']);
        $stmt->bindParam(':factuur_number', $data['factuur_number']);
        $stmt->bindParam(':factuur_link', $data['factuur_link']);
        $stmt->bindParam(':factuur_time', $data['factuur_time']);
        $stmt->bindParam(':factuur_payed', $data['factuur_payed']);
        $stmt->bindParam(':factuur_id', $data['factuur_id']);
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