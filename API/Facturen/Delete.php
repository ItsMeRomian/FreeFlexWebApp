<?php
$success = 0;
include "../inc.php";

echo (delete($conn, $data, "Facturen", "factuur_id", $data['id']));
