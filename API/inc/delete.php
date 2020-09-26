<?php
function delete($conn, $data, $tableName, $tableIdentifier, $rowID) {

    //Check if entry exists
    $check = $conn->prepare("SELECT $tableIdentifier FROM $tableName WHERE $tableIdentifier = " . $rowID . " LIMIT 1");
    $check->execute();
    $checkResult = $check->fetchAll(PDO::FETCH_ASSOC);


    if (!empty($checkResult)) {
        $sql = "DELETE FROM $tableName WHERE $tableIdentifier = " . $rowID;
        $stmt = $conn->prepare($sql);
        $success = $stmt->execute() ? true : false;
        $return = (
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
                    )
                )
            )
        );
    } else {
        $return = json_encode(
            array(
                "sendData" => $data,
                "success" => false,
                "SQLRan" => $checkResult,
                "error" => array(
                    "message" => "Row does not exist, nothing to delete."
                    //"exec" => $exec
                )
            )
        );
    }
    return $return;
}