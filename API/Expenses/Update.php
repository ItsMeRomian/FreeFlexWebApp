<?php
$success = 0;
include "../inc.php";

//Build query
$sql = "UPDATE Expenses
        SET
            expense_name = :expense_name,
            expense_type = :expense_type,
            expense_amount = :expense_amount,
            expense_btw = :expense_btw
        WHERE
            expense_id = :expense_id";
$stmt = $conn->prepare($sql);

//Check if all values are set
if (isset($data['expense_name'], $data['expense_type'], $data['expense_amount'], $data['expense_btw'], $data['expense_id'])) {
    try {
        $stmt->bindParam(':expense_name', $data['expense_name']);
        $stmt->bindParam(':expense_type', $data['expense_type']);
        $stmt->bindParam(':expense_amount', $data['expense_amount']);
        $stmt->bindParam(':expense_btw', $data['expense_btw']);
        $stmt->bindParam(':expense_id', $data['expense_id']);
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