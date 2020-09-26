<?php
include "connect.php";
include "inc/delete.php";
include "inc/get.php";
function basicResponse($data, $success, $sql, $conn, $stmt, $exec) {
    return json_encode(
        array(
            "sendData" => $data,
            "success" => $success,
            "SQLRan" => $sql,
            "error" => array(
                "connResponse" => $conn,
                "stmtErrorInfo" => $stmt->errorInfo(),
                "stmtErrorCode" => $stmt->errorCode(),
                "exec" => $exec
            )
        )
    );
}