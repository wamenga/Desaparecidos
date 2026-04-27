<?php
// Configuração do banco de dados
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// Configurações do banco
$host = 'localhost';
$dbname = 'busque_desaparecidos';
$username = 'root';
$password = ''; // XAMPP usa senha vazia, WAMP também

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // echo json_encode(['status' => 'conectado']); // Descomente para testar
} catch(PDOException $e) {
    echo json_encode(['erro' => 'Erro de conexão com o banco: ' . $e->getMessage()]);
    exit;
}
?>