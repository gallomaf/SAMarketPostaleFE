<?php

// Consente le richieste da qualunque dominio (può essere personalizzato con un dominio specifico)
header("Access-Control-Allow-Origin: *");

// Se vuoi consentire solo un dominio specifico, sostituisci * con il dominio esatto
// header("Access-Control-Allow-Origin: https://spedireadesso.com");

// Le altre intestazioni necessarie per le richieste CORS
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

header('Content-Type: application/json');

// Imposta la directory di destinazione
$targetDir = 'uploads/'; // Assicurati che la directory "uploads" esista e sia scrivibile

// Verifica se la directory esiste, altrimenti creala
if (!is_dir($targetDir)) {
    mkdir($targetDir, 0755, true);
}

// Verifica se il metodo della richiesta è POST e se il file è stato inviato
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['file'])) {
    $fileName = basename($_FILES['file']['name']);

    //rinomina il file con un nome univoco
    $fileName = uniqid() . '_' . $fileName;
    $targetFilePath = $targetDir . $fileName;
    //rimuovi gli spazi dal nome del file
    $targetFilePath = str_replace(' ', '_', $targetFilePath);

    //scrivi la stringa "CIAO" in un file di testo chiamato log.txt
    //$file = fopen("log.txt", "w");
    //fwrite($file, "CIAO2");
    //fclose($file);

    // Verifica che il file sia caricato senza errori
    if (move_uploaded_file($_FILES['file']['tmp_name'], $targetFilePath)) {
        // Risposta in caso di successo, con il nome univoco del file
        echo json_encode([
            'message' => 'File caricato con successo',
            'fileName' => $fileName, // Nome univoco del file
            'fileSize' => $_FILES['file']['size'] // Dimensione del file in byte
        ]);
    }
    else {
        // Risposta in caso di errore
        http_response_code(500);
        echo json_encode(['message' => 'Errore durante il caricamento del file']);
    }
} else {
    // Risposta in caso di richiesta non valida
    http_response_code(400);
    echo json_encode(['message' => 'Nessun file inviato']);
}
?>
