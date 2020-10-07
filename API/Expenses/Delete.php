<?php
$success = 0;
include "../inc.php";

echo delete($conn, $data, "Expenses", "expense_id", $data['id']);