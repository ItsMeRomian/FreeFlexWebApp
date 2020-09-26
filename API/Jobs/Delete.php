<?php
$success = 0;
include "../inc.php";

echo (delete($conn, $data, "Jobs", "job_id", $data['id']));
