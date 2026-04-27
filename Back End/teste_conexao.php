<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

echo json_encode([
    'status' => 'online',
    'mensagem' => 'Backend está rodando corretamente!',
    'data' => date('Y-m-d H:i:s')
]);
?>