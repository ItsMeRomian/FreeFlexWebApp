<?php
function get($conn, $defaultSort, $data, $tableName, $tableIdentifier) {
    //Default order by $defaultSort, but can be changed
    $order = isset($data['order']) ? $data['order'] : $defaultSort;


//Select a single one if $data['id'] isset
    if (isset($data['id'])) {
        $where = "WHERE $tableIdentifier = " . $data['id'];
    } else {
        $where = "";
    }

//Build the query
    $sql = "SELECT * FROM $tableName $where ORDER BY $order";

    if (isset($data['sort']) ) {
        if ($data['sort'] == "DESC") {
            $sql = $sql . " DESC";
        } else {
            $sql = $sql . " ASC";
        }
    }

    $stmt = $conn->prepare($sql);
    $success = $stmt->execute() ? true : false;
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
            "return" => $stmt->fetchAll(PDO::FETCH_ASSOC),
        )
    )
    );
}