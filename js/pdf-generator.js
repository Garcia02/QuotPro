// ===== GERAÇÃO DE PDF MELHORADA =====

// Logo da empresa em Base64 (mesma que você forneceu)
const LOGO_BASE64 = 'data:image/jpeg;base64,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';

// ✅ CONFIGURAÇÕES SEPARADAS PARA CABEÇALHO E RODAPÉ
const LOGO_CONFIG = {
    width: 50,
    height: 50,
    position: 'top-right',
    quality: 0.8,
    // Crop para cabeçalho
    crop: {
        enabled: true,
        offsetX: -8,
        offsetY: -15,
        scale: 1.2
    },
    // ✅ Crop específico para rodapé
    cropRodape: {
        enabled: true,
        offsetX: -4,
        offsetY: -4,
        scale: 1.5
    }
};

// Configurações do PDF
const PDF_CONFIG = {
    format: 'a4',
    orientation: 'portrait',
    unit: 'mm',
    margins: {
        top: 20,
        left: 20,
        right: 20,
        bottom: 20
    },
    rodape: {
        offsetContatos: 10
    },
    colors: {
        primary: '#30475e',
        secondary: '#6c89ae',
        text: '#222222',
        border: '#cccccc'
    },
    fonts: {
        title: 16,
        subtitle: 14,
        normal: 11,
        small: 9
    }
};

// ✅ FUNÇÃO MELHORADA - Adicionar logo com crop inteligente
function adicionarLogoComCrop(doc, x, y, width, height, usarCropRodape = false) {
    try {
        if (!LOGO_BASE64 || LOGO_BASE64.length < 100) return;

        const cropConfig = usarCropRodape ? LOGO_CONFIG.cropRodape : LOGO_CONFIG.crop;

        if (cropConfig.enabled) {
            const novaLargura = width * cropConfig.scale;
            const novaAltura = height * cropConfig.scale;
            const novoX = x + cropConfig.offsetX;
            const novoY = y + cropConfig.offsetY;

            doc.addImage(LOGO_BASE64, 'JPEG', novoX, novoY, novaLargura, novaAltura);

            const corFundo = usarCropRodape ? [248, 248, 248] : [255, 255, 255];
            doc.setFillColor(...corFundo);

            if (novoX < x) {
                doc.rect(novoX, novoY, x - novoX, novaAltura, 'F');
            }
            if (novoY < y) {
                doc.rect(x, novoY, width, y - novoY, 'F');
            }
            if (novoX + novaLargura > x + width) {
                doc.rect(x + width, novoY, (novoX + novaLargura) - (x + width), novaAltura, 'F');
            }
            if (novoY + novaAltura > y + height) {
                doc.rect(x, y + height, width, (novoY + novaAltura) - (y + height), 'F');
            }
        } else {
            doc.addImage(LOGO_BASE64, 'JPEG', x, y, width, height);
        }
    } catch (error) {
        console.warn('Erro ao adicionar logo:', error);
    }
}

// ✅ FUNÇÃO PRINCIPAL ATUALIZADA
function gerarPDFCompleto() {
    try {
        if (typeof window.jspdf === 'undefined') {
            alert('Erro: Biblioteca jsPDF não carregada. Verifique se o arquivo está na pasta assets/');
            return false;
        }

        if (!validarFormulario()) {
            return false;
        }

        const dados = coletarDadosFormulario();

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: PDF_CONFIG.orientation,
            unit: PDF_CONFIG.unit,
            format: PDF_CONFIG.format
        });

        // Construir o PDF
        let yPos = adicionarCabecalhoPDF(doc, dados);
        yPos = adicionarDadosClientePDF(doc, dados, yPos);
        yPos = adicionarServicosPDF(doc, dados, yPos);
        yPos = adicionarTotalPDF(doc, dados, yPos);
        yPos = adicionarObservacoesPDF(doc, dados, yPos);
        adicionarRodapePDF(doc, dados);

        const nomeArquivo = gerarNomeArquivo(dados);
        doc.save(nomeArquivo);
        limparRascunho();

        return true;

    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        alert('Erro ao gerar PDF. Verifique se todos os arquivos estão carregados corretamente.');
        return false;
    }
}

