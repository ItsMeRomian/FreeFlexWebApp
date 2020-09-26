<?php
$success = 0;
include "../inc.php";

echo delete($conn, $data, "Workers", "worker_id", $data['id']);