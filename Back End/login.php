<?php
require_once 'config.php';

// Pegar os dados enviados
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(['erro' => 'Nenhum dado recebido']);
    exit;
}

$email = $data['email'] ?? '';
$senha = $data['senha'] ?? '';

if (empty($email) || empty($senha)) {
    echo json_encode(['erro' => 'Preencha todos os campos']);
    exit;
}

// Buscar usuário no banco de dados
$stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = ? AND status = 'ativo'");
$stmt->execute([$email]);
$usuario = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$usuario) {
    echo json_encode(['erro' => 'Email ou senha inválidos']);
    exit;
}

// Verificar senha
if (password_verify($senha, $usuario['senha'])) {
    // Registrar log de login
    try {
        $logStmt = $pdo->prepare("INSERT INTO logs (usuario_id, acao, detalhes, ip) VALUES (?, ?, ?, ?)");
        $logStmt->execute([$usuario['id'], 'login', "Usuário {$usuario['tipo']} fez login", $_SERVER['REMOTE_ADDR']]);
    } catch (Exception $e) {
        // Se a tabela de logs não existir, ignorar erro
    }
    
    // Remover senha do retorno
    unset($usuario['senha']);
    
    echo json_encode([
        'success' => true,
        'usuario' => $usuario,
        'tipo' => $usuario['tipo']
    ]);
} else {
    echo json_encode(['erro' => 'Email ou senha inválidos']);
}
?>