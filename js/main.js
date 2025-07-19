// ===== FUNÇÃO PARA ADICIONAR SERVIÇO =====
function adicionarServico() {
    const desc = document.getElementById("descricao-servico").value.trim();
    const val = document.getElementById("valor-servico").value.trim();
    const qtd = document.getElementById("quantidade-servico").value.trim();

    // ✅ VALIDAÇÕES ATUALIZADAS
    if (!desc) {
        alert("Preencha a descrição do serviço!");
        document.getElementById("descricao-servico").focus();
        return;
    }

    // ✅ VALIDAÇÃO MELHORADA PARA VALOR
    const valorNumerico = extrairValorNumerico(val);
    if (!val || valorNumerico <= 0) {
        alert("Preencha um valor válido maior que zero!");
        document.getElementById("valor-servico").focus();
        return;
    }

    if (!qtd || parseFloat(qtd) <= 0) {
        alert("Preencha uma quantidade válida!");
        document.getElementById("quantidade-servico").focus();
        return;
    }

    // ✅ CÁLCULOS ATUALIZADOS
    const quantidade = parseFloat(qtd);
    const totalLinha = valorNumerico * quantidade;

    // ✅ FORMATAÇÃO MONETÁRIA
    const valorFormatado = formatarMoeda(valorNumerico);
    const totalFormatado = formatarMoeda(totalLinha);

    // ✅ MOSTRAR TABELA
    const tabela = document.getElementById("tabela-servicos");
    tabela.style.display = "table";

    const tbody = tabela.querySelector("tbody");
    const row = document.createElement("tr");

    // ✅ NOVA ESTRUTURA DA TABELA (sem coluna Unidade)
    row.innerHTML = `
        <td>${desc}</td>
        <td>${valorFormatado}</td>
        <td>${quantidade}</td>
        <td>${totalFormatado}</td>
        <td><button type="button" class="btn-danger remove-servico-btn">×</button></td>
    `;

    tbody.appendChild(row);

    // ✅ LIMPAR INPUTS
    document.getElementById("descricao-servico").value = "";
    document.getElementById("valor-servico").value = "";
    document.getElementById("quantidade-servico").value = "";

    // ✅ EVENT LISTENER PARA REMOVER
    row.querySelector(".remove-servico-btn").addEventListener("click", function () {
        row.remove();
        if (tbody.rows.length === 0) {
            tabela.style.display = "none";
        }
        atualizarTotal();
        atualizarResumo();
        salvarRascunho();
    });

    atualizarTotal();
    atualizarResumo();
    salvarRascunho();
}