// ✅ FUNÇÃO ATUALIZADA - Coletar dados do formulário
function coletarDadosFormulario() {
    const dados = {
        // ✅ CAMPOS ATUALIZADOS CONFORME NOVO HTML
        clienteNome: document.querySelector('input[name="cliente-nome"]')?.value || '',
        clienteEmail: document.querySelector('input[name="cliente-email"]')?.value || '',
        clienteTelefone: document.querySelector('input[name="cliente-telefone"]')?.value || '',
        cidade: document.querySelector('input[name="cidade"]')?.value || '',
        unidade: document.querySelector('input[name="unidade"]')?.value || '',
        local: document.querySelector('input[name="local"]')?.value || '',
        validade: document.querySelector('input[name="validade"]')?.value || '',
        observacoes: document.querySelector('textarea[name="observacoes"]')?.value || '',
        responsavel: document.querySelector('input[name="responsavel"]')?.value || '',
        total: document.querySelector("#total-servicos-input")?.value || 'R\$ 0,00',
        servicos: []
    };

    // ✅ COLETAR SERVIÇOS DA NOVA ESTRUTURA (sem coluna Unidade)
    const linhas = document.querySelectorAll("#tabela-servicos tbody tr");
    linhas.forEach(linha => {
        const colunas = linha.querySelectorAll("td");
        if (colunas.length >= 4) {
            dados.servicos.push({
                descricao: colunas[0].textContent,  // Serviço
                valor: colunas[1].textContent,      // Valor
                quantidade: colunas[2].textContent, // Qtd.
                total: colunas[3].textContent       // Total
            });
        }
    });

    return dados;
}

// ✅ CABEÇALHO COM LOGO 50x50
function adicionarCabecalhoPDF(doc, dados) {
    const pageWidth = doc.internal.pageSize.getWidth();

    // Logo 50x50 no topo
    let logoX, logoY;

    switch (LOGO_CONFIG.position) {
        case 'top-left':
            logoX = PDF_CONFIG.margins.left;
            logoY = 3;
            break;
        case 'top-center':
            logoX = (pageWidth - LOGO_CONFIG.width) / 2;
            logoY = 3;
            break;
        case 'top-right':
        default:
            logoX = pageWidth - PDF_CONFIG.margins.right - LOGO_CONFIG.width;
            logoY = 3;
            break;
    }

    adicionarLogoComCrop(doc, logoX, logoY, LOGO_CONFIG.width, LOGO_CONFIG.height, false);

    // Título principal
    doc.setFontSize(PDF_CONFIG.fonts.title);
    doc.setTextColor(PDF_CONFIG.colors.primary);
    doc.text('PROPOSTA COMERCIAL', PDF_CONFIG.margins.left, 35);

    // Linha decorativa
    doc.setDrawColor(PDF_CONFIG.colors.primary);
    doc.setLineWidth(0.5);
    doc.line(PDF_CONFIG.margins.left, 40, pageWidth - PDF_CONFIG.margins.right, 40);

    return 50;
}

// ✅ DADOS DO CLIENTE ATUALIZADOS
function adicionarDadosClientePDF(doc, dados, yPos) {
    // Título da seção
    doc.setFontSize(PDF_CONFIG.fonts.subtitle);
    doc.setTextColor(PDF_CONFIG.colors.primary);
    doc.setFont(undefined, 'bold');
    doc.text('DADOS DO CLIENTE', PDF_CONFIG.margins.left, yPos);

    yPos += 8;

    // Dados do cliente
    doc.setFontSize(PDF_CONFIG.fonts.normal);
    doc.setTextColor(PDF_CONFIG.colors.text);

    const dadosCliente = [
        { label: 'Nome:', valor: dados.clienteNome },
        { label: 'E-mail:', valor: dados.clienteEmail },
        { label: 'Telefone:', valor: dados.clienteTelefone },
        { label: 'Cidade:', valor: dados.cidade },
        { label: 'Unidade:', valor: dados.unidade },
        { label: 'Local:', valor: dados.local }
    ];

    dadosCliente.forEach(item => {
        if (item.valor) {
            doc.setFont(undefined, 'bold');
            doc.text(item.label, PDF_CONFIG.margins.left, yPos);
            doc.setFont(undefined, 'normal');
            doc.text(item.valor, PDF_CONFIG.margins.left + 25, yPos);
            yPos += 6;
        }
    });

    return yPos + 5;
}

