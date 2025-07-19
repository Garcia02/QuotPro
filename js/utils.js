// ===== FUNÇÕES UTILITÁRIAS CORRIGIDAS =====

// ✅ FORMATAÇÃO MONETÁRIA MELHORADA
function formatarMoeda(valor) {
    let numero;
    
    if (typeof valor === 'string') {
        numero = parseFloat(valor.replace(/[R\$\s.]/g, '').replace(",", "."));
    } else {
        numero = valor;
    }

    if (isNaN(numero) || numero === null || numero === undefined) {
        return "R\$ 0,00";
    }

    return numero.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// ✅ EXTRAIR VALOR NUMÉRICO MELHORADO
function extrairValorNumerico(valorMonetario) {
    if (!valorMonetario) return 0;
    
    const valorString = String(valorMonetario);
    
    // ✅ TRATAR DIFERENTES FORMATOS
    let numeroLimpo = valorString
        .replace(/[R\$\s]/g, '')  // Remove R\$, espaços
        .replace(/\./g, '')       // Remove pontos (milhares)
        .replace(',', '.');       // Troca vírgula por ponto

    // ✅ SE CONTÉM APENAS NÚMEROS E UM PONTO, É DECIMAL
    if (/^\d+\.?\d*$/.test(numeroLimpo)) {
        const resultado = parseFloat(numeroLimpo);
        return isNaN(resultado) ? 0 : resultado;
    }
    
    return 0;
}

// ✅ MÁSCARA MONETÁRIA REMOVIDA (CAUSAVA PROBLEMAS)
function aplicarMascaraMonetaria(elemento) {
    // ✅ FUNÇÃO VAZIA - NÃO APLICAR MÁSCARA RESTRITIVA
    // A formatação será feita apenas no blur via main.js
    console.log('Máscara monetária desabilitada para melhor UX');
}

// ✅ DEBOUNCE OTIMIZADO
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ✅ VALIDAÇÃO COMPLETA ATUALIZADA
function validarFormulario() {
    const camposObrigatorios = [
        { selector: 'input[name="cidade"]', nome: 'Cidade' },
        { selector: 'input[name="unidade"]', nome: 'Unidade' },
        { selector: 'input[name="local"]', nome: 'Local' },
        { selector: 'input[name="responsavel"]', nome: 'Responsável' }
    ];

    // ✅ VALIDAR CAMPOS OBRIGATÓRIOS
    for (const campo of camposObrigatorios) {
        const elemento = document.querySelector(campo.selector);
        if (!elemento || !elemento.value.trim()) {
            alert(`Campo "${campo.nome}" é obrigatório!`);
            if (elemento) elemento.focus();
            return false;
        }
    }

    // ✅ VALIDAR EMAIL SE PREENCHIDO
    const emailInput = document.querySelector('input[name="cliente-email"]');
    if (emailInput && emailInput.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            alert('E-mail inválido!');
            emailInput.focus();
            return false;
        }
    }

    // ✅ VALIDAR SERVIÇOS
    const servicos = document.querySelectorAll("#tabela-servicos tbody tr");
    if (servicos.length === 0) {
        alert("Adicione pelo menos um serviço!");
        document.getElementById("descricao-servico").focus();
        return false;
    }

    return true;
}

// ✅ VALIDAR CAMPOS DE SERVIÇO
function validarCamposServico() {
    const desc = document.getElementById("descricao-servico").value.trim();
    const val = document.getElementById("valor-servico").value.trim();
    const qtd = document.getElementById("quantidade-servico").value.trim();

    if (!desc) {
        return { valido: false, mensagem: "Descrição é obrigatória", campo: "descricao-servico" };
    }

    if (!val || extrairValorNumerico(val) <= 0) {
        return { valido: false, mensagem: "Valor deve ser maior que zero", campo: "valor-servico" };
    }

    if (!qtd || parseFloat(qtd) <= 0) {
        return { valido: false, mensagem: "Quantidade deve ser maior que zero", campo: "quantidade-servico" };
    }

    return { valido: true };
}

// ✅ MOSTRAR LOADING NOS BOTÕES
function mostrarLoading(mostrar = true) {
    const botaoSubmit = document.querySelector('button[type="submit"]');
    const botaoLimpar = document.querySelector('button[onclick="limparFormulario()"]');
    
    if (mostrar) {
        if (botaoSubmit) {
            botaoSubmit.innerHTML = '⏳ Gerando PDF...';
            botaoSubmit.disabled = true;
            botaoSubmit.classList.add('form-loading');
        }
        if (botaoLimpar) {
            botaoLimpar.disabled = true;
        }
    } else {
        if (botaoSubmit) {
            botaoSubmit.innerHTML = '📄 Gerar Orçamento em PDF';
            botaoSubmit.disabled = false;
            botaoSubmit.classList.remove('form-loading');
        }
        if (botaoLimpar) {
            botaoLimpar.disabled = false;
        }
    }
}

// ✅ SCROLL SUAVE PARA ELEMENTO
function scrollParaElemento(seletor) {
    const elemento = document.querySelector(seletor);
    if (elemento) {
        elemento.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }
}

// ✅ COPIAR TEXTO PARA CLIPBOARD
function copiarParaClipboard(texto) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(texto).then(() => {
            console.log('Texto copiado para clipboard');
        });
    } else {
        const textArea = document.createElement('textarea');
        textArea.value = texto;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

// ✅ FORMATAR NÚMERO PARA ENTRADA
function formatarNumeroParaEntrada(valor) {
    if (!valor) return '';
    
    const numero = extrairValorNumerico(valor);
    if (numero === 0) return '';
    
    // Retorna número simples para edição
    return numero.toString().replace('.', ',');
}

// ✅ VALIDAR ENTRADA NUMÉRICA
function validarEntradaNumerica(input, permitirDecimal = true) {
    input.addEventListener('keypress', function(e) {
        const char = e.key;
        const valor = e.target.value;
        
        // Permitir teclas especiais
        if (['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(char)) {
            return;
        }
        
        // Permitir números
        if (/\d/.test(char)) {
            return;
        }
        
        // Permitir vírgula/ponto decimal (apenas um)
        if (permitirDecimal && (char === ',' || char === '.') && !valor.includes(',') && !valor.includes('.')) {
            return;
        }
        
        // Bloquear outros caracteres
        e.preventDefault();
    });
}