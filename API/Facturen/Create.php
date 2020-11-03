<?php
$success = 0;
include "../inc.php";
//Build the query
$sql = "INSERT INTO Facturen (factuur_platform, factuur_number, factuur_link, factuur_time, factuur_payed, factuur_factoring, factuur_facturingPercentage)
        VALUES (:factuur_platform, :factuur_number, :factuur_link, :factuur_time, :factuur_payed, :factuur_factoring, :factuur_facturingPercentage)";

$stmt = $conn->prepare($sql);
//Check if values are not empty
if (isset($data['factuur_platform'], $data['factuur_number'], $data['factuur_link'], $data['factuur_time'], $data['factuur_factoring'], $data['factuur_facturingPercentage'])) {
    try {
        $stmt->bindParam(':factuur_platform', $data['factuur_platform']);
        $stmt->bindParam(':factuur_number', $data['factuur_number']);
        $stmt->bindParam(':factuur_link', $data['factuur_link']);
        $stmt->bindParam(':factuur_time', $data['factuur_time']);
        $stmt->bindParam(':factuur_payed', $data['factuur_payed']);
        $stmt->bindParam(':factuur_factoring', $data['factuur_factoring']);
        $stmt->bindParam(':factuur_facturingPercentage', $data['factuur_facturingPercentage']);
    } catch (PDOException $e) {
        print_r($e->getMessage());
    }
} else { die("Not all parameters were send.");}
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
            "id" => $conn->lastInsertId(),
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