// ✅ SERVIÇOS ATUALIZADOS (sem coluna Unidade)
function adicionarServicosPDF(doc, dados, yPos) {
    // Título da seção
    doc.setFontSize(PDF_CONFIG.fonts.subtitle);
    doc.setTextColor(PDF_CONFIG.colors.primary);
    doc.setFont(undefined, 'bold');
    doc.text('SERVIÇOS', PDF_CONFIG.margins.left, yPos);

    yPos += 10;

    if (dados.servicos.length === 0) {
        doc.setFontSize(PDF_CONFIG.fonts.normal);
        doc.setTextColor(PDF_CONFIG.colors.text);
        doc.setFont(undefined, 'normal');
        doc.text('Nenhum serviço adicionado', PDF_CONFIG.margins.left, yPos);
        return yPos + 10;
    }

    // ✅ CONFIGURAÇÕES ATUALIZADAS (sem coluna Unidade)
    const pageWidth = doc.internal.pageSize.getWidth();
    const tableWidth = pageWidth - (PDF_CONFIG.margins.left + PDF_CONFIG.margins.right);
    const colWidths = {
        servico: tableWidth * 0.45,    // Serviço (maior espaço)
        valor: tableWidth * 0.20,      // Valor
        quantidade: tableWidth * 0.15, // Qtd.
        total: tableWidth * 0.20       // Total
    };
    const lineHeight = 5;
    const vSpacing = 2;

    // ✅ CABEÇALHO DA TABELA ATUALIZADO
    doc.setFillColor(240, 240, 240);
    doc.rect(PDF_CONFIG.margins.left, yPos, tableWidth, lineHeight + vSpacing, 'F');

    doc.setFontSize(PDF_CONFIG.fonts.normal);
    doc.setTextColor(PDF_CONFIG.colors.text);
    doc.setFont(undefined, 'bold');

    let xPos = PDF_CONFIG.margins.left + 2;
    doc.text('Serviço', xPos, yPos + lineHeight);
    xPos += colWidths.servico;
    doc.text('Valor', xPos, yPos + lineHeight);
    xPos += colWidths.valor;
    doc.text('Qtd.', xPos, yPos + lineHeight);
    xPos += colWidths.quantidade;
    doc.text('Total', xPos, yPos + lineHeight);

    yPos += lineHeight + vSpacing;

    const yTabelaTopo = yPos - (lineHeight + vSpacing);

    // ✅ LINHAS DA TABELA
    doc.setFont(undefined, 'normal');
    let totalHeight = 0;

    dados.servicos.forEach((servico, index) => {
        // Quebra de página
        if (yPos > doc.internal.pageSize.getHeight() - 30) {
            doc.addPage();
            yPos = 30;
        }

        // Split na descrição para quebra automática
        const descricaoLines = doc.splitTextToSize(servico.descricao || '', colWidths.servico - 4);
        const thisRowLines = Math.max(descricaoLines.length, 1);
        const rowHeight = thisRowLines * lineHeight + vSpacing;

        // Fundo alternado
        if (index % 2 === 0) {
            doc.setFillColor(250, 250, 250);
            doc.rect(PDF_CONFIG.margins.left, yPos, tableWidth, rowHeight, 'F');
        }

        // Conteúdo
        let x = PDF_CONFIG.margins.left + 2;
        let yText = yPos + lineHeight;

        // Serviço
        doc.text(descricaoLines, x, yText - 4, { baseline: "top" });
        x += colWidths.servico;

        // Valor
        doc.text(servico.valor || '', x, yText);
        x += colWidths.valor;

        // Quantidade
        doc.text(servico.quantidade || '1', x, yText);
        x += colWidths.quantidade;

        // Total da Linha
        doc.text(servico.total || '', x, yText);

        yPos += rowHeight;
        totalHeight += rowHeight;
    });

    // ✅ BORDAS DA TABELA
    doc.setDrawColor(PDF_CONFIG.colors.border);
    doc.setLineWidth(0.2);
    doc.rect(
        PDF_CONFIG.margins.left,
        yTabelaTopo,
        tableWidth,
        totalHeight + lineHeight + vSpacing
    );

    // Bordas internas das colunas
    let x = PDF_CONFIG.margins.left;
    
    x += colWidths.servico;
    doc.line(x, yTabelaTopo, x, yTabelaTopo + totalHeight + lineHeight + vSpacing);
    
    x += colWidths.valor;
    doc.line(x, yTabelaTopo, x, yTabelaTopo + totalHeight + lineHeight + vSpacing);
    
    x += colWidths.quantidade;
    doc.line(x, yTabelaTopo, x, yTabelaTopo + totalHeight + lineHeight + vSpacing);

    return yPos + 5;
}

