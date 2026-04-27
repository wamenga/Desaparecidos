<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

// Estatísticas para o admin
if ($method === 'GET' && isset($_GET['stats'])) {
    $stats = [];
    
    // Total de casos
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM casos");
    $stats['total_casos'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];
    
    // Casos por status
    $stmt = $pdo->query("SELECT status, COUNT(*) as total FROM casos GROUP BY status");
    $stats['por_status'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Total de usuários
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM usuarios");
    $stats['total_usuarios'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];
    
    // Total de comentários
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM comentarios");
    $stats['total_comentarios'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];
    
    // Denúncias pendentes
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM denuncias WHERE status = 'pendente'");
    $stats['denuncias_pendentes'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];
    
    echo json_encode($stats);
}

// Buscar todos os usuários
else if ($method === 'GET' && isset($_GET['usuarios'])) {
    $stmt = $pdo->query("SELECT id, nome, email, telefone, provincia, tipo, status, data_cadastro FROM usuarios ORDER BY data_cadastro DESC");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}

// Bloquear/Desbloquear usuário
else if ($method === 'PUT' && isset($_GET['bloquear'])) {
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $pdo->prepare("UPDATE usuarios SET status = ? WHERE id = ?");
    $stmt->execute([$data['status'], $data['id']]);
    echo json_encode(['success' => true]);
}

// Buscar logs
else if ($method === 'GET' && isset($_GET['logs'])) {
    $stmt = $pdo->query("SELECT l.*, u.nome as usuario_nome FROM logs l LEFT JOIN usuarios u ON l.usuario_id = u.id ORDER BY l.data DESC LIMIT 50");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}

// Aprovar/Recusar denúncia
else if ($method === 'POST' && isset($_GET['denuncia'])) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if ($data['acao'] === 'aprovar') {
        // Mover denúncia para casos
        $stmt = $pdo->prepare("SELECT * FROM denuncias WHERE id = ?");
        $stmt->execute([$data['id']]);
        $denuncia = $stmt->fetch(PDO::FETCH_ASSOC);
        
        $stmt = $pdo->prepare("
            INSERT INTO casos (nome, data, local, provincia, descricao, imagem) 
            VALUES (?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $denuncia['nome_desaparecido'],
            $denuncia['data_desaparecimento'],
            $denuncia['local'],
            $denuncia['provincia'],
            $denuncia['informacoes'],
            $denuncia['imagem']
        ]);
        
        $stmt = $pdo->prepare("UPDATE denuncias SET status = 'aprovado' WHERE id = ?");
        $stmt->execute([$data['id']]);
        
        echo json_encode(['success' => true, 'mensagem' => 'Denúncia aprovada e publicada']);
    } else {
        $stmt = $pdo->prepare("UPDATE denuncias SET status = 'recusado' WHERE id = ?");
        $stmt->execute([$data['id']]);
        echo json_encode(['success' => true, 'mensagem' => 'Denúncia recusada']);
    }
}
?>