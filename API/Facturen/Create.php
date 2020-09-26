<?php
$success = 0;
include "../inc.php";
//Build the query
$sql = "INSERT INTO Facturen 
        (factuur_isYoungOnes, factuur_number, factuur_link, factuur_time, factuur_payed) VALUES 
        (:factuur_isYoungOnes, :factuur_number, :factuur_link, :factuur_time, :factuur_payed)";
$stmt = $conn->prepare($sql);
//Check if values are not empty
if (isset($data['factuur_isYoungOnes'], $data['factuur_number'], $data['factuur_link'], $data['factuur_time'], $data['factuur_payed'])) {
    try {
        $stmt->bindParam(':factuur_isYoungOnes', $data['factuur_isYoungOnes']);
        $stmt->bindParam(':factuur_number', $data['factuur_number']);
        $stmt->bindParam(':factuur_link', $data['factuur_link']);
        $stmt->bindParam(':factuur_time', $data['factuur_time']);
        $stmt->bindParam(':factuur_payed', $data['factuur_payed']);
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