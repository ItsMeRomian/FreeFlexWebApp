<?php
$success = 0;
include "../inc.php";

get($conn, "job_id", $data, "Jobs", "worker_id");