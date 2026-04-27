<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

// GET - Buscar casos
if ($method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM casos ORDER BY data_cadastro DESC");
    $casos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($casos);
}

// POST - Criar novo caso
else if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $stmt = $pdo->prepare("
        INSERT INTO casos (nome, data, local, provincia, descricao, imagem, lat, lng, usuario_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    
    $stmt->execute([
        $data['nome'],
        $data['data'],
        $data['local'],
        $data['provincia'],
        $data['descricao'],
        $data['imagem'] ?? '',
        $data['lat'] ?? 0,
        $data['lng'] ?? 0,
        $data['usuario_id'] ?? null
    ]);
    
    echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
}

// PUT - Atualizar caso
else if ($method === 'PUT') {
    parse_str(file_get_contents('php://input'), $put);
    $id = $put['id'] ?? null;
    
    $stmt = $pdo->prepare("UPDATE casos SET status = ? WHERE id = ?");
    $stmt->execute([$put['status'], $id]);
    
    echo json_encode(['success' => true]);
}

// DELETE - Deletar caso
else if ($method === 'DELETE') {
    parse_str(file_get_contents('php://input'), $delete);
    $id = $delete['id'] ?? null;
    
    $stmt = $pdo->prepare("DELETE FROM casos WHERE id = ?");
    $stmt->execute([$id]);
    
    echo json_encode(['success' => true]);
}
?>