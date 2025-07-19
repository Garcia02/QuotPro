/**
 * ===== SISTEMA DE SEGURANÇA - LARA ENGENHARIA =====
 * 
 * Este arquivo contém todas as funcionalidades relacionadas à segurança:
 * - Sanitização de dados
 * - Validação de formulários
 * - Proteção contra ataques
 * - Rate limiting
 * 
 * @author Lara Engenharia
 * @version 1.0.0
 */

// ===== SANITIZAÇÃO DE DADOS =====
class DataSanitizer {
    
    /**
     * Sanitização básica - remove caracteres perigosos
     * @param {string} input - Texto a ser sanitizado
     * @returns {string} - Texto limpo
     */
    static sanitizeBasic(input) {
        if (typeof input !== 'string') return '';
        
        return input
            .replace(/[<>]/g, '')           // Remove < e >
            .replace(/['"]/g, '')          // Remove aspas
            .replace(/javascript:/gi, '')   // Remove javascript:
            .replace(/on\w+=/gi, '')       // Remove eventos (onclick=, etc)
            .replace(/{|}/g, '')        // Remove chaves
            .trim()
            .substring(0, 500);            // Limita tamanho
    }
    
    /**
     * Sanitização para campos monetários
     * @param {string} input - Valor monetário
     * @returns {string} - Valor limpo
     */
    static sanitizeMoney(input) {
        if (typeof input !== 'string') return 'R\$ 0,00';
        
        // Permite apenas números, vírgulas, pontos, R\$ e espaços
        const cleaned = input.replace(/[^0-9,.\sR$]/g, '');
        return cleaned.substring(0, 20); // Limita tamanho
    }
    
    /**
     * Sanitização para números
     * @param {string} input - Número como string
     * @returns {string} - Número limpo
     */
    static sanitizeNumber(input) {
        if (typeof input !== 'string') return '0';
        
        const cleaned = input.replace(/[^0-9.,]/g, '');
        return cleaned.substring(0, 10);
    }
    
    /**
     * Sanitização para texto longo (observações)
     * @param {string} input - Texto longo
     * @returns {string} - Texto limpo
     */
    static sanitizeLongText(input) {
        if (typeof input !== 'string') return '';
        
        return input
            .replace(/[<>]/g, '')
            .replace(/javascript:/gi, '')
            .replace(/on\w+=/gi, '')
            .replace(/{|}/g, '')
            .trim()
            .substring(0, 2000); // Limite maior para observações
    }
    
    /**
     * Sanitização para nomes de pessoas
     * @param {string} input - Nome da pessoa
     * @returns {string} - Nome limpo
     */
    static sanitizeName(input) {
        if (typeof input !== 'string') return '';
        
        return input
            .replace(/[^a-zA-ZÀ-ÿ\s.]/g, '') // Apenas letras, espaços e pontos
            .replace(/\s+/g, ' ')             // Remove espaços duplos
            .trim()
            .substring(0, 100);
    }
    
    /**
     * Sanitização para cidades/locais
     * @param {string} input - Nome da cidade/local
     * @returns {string} - Nome limpo
     */
    static sanitizeLocation(input) {
        if (typeof input !== 'string') return '';
        
        return input
            .replace(/[^a-zA-ZÀ-ÿ\s-]/g, '') // Apenas letras, espaços e hífens
            .replace(/\s+/g, ' ')             // Remove espaços duplos
            .replace(/-+/g, '-')               // Remove hífens duplos
            .trim()
            .substring(0, 100);
    }
}

// ===== VALIDAÇÃO DE FORMULÁRIOS =====
class FormValidator {
    
    /**
     * Regras de validação para cada campo
     */
    static rules = {
        cidade: {
            required: true,
            minLength: 2,
            maxLength: 100,
            pattern: /^[a-zA-ZÀ-ÿ\s-]+$/,
            message: 'Cidade deve conter apenas letras (2-100 caracteres)'
        },
        unidade: {
            required: true,
            minLength: 1,
            maxLength: 50,
            message: 'Unidade é obrigatória (máx. 50 caracteres)'
        },
        local: {
            required: true,
            minLength: 2,
            maxLength: 100,
            pattern: /^[a-zA-ZÀ-ÿ\s-.,0-9]+$/,
            message: 'Local inválido (2-100 caracteres)'
        },
        responsavel: {
            required: true,
            minLength: 3,
            maxLength: 100,
            pattern: /^[a-zA-ZÀ-ÿ\s.]+$/,
            message: 'Nome do responsável inválido (3-100 caracteres)'
        },
        validade: {
            required: false,
            maxLength: 50,
            message: 'Validade muito longa (máx. 50 caracteres)'
        },
        observacoes: {
            required: false,
            maxLength: 2000,
            message: 'Observações muito longas (máx. 2000 caracteres)'
        }
    };
    
    /**
     * Valida um campo específico
     * @param {string} fieldName - Nome do campo
     * @param {string} value - Valor do campo
     * @returns {Object} - Resultado da validação
     */
    static validateField(fieldName, value) {
        const rule = this.rules[fieldName];
        if (!rule) return { valid: true };
        
        // Verificar obrigatório
        if (rule.required && (!value || value.trim().length === 0)) {
            return {
                valid: false,
                message: `${this.getFieldDisplayName(fieldName)} é obrigatório`
            };
        }
        
        // Se campo não é obrigatório e está vazio, é válido
        if (!rule.required && (!value || value.trim().length === 0)) {
            return { valid: true };
        }
        
        const trimmedValue = value.trim();
        
        // Verificar tamanho mínimo
        if (rule.minLength && trimmedValue.length < rule.minLength) {
            return {
                valid: false,
                message: rule.message || `${this.getFieldDisplayName(fieldName)} muito curto`
            };
        }
        
        // Verificar tamanho máximo
        if (rule.maxLength && trimmedValue.length > rule.maxLength) {
            return {
                valid: false,
                message: rule.message || `${this.getFieldDisplayName(fieldName)} muito longo`
            };
        }
        
        // Verificar padrão
        if (rule.pattern && !rule.pattern.test(trimmedValue)) {
            return {
                valid: false,
                message: rule.message || `${this.getFieldDisplayName(fieldName)} formato inválido`
            };
        }
        
        return { valid: true };
    }
    
    /**
     * Valida todo o formulário
     * @returns {Object} - Resultado da validação completa
     */
    static validateForm() {
        const errors = [];
        
        // Validar campos básicos
        Object.keys(this.rules).forEach(fieldName => {
            const element = document.querySelector(`[name="${fieldName}"]`) || 
                           document.querySelector(`textarea[name="${fieldName}"]`);
            
            if (element) {
                const result = this.validateField(fieldName, element.value);
                if (!result.valid) {
                    errors.push({
                        field: fieldName,
                        element: element,
                        message: result.message
                    });
                }
            }
        });
        
        // Validar se há pelo menos um serviço
        const servicos = document.querySelectorAll("#tabela-servicos tbody tr");
        if (servicos.length === 0) {
            errors.push({
                field: 'servicos',
                message: 'Adicione pelo menos um serviço'
            });
        }
        
        return {
            valid: errors.length === 0,
            errors: errors
        };
    }
    
    /**
     * Exibe erros de validação na interface
     * @param {Array} errors - Lista de erros
     */
    static showErrors(errors) {
        // Limpar erros anteriores
        document.querySelectorAll('.campo-erro').forEach(el => {
            el.classList.remove('campo-erro');
            el.title = '';
        });
        
        // Mostrar novos erros
        errors.forEach(error => {
            if (error.element) {
                error.element.classList.add('campo-erro');
                error.element.title = error.message;
            }
        });
        
        // Mostrar primeiro erro
        if (errors.length > 0) {
            alert(errors[0].message);
            if (errors[0].element) {
                errors[0].element.focus();
            }
        }
    }
    
    /**
     * Converte nome do campo para nome amigável
     * @param {string} fieldName - Nome técnico do campo
     * @returns {string} - Nome amigável
     */
    static getFieldDisplayName(fieldName) {
        const displayNames = {
            cidade: 'Cidade',
            unidade: 'Unidade',
            local: 'Local',
            responsavel: 'Responsável',
            validade: 'Validade',
            observacoes: 'Observações'
        };
        
        return displayNames[fieldName] || fieldName;
    }
}

// ===== PROTEÇÃO CONTRA ATAQUES =====
class SecurityHelper {
    
    /**
     * Rate limiting simples para prevenir spam
     */
    static rateLimiter = {
        attempts: new Map(),
        maxAttempts: 5,
        timeWindow: 60000, // 1 minuto
        
        /**
         * Verifica se uma ação é permitida
         * @param {string} action - Nome da ação
         * @returns {boolean} - Se é permitido
         */
        isAllowed(action) {
            const now = Date.now();
            const key = `${action}_${Math.floor(now / 10000)}`; // Janela de 10s
            
            // Limpar tentativas antigas
            for (const [k, timestamp] of this.attempts.entries()) {
                if (now - timestamp > this.timeWindow) {
                    this.attempts.delete(k);
                }
            }
            
            // Contar tentativas atuais para esta ação
            const currentAttempts = Array.from(this.attempts.keys())
                .filter(k => k.startsWith(action)).length;
            
            if (currentAttempts >= this.maxAttempts) {
                console.warn(`Rate limit excedido para ação: ${action}`);
                return false;
            }
            
            this.attempts.set(key, now);
            return true;
        },
        
        /**
         * Reseta o contador para uma ação específica
         * @param {string} action - Nome da ação
         */
        reset(action) {
            const keysToDelete = Array.from(this.attempts.keys())
                .filter(k => k.startsWith(action));
            
            keysToDelete.forEach(key => this.attempts.delete(key));
        }
    };
    
    /**
     * Verifica integridade dos dados
     * @param {Object} data - Dados a serem verificados
     * @returns {boolean} - Se os dados são válidos
     */
    static validateDataIntegrity(data) {
        try {
            // Verificar se é um objeto válido
            if (typeof data !== 'object' || data === null) {
                return false;
            }
            
            // Verificar campos obrigatórios
            const requiredFields = ['cidade', 'unidade', 'local'];
            for (const field of requiredFields) {
                if (!(field in data) || typeof data[field] !== 'string') {
                    return false;
                }
            }
            
            // Verificar se servicos é um array
            if (data.servicos && !Array.isArray(data.servicos)) {
                return false;
            }
            
            return true;
        } catch (error) {
            console.error('Erro na validação de integridade:', error);
            return false;
        }
    }
    
    /**
     * Detecta possíveis tentativas de XSS
     * @param {string} input - Texto a ser verificado
     * @returns {boolean} - Se contém possível XSS
     */
    static detectXSS(input) {
        if (typeof input !== 'string') return false;
        
        const xssPatterns = [
            /<script[^>]*>.*?<\/script>/gi,
            /javascript:/gi,
            /on\w+\s*=/gi,
            /<iframe[^>]*>/gi,
            /<object[^>]*>/gi,
            /<embed[^>]*>/gi
        ];
        
        return xssPatterns.some(pattern => pattern.test(input));
    }
}

// ===== STORAGE SEGURO =====
class SecureStorage {
    
    // Chave para criptografia simples
    static key = 'lara_eng_2024_secure';
    
    /**
     * Criptografia básica (Base64 + XOR)
     * @param {string} text - Texto a ser criptografado
     * @returns {string} - Texto criptografado
     */
    static encrypt(text) {
        try {
            let encrypted = '';
            for (let i = 0; i < text.length; i++) {
                const charCode = text.charCodeAt(i) ^ this.key.charCodeAt(i % this.key.length);
                encrypted += String.fromCharCode(charCode);
            }
            return btoa(encrypted); // Base64
        } catch (error) {
            console.error('Erro na criptografia:', error);
            return text; // Fallback
        }
    }
    
    /**
     * Descriptografia
     * @param {string} encryptedText - Texto criptografado
     * @returns {string|null} - Texto descriptografado ou null se erro
     */
    static decrypt(encryptedText) {
        try {
            const decoded = atob(encryptedText); // Decodifica Base64
            let decrypted = '';
            for (let i = 0; i < decoded.length; i++) {
                const charCode = decoded.charCodeAt(i) ^ this.key.charCodeAt(i % this.key.length);
                decrypted += String.fromCharCode(charCode);
            }
            return decrypted;
        } catch (error) {
            console.error('Erro na descriptografia:', error);
            return null;
        }
    }
    
    /**
     * Salvar item com criptografia
     * @param {string} key - Chave do item
     * @param {*} value - Valor a ser salvo
     * @returns {boolean} - Sucesso da operação
     */
    static setItem(key, value) {
        try {
            const jsonString = JSON.stringify(value);
            const encrypted = this.encrypt(jsonString);
            localStorage.setItem(key, encrypted);
            return true;
        } catch (error) {
            console.error('Erro ao salvar no storage seguro:', error);
            return false;
        }
    }
    
    /**
     * Recuperar item com descriptografia
     * @param {string} key - Chave do item
     * @returns {*|null} - Valor recuperado ou null se erro
     */
    static getItem(key) {
        try {
            const encrypted = localStorage.getItem(key);
            if (!encrypted) return null;
            
            const decrypted = this.decrypt(encrypted);
            if (!decrypted) return null;
            
            return JSON.parse(decrypted);
        } catch (error) {
            console.error('Erro ao recuperar do storage seguro:', error);
            return null;
        }
    }
    
    /**
     * Remover item
     * @param {string} key - Chave do item
     */
    static removeItem(key) {
        localStorage.removeItem(key);
    }
}

// ===== FUNÇÕES PÚBLICAS PARA USO NOS OUTROS ARQUIVOS =====

/**
 * Coleta dados do formulário com sanitização
 * @returns {Object} - Dados sanitizados
 */
function coletarDadosFormularioSeguro() {
    const dados = {
        cidade: DataSanitizer.sanitizeLocation(
            document.querySelector('input[name="cidade"]').value
        ),
        unidade: DataSanitizer.sanitizeBasic(
            document.querySelector('input[name="unidade"]').value
        ),
        local: DataSanitizer.sanitizeLocation(
            document.querySelector('input[name="local"]').value
        ),
        validade: DataSanitizer.sanitizeBasic(
            document.querySelector('input[name="validade"]').value
        ),
        observacoes: DataSanitizer.sanitizeLongText(
            document.querySelector('textarea[name="observacoes"]').value
        ),
        total: DataSanitizer.sanitizeMoney(
            document.querySelector("#total-servicos-input").value
        ),
        responsavel: DataSanitizer.sanitizeName(
            document.querySelector('input[name="responsavel"]').value
        ),
        servicos: []
    };

    // Sanitizar serviços da tabela
    const linhas = document.querySelectorAll("#tabela-servicos tbody tr");
    linhas.forEach(linha => {
        const colunas = linha.querySelectorAll("td");
        if (colunas.length >= 5) {
            dados.servicos.push({
                descricao: DataSanitizer.sanitizeBasic(colunas[0].textContent),
                valor: DataSanitizer.sanitizeMoney(colunas[1].textContent),
                unidade: DataSanitizer.sanitizeBasic(colunas[2].textContent),
                quantidade: DataSanitizer.sanitizeNumber(colunas[3].textContent),
                total: DataSanitizer.sanitizeMoney(colunas[4].textContent)
            });
        }
    });

    return dados;
}

/**
 * Validação completa do formulário
 * @returns {boolean} - Se o formulário é válido
 */
function validarFormularioCompleto() {
    const validation = FormValidator.validateForm();
    
    if (!validation.valid) {
        FormValidator.showErrors(validation.errors);
        return false;
    }
    
    return true;
}

/**
 * Salvar rascunho com segurança
 * @returns {boolean} - Sucesso da operação
 */
function salvarRascunhoSeguro() {
    try {
        const dados = coletarDadosFormularioSeguro();
        dados.ultimaSalvamento = new Date().toISOString();
        
        return SecureStorage.setItem(STORAGE_KEY, dados);
    } catch (error) {
        console.error('Erro ao salvar rascunho seguro:', error);
        return false;
    }
}

/**
 * Carregar rascunho com segurança
 * @returns {boolean} - Sucesso da operação
 */
function carregarRascunhoSeguro() {
    try {
        const dados = SecureStorage.getItem(STORAGE_KEY);
        
        if (!dados) {
            console.log('Nenhum rascunho encontrado');
            return false;
        }
        
        // Verificar integridade dos dados
        if (!SecurityHelper.validateDataIntegrity(dados)) {
            console.warn('Dados do rascunho corrompidos');
            SecureStorage.removeItem(STORAGE_KEY);
            return false;
        }
        
        restaurarDadosFormulario(dados);
        return true;
        
    } catch (error) {
        console.error('Erro ao carregar rascunho seguro:', error);
        return false;
    }
}

/**
 * Gerar PDF com proteções de segurança
 * @returns {boolean} - Sucesso da operação
 */
function gerarPDFSeguro() {
    // Rate limiting
    if (!SecurityHelper.rateLimiter.isAllowed('generate_pdf')) {
        alert('Muitas tentativas de geração de PDF. Aguarde um momento.');
        return false;
    }
    
    // Validação completa
    if (!validarFormularioCompleto()) {
        return false;
    }
    
    // Coletar dados seguros
    const dados = coletarDadosFormularioSeguro();
    
    // Verificar integridade
    if (!SecurityHelper.validateDataIntegrity(dados)) {
        alert('Dados inválidos detectados. Verifique o formulário.');
        return false;
    }
    
    // Detectar possível XSS em campos de texto
    const textsToCheck = [dados.cidade, dados.local, dados.observacoes];
    for (const text of textsToCheck) {
        if (SecurityHelper.detectXSS(text)) {
            alert('Conteúdo suspeito detectado. Verifique os dados inseridos.');
            return false;
        }
    }
    
    // Gerar PDF (usar a função original)
    return gerarPDFCompleto();
}

// ===== LOG DE SEGURANÇA =====
console.log('🔒 Sistema de Segurança Lara Engenharia carregado');
console.log('✅ Sanitização de dados ativa');
console.log('✅ Validação de formulários ativa');
console.log('✅ Rate limiting ativo');
console.log('✅ Storage seguro ativo');