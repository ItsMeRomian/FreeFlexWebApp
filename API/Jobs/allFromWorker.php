<?php
$success = 0;
include "../inc.php";

get($conn, "job_date", $data, "Jobs", "worker_id");