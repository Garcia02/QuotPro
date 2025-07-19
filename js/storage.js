// ===== GERENCIAMENTO DE RASCUNHOS =====

const STORAGE_KEY = 'quotepro_orcamento_v2';

// ✅ SALVAR RASCUNHO
function salvarRascunho() {
    try {
        const dados = coletarDadosFormulario();
        dados.ultimaSalvamento = new Date().toISOString();
        dados.versao = '2.0';

        localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
        return true;
    } catch (error) {
        console.error('Erro ao salvar rascunho:', error);
        return false;
    }
}

// ✅ CARREGAR RASCUNHO
function carregarRascunho() {
    try {
        const dadosSalvos = localStorage.getItem(STORAGE_KEY);

        if (!dadosSalvos) {
            console.log('Nenhum rascunho encontrado');
            return false;
        }

        const dados = JSON.parse(dadosSalvos);
        
        if (!dados.versao || dados.versao !== '2.0') {
            console.log('Rascunho de versão antiga encontrado, ignorando...');
            limparRascunho();
            return false;
        }

        restaurarDadosFormulario(dados);
        return true;

    } catch (error) {
        console.error('Erro ao carregar rascunho:', error);
        limparRascunho();
        return false;
    }
}

// ✅ LIMPAR RASCUNHO
function limparRascunho() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('lara_engenharia_orcamento');
}

// ✅ COLETAR DADOS DO FORMULÁRIO
function coletarDadosFormulario() {
    const dados = {
        clienteNome: document.querySelector('input[name="cliente-nome"]')?.value || '',
        clienteEmail: document.querySelector('input[name="cliente-email"]')?.value || '',
        clienteTelefone: document.querySelector('input[name="cliente-telefone"]')?.value || '',
        cidade: document.querySelector('input[name="cidade"]')?.value || '',
        unidade: document.querySelector('input[name="unidade"]')?.value || '',
        local: document.querySelector('input[name="local"]')?.value || '',
        validade: document.querySelector('input[name="validade"]')?.value || '',
        observacoes: document.querySelector('textarea[name="observacoes"]')?.value || '',
        responsavel: document.querySelector('input[name="responsavel"]')?.value || '',
        total: document.querySelector("#total-servicos-input")?.value || '',
        servicos: []
    };

    const linhas = document.querySelectorAll("#tabela-servicos tbody tr");
    linhas.forEach(linha => {
        const colunas = linha.querySelectorAll("td");
        if (colunas.length >= 4) {
            dados.servicos.push({
                descricao: colunas[0].textContent,
                valor: colunas[1].textContent,
                quantidade: colunas[2].textContent,
                total: colunas[3].textContent
            });
        }
    });

    return dados;
}

// ✅ RESTAURAR DADOS NO FORMULÁRIO
function restaurarDadosFormulario(dados) {
    const campos = {
        'input[name="cliente-nome"]': dados.clienteNome,
        'input[name="cliente-email"]': dados.clienteEmail,
        'input[name="cliente-telefone"]': dados.clienteTelefone,
        'input[name="cidade"]': dados.cidade,
        'input[name="unidade"]': dados.unidade,
        'input[name="local"]': dados.local,
        'input[name="validade"]': dados.validade,
        'textarea[name="observacoes"]': dados.observacoes,
        'input[name="responsavel"]': dados.responsavel,
        '#total-servicos-input': dados.total
    };

    Object.entries(campos).forEach(([selector, valor]) => {
        const elemento = document.querySelector(selector);
        if (elemento && valor) {
            elemento.value = valor;
        }
    });

    if (dados.servicos && dados.servicos.length > 0) {
        const tabela = document.getElementById("tabela-servicos");
        const tbody = tabela.querySelector("tbody");

        tbody.innerHTML = '';

        dados.servicos.forEach(servico => {
            adicionarServicoNaTabela(
                servico.descricao,
                servico.valor,
                servico.quantidade,
                servico.total
            );
        });

        tabela.style.display = "table";
    }

    setTimeout(() => {
        atualizarResumo();
    }, 100);
}