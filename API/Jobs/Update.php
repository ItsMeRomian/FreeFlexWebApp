<?php
$success = 0;
include "../inc.php";

//Build query
$sql = "UPDATE Jobs
        SET
            job_title = :job_title,
            job_period = :job_period,
            job_start = :job_start,
            job_end = :job_end,
            job_break = :job_break,
            job_rate = :job_rate,
            job_address = :job_address
        WHERE
            job_id = :job_id";
$stmt = $conn->prepare($sql);

//Check if all values are set
if (isset($data['job_title'], $data['job_period'], $data['job_start'], $data['job_end'], $data['job_break'], $data['job_rate'], $data['job_address'])) {
    try {
        $stmt->bindParam(':job_id', $data['job_id']);
        $stmt->bindParam(':job_title', $data['job_title']);
        $stmt->bindParam(':job_period', $data['job_period']);
        $stmt->bindParam(':job_start', $data['job_start']);
        $stmt->bindParam(':job_end', $data['job_end']);
        $stmt->bindParam(':job_break', $data['job_break']);
        $stmt->bindParam(':job_rate', $data['job_rate']);
        $stmt->bindParam(':job_address', $data['job_address']);
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