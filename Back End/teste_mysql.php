<?php
try {
    $pdo = new PDO("mysql:host=localhost;charset=utf8", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "✅ Conexão bem-sucedida!<br>";
    
    $stmt = $pdo->query("SHOW DATABASES");
    echo "Bancos de dados disponíveis:<br><ul>";
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "<li>" . $row['Database'] . "</li>";
    }
    echo "</ul>";
} catch(PDOException $e) {
    echo "❌ Erro: " . $e->getMessage();
}
?>