// ✅ FUNÇÃO AUXILIAR PARA ADICIONAR SERVIÇO NA TABELA
function adicionarServicoNaTabela(descricao, valor, quantidade, total) {
    const tabela = document.getElementById("tabela-servicos");
    const tbody = tabela.querySelector("tbody");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${descricao}</td>
        <td>${valor}</td>
        <td>${quantidade}</td>
        <td>${total}</td>
        <td><button type="button" class="btn-danger remove-servico-btn">×</button></td>
    `;

    tbody.appendChild(row);
    tabela.style.display = "table";

    // Event listener para remover
    row.querySelector(".remove-servico-btn").addEventListener("click", function () {
        row.remove();
        if (tbody.rows.length === 0) {
            tabela.style.display = "none";
        }
        atualizarTotal();
        atualizarResumo();
        salvarRascunho();
    });
}

// ✅ ATUALIZAR TOTAL - CORRIGIDO PARA NOVA ESTRUTURA
function atualizarTotal() {
    const tabela = document.querySelector("#tabela-servicos tbody");
    const linhas = tabela.querySelectorAll("tr");

    let total = 0;

    linhas.forEach((linha) => {
        // ✅ COLUNA 4 = TOTAL (era coluna 5 antes)
        const valorCelula = linha.querySelector("td:nth-child(4)");
        if (valorCelula) {
            total += extrairValorNumerico(valorCelula.textContent);
        }
    });

    // ✅ ATUALIZAR CAMPO DE TOTAL
    const totalInput = document.querySelector("#total-servicos-input");
    totalInput.value = formatarMoeda(total);

    return total;
}

// ✅ NOVA FUNÇÃO - Atualizar resumo lateral
function atualizarResumo() {
    const total = atualizarTotal();
    const linhas = document.querySelectorAll("#tabela-servicos tbody tr");

    // ✅ ATUALIZAR ELEMENTOS DO RESUMO
    const subtotalDisplay = document.getElementById("subtotal-display");
    const totalDisplay = document.getElementById("total-display");
    const servicesCount = document.getElementById("services-count");

    if (subtotalDisplay) subtotalDisplay.textContent = formatarMoeda(total);
    if (totalDisplay) totalDisplay.textContent = formatarMoeda(total);
    if (servicesCount) servicesCount.textContent = linhas.length;
}

// ✅ FUNÇÃO MANUAL TOTAL INPUT - SIMPLIFICADA
function manualTotalInput() {
    const totalInput = document.querySelector("#total-servicos-input");
    const valorNumerico = extrairValorNumerico(totalInput.value);

    if (isNaN(valorNumerico) && totalInput.value !== "") {
        totalInput.style.borderColor = "var(--danger)";
        totalInput.title = "Formato inválido - Use apenas números";
        return false;
    } else {
        totalInput.style.borderColor = "";
        totalInput.title = "";
        atualizarResumo();
        return true;
    }
}

// ✅ FUNÇÃO PARA LIMPAR FORMULÁRIO
function limparFormulario() {
    if (confirm("Tem certeza que deseja limpar todos os dados?")) {
        // Limpar campos
        document.getElementById("orcamento-form").reset();
        
        // Limpar tabela
        const tbody = document.querySelector("#tabela-servicos tbody");
        tbody.innerHTML = "";
        document.getElementById("tabela-servicos").style.display = "none";
        
        // Limpar total
        document.getElementById("total-servicos-input").value = "";
        
        // Limpar resumo
        atualizarResumo();
        
        // Limpar storage
        limparRascunho();
        
        alert("Formulário limpo com sucesso!");
    }
}

// ✅ FUNÇÃO PARA GERAR PDF
function gerarPDF() {
    mostrarLoading(true);

    setTimeout(() => {
        const sucesso = gerarPDFCompleto();
        mostrarLoading(false);

        if (sucesso) {
            alert('PDF gerado com sucesso!');
        }
    }, 100);
}

// ✅ INICIALIZAÇÃO CORRIGIDA
document.addEventListener('DOMContentLoaded', function () {
    console.log('QuotePro iniciado!');

    // ✅ CONFIGURAR CAMPO VALOR SEM MÁSCARA RESTRITIVA
    const campoValor = document.getElementById('valor-servico');
    if (campoValor) {
        campoValor.placeholder = "Ex: 150 ou 150.50";
        campoValor.setAttribute('inputmode', 'decimal');
        
        // ✅ FORMATAÇÃO APENAS NO BLUR
        campoValor.addEventListener('blur', function(e) {
            const valor = e.target.value.trim();
            if (valor) {
                const numeroValor = extrairValorNumerico(valor);
                if (!isNaN(numeroValor) && numeroValor > 0) {
                    e.target.value = formatarMoeda(numeroValor);
                    e.target.style.borderColor = "";
                    e.target.title = "";
                } else {
                    e.target.style.borderColor = "var(--danger)";
                    e.target.title = "Digite um valor válido";
                }
            }
        });

        // ✅ REMOVER ERRO DURANTE DIGITAÇÃO
        campoValor.addEventListener('input', function(e) {
            e.target.style.borderColor = "";
            e.target.title = "";
        });
    }

    // ✅ CARREGAR RASCUNHO
    carregarRascunho();

    // ✅ ATUALIZAR RESUMO INICIAL
    atualizarResumo();

    // ✅ SALVAR AUTOMATICAMENTE
    const campos = document.querySelectorAll('input, textarea');
    campos.forEach(campo => {
        campo.addEventListener('input', debounce(salvarRascunho, 1000));
    });

    // ✅ LISTENER DO FORMULÁRIO
    document.getElementById('orcamento-form').addEventListener('submit', function (e) {
        e.preventDefault();
        gerarPDF();
    });

    // ✅ LISTENER PARA ENTER NOS CAMPOS DE SERVIÇO
    const camposServico = ['descricao-servico', 'valor-servico', 'quantidade-servico'];
    camposServico.forEach(id => {
        const campo = document.getElementById(id);
        if (campo) {
            campo.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    adicionarServico();
                }
            });
        }
    });
});