<?php
$success = 0;
include "../inc.php";

echo delete($conn, $data, "Opdrachtgevers", "opdrachtgever_id", $data['id']);