// ✅ TOTAL COM POSICIONAMENTO CORRETO
function adicionarTotalPDF(doc, dados, yPos) {
    const pageWidth = doc.internal.pageSize.getWidth();

    const caixaLargura = 85;
    const caixaX = pageWidth - PDF_CONFIG.margins.right - caixaLargura;

    doc.setFillColor(PDF_CONFIG.colors.primary);
    doc.rect(caixaX, yPos, caixaLargura, 12, 'F');

    doc.setFontSize(PDF_CONFIG.fonts.subtitle);
    doc.setTextColor(255, 255, 255);
    doc.setFont(undefined, 'bold');

    const textoX = caixaX + 5;

    doc.text('TOTAL:', textoX, yPos + 8);
    doc.text(dados.total || 'R\$ 0,00', textoX + 25, yPos + 8);

    return yPos + 20;
}

// ✅ OBSERVAÇÕES
function adicionarObservacoesPDF(doc, dados, yPos) {
    if (dados.observacoes) {
        // Título
        doc.setFontSize(PDF_CONFIG.fonts.subtitle);
        doc.setTextColor(PDF_CONFIG.colors.primary);
        doc.setFont(undefined, 'bold');
        doc.text('OBSERVAÇÕES', PDF_CONFIG.margins.left, yPos);

        yPos += 8;

        // Conteúdo
        doc.setFontSize(PDF_CONFIG.fonts.normal);
        doc.setTextColor(PDF_CONFIG.colors.text);
        doc.setFont(undefined, 'normal');

        const linhas = doc.splitTextToSize(dados.observacoes, 170);
        doc.text(linhas, PDF_CONFIG.margins.left, yPos);

        yPos += linhas.length * 5;
    }

    if (dados.validade) {
        yPos += 5;
        doc.setFontSize(PDF_CONFIG.fonts.normal);
        doc.setTextColor(PDF_CONFIG.colors.text);
        doc.setFont(undefined, 'bold');
        doc.text('Validade:', PDF_CONFIG.margins.left, yPos);
        doc.setFont(undefined, 'normal');
        doc.text(dados.validade, PDF_CONFIG.margins.left + 25, yPos);
    }

    return yPos;
}

