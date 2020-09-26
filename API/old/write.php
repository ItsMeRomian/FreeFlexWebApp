<?php
include_once "connect.php";

//Add new user
//{
//	"addNewUser": true,
//	"firstname": "Yffffouri",
//	"lastname": "Slastname",
//	"btwnr": "btSwnr",
//	"kvknr": "kvSknr",
//	"address": "SSaddress",
//	"city": "cSity",
//	"country": "countrSy"
//}
if (isset($data['addNewWorker'])) {
    $sql = "INSERT INTO Workers (worker_firstname, worker_lastname, worker_btwnumber, worker_kvknumber, worker_address, worker_city, worker_country)
                            VALUES (:firstname, :lastname, :btwnr, :kvknr, :address, :city, :country)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':firstname', $data['firstname']);
    $stmt->bindParam(':lastname', $data['lastname']);
    $stmt->bindParam(':btwnr', $data['btwnr']);
    $stmt->bindParam(':kvknr', $data['kvknr']);
    $stmt->bindParam(':address', $data['address']);
    $stmt->bindParam(':city', $data['city']);
    $stmt->bindParam(':country', $data['country']);
    $exec = $stmt->execute();
    if ($exec) {
        echo json_encode(array("succes" => true, "inserted data" => $data));
    } else {
        echo json_encode(array("succes" => false, "inserted data" => $data));
    }
}

//Add a new opdrachtgever
//{
//	"addNewOpdrachtgever": true,
//	"name": "SecureCOmp",
//	"contact": "Slastname"
//}
if (isset($data['addNewOpdrachtgever'])) {
    $sql = "INSERT INTO Opdrachtgevers (opdrachtgever_name, opdrachtgever_contact)
                            VALUES (:opdrachtgever_name, :opdrachtgever_contact)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':opdrachtgever_name', $data['name']);
    $stmt->bindParam(':opdrachtgever_contact', $data['contact']);
    $exec = $stmt->execute();
    if ($exec) {
        echo json_encode(array("succes" => true, "inserted data" => $data, "stmt" => $stmt));
    } else {
        echo json_encode (array("succes" => false, "inserted data" => $data, "stmt" => $stmt));
    }
}

//Add a new Job
//{
//	"addNewJob": true,
//	"isYoung": 1,
//	"factuurTime": "12",
//	"factuurLink": "https://link.naar.factuur/",
//	"factuurNumber": "YON-abc",
//	"title": "Schoonmaak",
//	"worker": 0,
//	"opdrachtgever": 3,
//	"completed": 0,
//	"period": 2,
//	"start": "2020-08-14 12:30:00",
//	"end": "2020-08-14 17:30:00",
//	"rate": 14.5
//}

if (isset($data['addNewJob'])) {

    //Make a Factuur for the new Job.
    $sql = "INSERT INTO Facturen (factuur_isYoungOnes, factuur_number, factuur_time, factuur_link)
                        VALUES (:isYoung, :factuurNumber, :factuurTime, :factuurLink)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':isYoung', $data['isYoung']);
    $stmt->bindParam(':factuurNumber', $data['factuurNumber']);
    $stmt->bindParam(':factuurTime', $data['factuurTime']);
    $stmt->bindParam(':factuurLink', $data['factuurLink']);
    $exec = $stmt->execute();
    $stmt = $conn->prepare("SELECT LAST_INSERT_ID()");
    $exec = $stmt->execute();
    //ID of the newly created Factuur
    $id = $stmt->fetch(PDO::FETCH_ASSOC)[0];


    //Insert the Job
    $sql = "INSERT INTO Jobs (job_title, worker_id, opdrachtgever_id, job_completed, factuur_id, job_period, job_start, job_end, job_rate) 
                        VALUES (:title, :worker, :opdrachtgever, :completed, :factuur, :period, :start, :end, :rate)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':title', $data['title']);
    $stmt->bindParam(':worker', $data['worker']);
    $stmt->bindParam(':opdrachtgever', $data['opdrachtgever']);
    $stmt->bindParam(':completed', $data['completed']);
    $stmt->bindParam(':factuur', $id);
    $stmt->bindParam(':period', $data['period']);
    $stmt->bindParam(':start', $data['start']);
    $stmt->bindParam(':end', $data['end']);
    $stmt->bindParam(':rate', $data['rate']);
    $exec = $stmt->execute();

    //get id of inserted
    $idGetter = $conn->prepare("SELECT LAST_INSERT_ID()");
    $idGetterExec = $idGetter->execute();
    $data['id'] = $idGetter->fetch(PDO::FETCH_ASSOC)[0]; //send it with
    if ($exec) {
        echo json_encode(array("succes" => true, "insertedData" => $data, "stmt" => $stmt));
    } else {
        echo json_encode (array("succes" => false, "inserted data" => $data, "stmt" => $stmt));
    }
}