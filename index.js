const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputFolder = 'antigos/'; // Insira o caminho para a pasta que contém as imagens
const outputFolder = 'saida/'; // Insira o caminho para a pasta de saída

const blurPercentage = 20; // Insira a porcentagem de desfoque desejada

// Verifica se a pasta de saída existe, caso contrário, cria-a
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

// Lê todos os arquivos da pasta de entrada
fs.readdir(inputFolder, (err, files) => {
  if (err) {
    console.error('Erro ao ler a pasta de entrada:', err);
    return;
  }

  // Itera sobre todos os arquivos da pasta de entrada
  files.forEach(file => {
    const inputPath = path.join(inputFolder, file);
    const outputPath = path.join(outputFolder, file);

    // Verifica se o arquivo é uma imagem
    if (file.match(/\.(png|jpg|jpeg)$/i)) {
      // Aplica o efeito de blur usando a biblioteca sharp
      sharp(inputPath)
        .blur(blurPercentage)
        .toFile(outputPath, (err, info) => {
          if (err) {
            console.error('Erro ao processar a imagem:', err);
            return;
          }
          console.log(`Imagem processada: ${outputPath}`);
        });
    }
  });
});