// ✅ RODAPÉ COM LINKS CLICÁVEIS
function adicionarRodapePDF(doc, dados) {
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();

    const rodapeY = pageHeight - 35;
    const areaUtil = pageWidth - (PDF_CONFIG.margins.left + PDF_CONFIG.margins.right);

    // Fundo sutil
    doc.setFillColor(248, 248, 248);
    doc.rect(PDF_CONFIG.margins.left, rodapeY, areaUtil, 30, 'F');

    // Linha superior
    doc.setDrawColor(PDF_CONFIG.colors.primary);
    doc.setLineWidth(0.3);
    doc.line(PDF_CONFIG.margins.left, rodapeY, pageWidth - PDF_CONFIG.margins.right, rodapeY);

    // Logo
    const logoRodapeSize = 15;
    const logoRodapeX = PDF_CONFIG.margins.left + 5;
    const logoRodapeY = rodapeY + 5;
    adicionarLogoComCrop(doc, logoRodapeX, logoRodapeY, logoRodapeSize, logoRodapeSize, true);

    // Informações da empresa
    const textoX = PDF_CONFIG.margins.left + 25;

    doc.setFontSize(PDF_CONFIG.fonts.normal);
    doc.setTextColor(PDF_CONFIG.colors.primary);
    doc.setFont(undefined, 'bold');
    doc.text('Lara Engenharia', textoX, rodapeY + 8);

    doc.setFontSize(PDF_CONFIG.fonts.small);
    doc.setTextColor(PDF_CONFIG.colors.text);
    doc.setFont(undefined, 'normal');
    doc.text('Especializada em drywall e serviços civis.', textoX, rodapeY + 13);

    // ✅ FUNÇÃO AUXILIAR PARA LINKS CLICÁVEIS
    function criarLinkClicavel(texto, url, yPos) {
        const posicaoX = pageWidth - PDF_CONFIG.margins.right - PDF_CONFIG.rodape.offsetContatos;

        // Texto em azul
        doc.setTextColor(0, 102, 204);
        doc.setFont(undefined, 'normal');
        doc.text(texto, posicaoX, yPos, { align: 'right' });

        // Calcular área do link
        const textWidth = doc.getTextWidth(texto);
        const textX = posicaoX - textWidth;

        // Linha sublinhada para indicar link
        doc.setDrawColor(0, 102, 204);
        doc.setLineWidth(0.1);
        doc.line(textX, yPos + 0.5, textX + textWidth, yPos + 0.5);

        // Adicionar link clicável
        doc.link(textX, yPos - 3, textWidth, 4, { url: url });
    }

    // ✅ APLICAR LINKS
    doc.setFontSize(PDF_CONFIG.fonts.small - 1);

    // E-mail
    criarLinkClicavel(
        'Email: contatolaraengenharia@gmail.com',
        'mailto:contatolaraengenharia@gmail.com?subject=Contato%20via%20Proposta%20Comercial',
        rodapeY + 8
    );

    // Instagram
    criarLinkClicavel(
        'Instagram: @laraengenharia_',
        'https://instagram.com/laraengenharia_',
        rodapeY + 13.5
    );

    // WhatsApp
    const mensagemWhats = encodeURIComponent('Olá! Vi sua proposta comercial e gostaria de mais informações.');
    criarLinkClicavel(
        'WhatsApp: (15) 99714-0338',
        `https://wa.me/5515997140338?text=${mensagemWhats}`,
        rodapeY + 19
    );

    // Data/hora e responsável (sem link)
    const dataGeracao = new Date().toLocaleDateString('pt-BR');
    const horaGeracao = new Date().toLocaleTimeString('pt-BR');

    doc.setFontSize(PDF_CONFIG.fonts.small - 1);
    doc.setTextColor(PDF_CONFIG.colors.secondary);
    doc.text(`Proposta gerada em ${dataGeracao} às ${horaGeracao}`, pageWidth / 2, rodapeY + 22, { align: 'center' });
    
    if (dados.responsavel) {
        doc.text(`Responsável: ${dados.responsavel}`, pageWidth / 2, rodapeY + 26, { align: 'center' });
    }
}

// ✅ GERAR NOME DO ARQUIVO
function gerarNomeArquivo(dados) {
    const data = new Date().toISOString().slice(0, 10);
    let nomeBase = 'Proposta';
    
    if (dados.clienteNome) {
        nomeBase += `_${dados.clienteNome.replace(/\s+/g, '_')}`;
    } else if (dados.cidade) {
        nomeBase += `_${dados.cidade.replace(/\s+/g, '_')}`;
    }
    
    return `${nomeBase}_${data}.pdf`;
}

// ✅ MOSTRAR LOADING
function mostrarLoading(mostrar = true) {
    const botao = document.querySelector('button[type="submit"]');
    if (botao) {
        if (mostrar) {
            botao.innerHTML = '⏳ Gerando PDF...';
            botao.disabled = true;
            botao.classList.add('form-loading');
        } else {
            botao.innerHTML = '📄 Gerar Orçamento em PDF';
            botao.disabled = false;
            botao.classList.remove('form-loading');
        }
    }
}