<?php
$success = 0;
include "../inc.php";

//Build the query
$sql = "INSERT INTO Jobs (job_title, worker_id, opdrachtgever_id, factuur_id, job_address, job_period, job_start, job_end, job_break, job_date, job_rate) 
        VALUES (:job_title, :worker_id, :opdrachtgever_id, :factuur_id, :job_address, :job_period, :job_start, :job_end, :job_break, :job_date, :job_rate)";

$stmt = $conn->prepare($sql);

//Check if values are not empty
if (isset($data['job_title'], $data['worker_id'], $data['opdrachtgever_id'], $data['factuur_id'], $data['job_address'], $data['job_start'], $data['job_end'], $data['job_break'], $data['job_date'], $data['job_rate'])) {
    try {
        $stmt->bindParam(':job_title', $data['job_title']);
        $stmt->bindParam(':worker_id', $data['worker_id']);
        $stmt->bindParam(':opdrachtgever_id', $data['opdrachtgever_id']);
        $stmt->bindParam(':factuur_id', $data['factuur_id']);
        $stmt->bindParam(':job_address', $data['job_address']);
        $stmt->bindParam(':job_period', $data['job_period']);
        $stmt->bindParam(':job_start', $data['job_start']);
        $stmt->bindParam(':job_end', $data['job_end']);
        $stmt->bindParam(':job_break', $data['job_break']);
        $stmt->bindParam(':job_date', $data['job_date']);
        $stmt->bindParam(':job_rate', $data['job_rate']);
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