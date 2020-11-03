<?php
$success = 0;
include "../inc.php";

//Build the query
$sql = "INSERT INTO Expenses 
        (expense_name, expense_type, expense_amount, expense_btw, expense_linkedToJob, expense_jobID) VALUES 
        (:expense_name, :expense_type, :expense_amount, :expense_btw, :expense_linkedToJob, :expense_jobID)";

$stmt = $conn->prepare($sql);

//Check if values are not empty
if (isset($data['expense_name'], $data['expense_type'], $data['expense_amount'], $data['expense_btw'], $data['expense_linkedToJob'], $data['expense_jobID'])) {
    try {
        $stmt->bindParam(':expense_name', $data['expense_name']);
        $stmt->bindParam(':expense_type', $data['expense_type']);
        $stmt->bindParam(':expense_amount', $data['expense_amount']);
        $stmt->bindParam(':expense_btw', $data['expense_btw']);
        $stmt->bindParam(':expense_linkedToJob', $data['expense_linkedToJob']);
        $stmt->bindParam(':expense_jobID', $data['expense_jobID']);
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
        "id" => $conn->lastInsertId(),
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