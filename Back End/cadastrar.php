<?php
require_once 'config.php';

// Pegar os dados enviados
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(['erro' => 'Nenhum dado recebido']);
    exit;
}

$nome = $data['nome'] ?? '';
$email = $data['email'] ?? '';
$senha = $data['senha'] ?? '';
$telefone = $data['telefone'] ?? '';
$provincia = $data['provincia'] ?? '';

// Validar campos obrigatórios
if (empty($nome) || empty($email) || empty($senha)) {
    echo json_encode(['erro' => 'Preencha os campos obrigatórios']);
    exit;
}

// Verificar se email já existe
$stmt = $pdo->prepare("SELECT id FROM usuarios WHERE email = ?");
$stmt->execute([$email]);

if ($stmt->fetch()) {
    echo json_encode(['erro' => 'Email já cadastrado']);
    exit;
}

// Criptografar senha
$senhaHash = password_hash($senha, PASSWORD_DEFAULT);

// Inserir usuário
$stmt = $pdo->prepare("INSERT INTO usuarios (nome, email, senha, telefone, provincia, tipo, status) VALUES (?, ?, ?, ?, ?, 'usuario', 'ativo')");

if ($stmt->execute([$nome, $email, $senhaHash, $telefone, $provincia])) {
    echo json_encode(['success' => true, 'id' => $pdo->lastInsertId(), 'mensagem' => 'Usuário cadastrado com sucesso!']);
} else {
    echo json_encode(['erro' => 'Erro ao cadastrar usuário']);
}
?>