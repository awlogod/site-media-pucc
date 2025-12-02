// Matérias pré-definidas com suas fórmulas
const materiasConfig = {
    'Cálculo 1': {
        tipo: 'calculo1',
        formulaTeorica: {
            P1: { peso: 0.25, label: 'P1 (Prova 1)' },
            P2: { peso: 0.45, label: 'P2 (Prova 2)' },
            T1: { peso: 0.1, label: 'T1 (Teste 1)' },
            T2: { peso: 0.1, label: 'T2 (Teste 2)' },
            AT: { peso: 0.1, label: 'AT (Média das Atividades Teóricas Assíncronas)' }
        },
        formulaPratica: {
            PR: { peso: 0.50, label: 'PR (Média dos Projetos)' },
            AA: { peso: 0.20, label: 'AA (Média das Atividades Práticas Assíncronas)' },
            AS: { peso: 0.30, label: 'AS (Média das Atividades Práticas Síncronas)' }
        },
        formulaFinal: 'calculo1' // MF = (MT² × MP)^(1/3)
    },
    'ORGANIZAÇÃO DE SISTEMAS DE COMPUTAÇÃO': {
        tipo: 'organizacao',
        formulaTeorica: {
            P1: { peso: 0.30, label: 'P1 (Prova 1)' },
            P2: { peso: 0.30, label: 'P2 (Prova 2)' },
            P3: { peso: 0.40, label: 'P3 (Prova 3)' }
        },
        formulaPratica: {
            Mat: { peso: 0.20, label: 'Mat (Média das 11 Atividades)' },
            Pjt: { peso: 0.80, label: 'Pjt (Projeto 01)' }
        },
        formulaFinal: 'organizacao' // Se MT >= 5 e MP >= 5: 0.8*MT + 0.2*MP, senão: min(MT, MP)
    },
    'PI: DESENVOLVIMENTO DE SISTEMAS WEB': {
        tipo: 'pi_web',
        formulaTeorica: {
            Planejamento: { peso: 0.333, label: 'Planejamento e Pesquisa (20% do TF)' },
            Desenvolvimento: { peso: 0.333, label: 'Desenvolvimento Técnico (20% do TF)' },
            Qualidade: { peso: 0.333, label: 'Qualidade da Entrega e Apresentação Final (20% do TF)' }
        },
        formulaPratica: {
            PTP: { peso: 0.20, label: 'PTP (Prova Teórico-Prática)' },
            TPS: { peso: 0.20, label: 'TPS (Atividades Práticas Semanais)' }
        },
        formulaFinal: 'pi_web' // MF = (TF * 0.6) + (PTP * 0.2) + (TPS * 0.2), onde TF = média das 3 etapas
    },
    'ROBÓTICA COMPUTACIONAL': {
        tipo: 'robotica',
        formulaTeorica: {
            TVC01: { peso: 0.40, label: 'TVC01 (Teste de Verificação de Conhecimento 01)' },
            TVC02: { peso: 0.40, label: 'TVC02 (Teste de Verificação de Conhecimento 02)' }
        },
        formulaPratica: {
            P1: { peso: 0.25, label: 'Projeto 1' },
            P2: { peso: 0.25, label: 'Projeto 2' },
            P3: { peso: 0.25, label: 'Projeto 3' },
            P4: { peso: 0.25, label: 'Projeto 4' },
            P5: { peso: 0, label: 'Projeto 5 (substitui a menor nota entre P1-P4)' }
        },
        formulaFinal: 'robotica' // MF = 0.4 × TVC01 + 0.4 × TVC02 + 0.2 × P
    },
    'TEOLOGIA E FENOMENO HUMANO': {
        tipo: 'teologia',
        formulaTeorica: {
            Fichamentos: { peso: 0.40, label: 'Fichamentos e Atividades de Grupo em Sala (máx 4,0)' }
        },
        formulaPratica: {
            AvaliacaoEscrita: { peso: 0.30, label: 'Avaliação Escrita em Sala (máx 3,0)' },
            EntrevistaOral: { peso: 0.30, label: 'Entrevista Oral em Grupo (máx 3,0)' }
        },
        formulaFinal: 'teologia' // MF = Fichamentos + AvaliacaoEscrita + EntrevistaOral (total máx 10,0)
    }
};

const materiasPredefinidas = Object.keys(materiasConfig);

// Dados do aluno atual
let alunoAtual = {
    nome: '',
    ra: '',
    materias: []
};

// Índice da matéria selecionada
let materiaSelecionadaIndex = -1;

// Função para validar o RA
function validarRA() {
    const ra = document.getElementById('raAluno').value.trim();
    const erroRA = document.getElementById('erroRA');
    const inputRA = document.getElementById('raAluno');
    
    // Remover espaços e caracteres não numéricos para validação
    const raNumerico = ra.replace(/\D/g, '');
    
    // Atualizar o campo com apenas números
    if (ra !== raNumerico) {
        inputRA.value = raNumerico;
    }
    
    // Verificar se tem exatamente 8 dígitos
    if (raNumerico.length > 0 && raNumerico.length !== 8) {
        erroRA.textContent = 'O RA deve conter exatamente 8 dígitos';
        erroRA.style.display = 'block';
        inputRA.classList.add('error');
        return false;
    } else {
        erroRA.style.display = 'none';
        inputRA.classList.remove('error');
        return true;
    }
}

// Função para acessar as matérias após informar nome e RA
function acessarMaterias() {
    const nome = document.getElementById('nomeAluno').value.trim();
    const ra = document.getElementById('raAluno').value.trim();

    if (nome === '') {
        alert('Por favor, digite seu nome!');
        return;
    }

    if (ra === '') {
        alert('Por favor, digite seu RA!');
        return;
    }
    
    // Validar RA antes de continuar
    const raNumerico = ra.replace(/\D/g, '');
    if (raNumerico.length !== 8) {
        const erroRA = document.getElementById('erroRA');
        const inputRA = document.getElementById('raAluno');
        erroRA.textContent = 'O RA deve conter exatamente 8 dígitos';
        erroRA.style.display = 'block';
        inputRA.classList.add('error');
        inputRA.focus();
        return;
    }

    // Salvar dados do aluno (usar apenas números do RA)
    alunoAtual.nome = nome;
    alunoAtual.ra = raNumerico;

    // Inicializar matérias se ainda não foram inicializadas
    if (alunoAtual.materias.length === 0) {
        alunoAtual.materias = materiasPredefinidas.map(nomeMateria => {
            const config = materiasConfig[nomeMateria];
            const materia = {
                nome: nomeMateria,
                tipo: config.tipo,
                notas: {}
            };

            // Inicializar campos específicos para Cálculo 1
            if (config.tipo === 'calculo1') {
                // Inicializar todos os campos como vazios (não como 0)
                materia.notas.P1 = null;
                materia.notas.P2 = null;
                materia.notas.T1 = null;
                materia.notas.T2 = null;
                materia.notas.AT = null;
                materia.notas.PR = null;
                materia.notas.AA = null;
                materia.notas.AS = null;
            } else if (config.tipo === 'organizacao') {
                // Inicializar campos para Organização de Sistemas
                materia.notas.P1 = null;
                materia.notas.P2 = null;
                materia.notas.P3 = null;
                materia.notas.Mat = null;
                materia.notas.Pjt = null;
            } else if (config.tipo === 'pi_web') {
                // Inicializar campos para PI Web
                materia.notas.Planejamento = null;
                materia.notas.Desenvolvimento = null;
                materia.notas.Qualidade = null;
                materia.notas.PTP = null;
                materia.notas.TPS = null;
            } else if (config.tipo === 'robotica') {
                // Inicializar campos para Robótica Computacional
                materia.notas.TVC01 = null;
                materia.notas.TVC02 = null;
                materia.notas.P1 = null;
                materia.notas.P2 = null;
                materia.notas.P3 = null;
                materia.notas.P4 = null;
                materia.notas.P5 = null;
            } else if (config.tipo === 'teologia') {
                // Inicializar campos para Teologia
                materia.notas.Fichamentos = null;
                materia.notas.AvaliacaoEscrita = null;
                materia.notas.EntrevistaOral = null;
            } else {
                // Para outras matérias, usar estrutura genérica
                materia.notas.teoricas = [];
                materia.notas.praticas = [];
            }

            return materia;
        });
    }

    // Esconder card de login e mostrar informações do aluno
    document.getElementById('loginCard').style.display = 'none';
    document.getElementById('infoAluno').style.display = 'block';
    document.getElementById('infoAlunoTexto').textContent = `Aluno: ${nome} | RA: ${ra}`;

    // Mostrar matérias e card de feedback
    atualizarListaMaterias();
    document.getElementById('feedbackCard').style.display = 'block';
    
    // Scroll suave até as matérias
    document.getElementById('listaMaterias').scrollIntoView({ behavior: 'smooth' });
}

// Função para calcular média teórica de Cálculo 1
function calcularMediaTeoricaCalculo1(notas) {
    const P1 = (notas.P1 !== '' && notas.P1 !== undefined && notas.P1 !== null && !isNaN(parseFloat(notas.P1))) 
        ? parseFloat(notas.P1) : 0;
    const P2 = (notas.P2 !== '' && notas.P2 !== undefined && notas.P2 !== null && !isNaN(parseFloat(notas.P2))) 
        ? parseFloat(notas.P2) : 0;
    const T1 = (notas.T1 !== '' && notas.T1 !== undefined && notas.T1 !== null && !isNaN(parseFloat(notas.T1))) 
        ? parseFloat(notas.T1) : 0;
    const T2 = (notas.T2 !== '' && notas.T2 !== undefined && notas.T2 !== null && !isNaN(parseFloat(notas.T2))) 
        ? parseFloat(notas.T2) : 0;
    const AT = (notas.AT !== '' && notas.AT !== undefined && notas.AT !== null && !isNaN(parseFloat(notas.AT))) 
        ? parseFloat(notas.AT) : 0;

    // MT = 0.25 × P1 + 0.45 × P2 + 0.2 × (T1 + T2)/2 + 0.1 × AT
    const mediaTestes = (T1 + T2) / 2;
    const MT = 0.25 * P1 + 0.45 * P2 + 0.2 * mediaTestes + 0.1 * AT;
    
    return MT;
}

// Função para calcular média prática de Cálculo 1
function calcularMediaPraticaCalculo1(notas) {
    const PR = (notas.PR !== '' && notas.PR !== undefined && notas.PR !== null && !isNaN(parseFloat(notas.PR))) 
        ? parseFloat(notas.PR) : 0;
    const AA = (notas.AA !== '' && notas.AA !== undefined && notas.AA !== null && !isNaN(parseFloat(notas.AA))) 
        ? parseFloat(notas.AA) : 0;
    const AS = (notas.AS !== '' && notas.AS !== undefined && notas.AS !== null && !isNaN(parseFloat(notas.AS))) 
        ? parseFloat(notas.AS) : 0;

    // MP = 0.50 × PR + 0.20 × AA + 0.30 × AS
    const MP = 0.50 * PR + 0.20 * AA + 0.30 * AS;
    
    return MP;
}

// Função para calcular média final de Cálculo 1
function calcularMediaFinalCalculo1(MT, MP) {
    // MF = (MT² × MP)^(1/3)
    if (MT <= 0 || MP <= 0) return 0;
    const MF = Math.pow(MT * MT * MP, 1/3);
    return MF;
}

// Função para calcular média teórica de Organização de Sistemas
function calcularMediaTeoricaOrganizacao(notas) {
    const P1 = (notas.P1 !== '' && notas.P1 !== undefined && notas.P1 !== null && !isNaN(parseFloat(notas.P1))) 
        ? parseFloat(notas.P1) : 0;
    const P2 = (notas.P2 !== '' && notas.P2 !== undefined && notas.P2 !== null && !isNaN(parseFloat(notas.P2))) 
        ? parseFloat(notas.P2) : 0;
    const P3 = (notas.P3 !== '' && notas.P3 !== undefined && notas.P3 !== null && !isNaN(parseFloat(notas.P3))) 
        ? parseFloat(notas.P3) : 0;

    // MT = 0.3 × P1 + 0.3 × P2 + 0.4 × P3
    const MT = 0.3 * P1 + 0.3 * P2 + 0.4 * P3;
    
    return MT;
}

// Função para calcular média prática de Organização de Sistemas
function calcularMediaPraticaOrganizacao(notas) {
    const Mat = (notas.Mat !== '' && notas.Mat !== undefined && notas.Mat !== null && !isNaN(parseFloat(notas.Mat))) 
        ? parseFloat(notas.Mat) : 0;
    const Pjt = (notas.Pjt !== '' && notas.Pjt !== undefined && notas.Pjt !== null && !isNaN(parseFloat(notas.Pjt))) 
        ? parseFloat(notas.Pjt) : 0;

    // MP = 0.2 × Mat + 0.8 × Pjt
    const MP = 0.2 * Mat + 0.8 * Pjt;
    
    return MP;
}

// Função para calcular média final de Organização de Sistemas
function calcularMediaFinalOrganizacao(MT, MP) {
    // Se ambas as médias forem >= 5.0, então MF = 0.8*MT + 0.2*MP
    // Senão, MF = min(MT, MP)
    if (MT >= 5.0 && MP >= 5.0) {
        return 0.8 * MT + 0.2 * MP;
    } else {
        return Math.min(MT, MP);
    }
}

// Função para calcular Trabalho Final (TF) de PI Web
function calcularTrabalhoFinalPIWeb(notas) {
    const Planejamento = (notas.Planejamento !== '' && notas.Planejamento !== undefined && notas.Planejamento !== null && !isNaN(parseFloat(notas.Planejamento))) 
        ? parseFloat(notas.Planejamento) : 0;
    const Desenvolvimento = (notas.Desenvolvimento !== '' && notas.Desenvolvimento !== undefined && notas.Desenvolvimento !== null && !isNaN(parseFloat(notas.Desenvolvimento))) 
        ? parseFloat(notas.Desenvolvimento) : 0;
    const Qualidade = (notas.Qualidade !== '' && notas.Qualidade !== undefined && notas.Qualidade !== null && !isNaN(parseFloat(notas.Qualidade))) 
        ? parseFloat(notas.Qualidade) : 0;

    // TF = média das 3 etapas (cada uma vale 1/3 do TF)
    const TF = (Planejamento + Desenvolvimento + Qualidade) / 3;
    
    return TF;
}

// Função para calcular média teórica de PI Web (TF)
function calcularMediaTeoricaPIWeb(notas) {
    return calcularTrabalhoFinalPIWeb(notas);
}

// Função para calcular média prática de PI Web (PTP + TPS)
function calcularMediaPraticaPIWeb(notas) {
    const PTP = (notas.PTP !== '' && notas.PTP !== undefined && notas.PTP !== null && !isNaN(parseFloat(notas.PTP))) 
        ? parseFloat(notas.PTP) : 0;
    const TPS = (notas.TPS !== '' && notas.TPS !== undefined && notas.TPS !== null && !isNaN(parseFloat(notas.TPS))) 
        ? parseFloat(notas.TPS) : 0;

    // MP = média simples de PTP e TPS (para exibição)
    const MP = (PTP + TPS) / 2;
    
    return MP;
}

// Função para calcular média final de PI Web
function calcularMediaFinalPIWeb(notas) {
    const TF = calcularTrabalhoFinalPIWeb(notas);
    const PTP = (notas.PTP !== '' && notas.PTP !== undefined && notas.PTP !== null && !isNaN(parseFloat(notas.PTP))) 
        ? parseFloat(notas.PTP) : 0;
    const TPS = (notas.TPS !== '' && notas.TPS !== undefined && notas.TPS !== null && !isNaN(parseFloat(notas.TPS))) 
        ? parseFloat(notas.TPS) : 0;

    // MF = (TF * 0.6) + (PTP * 0.2) + (TPS * 0.2)
    const MF = (TF * 0.6) + (PTP * 0.2) + (TPS * 0.2);
    
    return MF;
}

// Função para calcular média teórica de Robótica Computacional
function calcularMediaTeoricaRobotica(notas) {
    const TVC01 = (notas.TVC01 !== '' && notas.TVC01 !== undefined && notas.TVC01 !== null && !isNaN(parseFloat(notas.TVC01))) 
        ? parseFloat(notas.TVC01) : 0;
    const TVC02 = (notas.TVC02 !== '' && notas.TVC02 !== undefined && notas.TVC02 !== null && !isNaN(parseFloat(notas.TVC02))) 
        ? parseFloat(notas.TVC02) : 0;

    // MT = média simples para exibição (mas na MF usa os pesos)
    const MT = (TVC01 + TVC02) / 2;
    
    return MT;
}

// Função para calcular média prática de Robótica Computacional
function calcularMediaPraticaRobotica(notas) {
    const P1 = (notas.P1 !== '' && notas.P1 !== undefined && notas.P1 !== null && !isNaN(parseFloat(notas.P1))) 
        ? parseFloat(notas.P1) : 0;
    const P2 = (notas.P2 !== '' && notas.P2 !== undefined && notas.P2 !== null && !isNaN(parseFloat(notas.P2))) 
        ? parseFloat(notas.P2) : 0;
    const P3 = (notas.P3 !== '' && notas.P3 !== undefined && notas.P3 !== null && !isNaN(parseFloat(notas.P3))) 
        ? parseFloat(notas.P3) : 0;
    const P4 = (notas.P4 !== '' && notas.P4 !== undefined && notas.P4 !== null && !isNaN(parseFloat(notas.P4))) 
        ? parseFloat(notas.P4) : 0;
    const P5 = (notas.P5 !== '' && notas.P5 !== undefined && notas.P5 !== null && !isNaN(parseFloat(notas.P5))) 
        ? parseFloat(notas.P5) : 0;

    // Encontrar a menor nota entre P1, P2, P3, P4
    const projetos = [P1, P2, P3, P4];
    const menorNota = Math.min(...projetos);
    const indiceMenor = projetos.indexOf(menorNota);
    
    // Se P5 foi informado, substituir a menor nota pelo máximo entre menorNota e P5
    let notaSubstituida = menorNota;
    if (P5 > 0) {
        notaSubstituida = Math.max(menorNota, P5);
        projetos[indiceMenor] = notaSubstituida;
    }
    
    // Calcular média dos 4 projetos
    const MP = (projetos[0] + projetos[1] + projetos[2] + projetos[3]) / 4;
    
    return MP;
}

// Função para calcular média final de Robótica Computacional
function calcularMediaFinalRobotica(notas) {
    const TVC01 = (notas.TVC01 !== '' && notas.TVC01 !== undefined && notas.TVC01 !== null && !isNaN(parseFloat(notas.TVC01))) 
        ? parseFloat(notas.TVC01) : 0;
    const TVC02 = (notas.TVC02 !== '' && notas.TVC02 !== undefined && notas.TVC02 !== null && !isNaN(parseFloat(notas.TVC02))) 
        ? parseFloat(notas.TVC02) : 0;
    
    // Calcular média prática (com lógica do P5)
    const P = calcularMediaPraticaRobotica(notas);

    // MF = 0.4 × TVC01 + 0.4 × TVC02 + 0.2 × P
    const MF = 0.4 * TVC01 + 0.4 * TVC02 + 0.2 * P;
    
    return MF;
}

// Função para calcular média teórica de Teologia
function calcularMediaTeoricaTeologia(notas) {
    const Fichamentos = (notas.Fichamentos !== '' && notas.Fichamentos !== undefined && notas.Fichamentos !== null && !isNaN(parseFloat(notas.Fichamentos))) 
        ? parseFloat(notas.Fichamentos) : 0;
    
    // Limitar ao máximo de 4,0
    const MT = Math.min(Fichamentos, 4.0);
    
    return MT;
}

// Função para calcular média prática de Teologia
function calcularMediaPraticaTeologia(notas) {
    const AvaliacaoEscrita = (notas.AvaliacaoEscrita !== '' && notas.AvaliacaoEscrita !== undefined && notas.AvaliacaoEscrita !== null && !isNaN(parseFloat(notas.AvaliacaoEscrita))) 
        ? parseFloat(notas.AvaliacaoEscrita) : 0;
    const EntrevistaOral = (notas.EntrevistaOral !== '' && notas.EntrevistaOral !== undefined && notas.EntrevistaOral !== null && !isNaN(parseFloat(notas.EntrevistaOral))) 
        ? parseFloat(notas.EntrevistaOral) : 0;

    // Limitar cada uma ao máximo permitido
    const AvaliacaoEscritaLimitada = Math.min(AvaliacaoEscrita, 3.0);
    const EntrevistaOralLimitada = Math.min(EntrevistaOral, 3.0);
    
    // MP = soma das duas avaliações práticas
    const MP = AvaliacaoEscritaLimitada + EntrevistaOralLimitada;
    
    return MP;
}

// Função para calcular média final de Teologia
function calcularMediaFinalTeologia(notas) {
    const Fichamentos = (notas.Fichamentos !== '' && notas.Fichamentos !== undefined && notas.Fichamentos !== null && !isNaN(parseFloat(notas.Fichamentos))) 
        ? parseFloat(notas.Fichamentos) : 0;
    const AvaliacaoEscrita = (notas.AvaliacaoEscrita !== '' && notas.AvaliacaoEscrita !== undefined && notas.AvaliacaoEscrita !== null && !isNaN(parseFloat(notas.AvaliacaoEscrita))) 
        ? parseFloat(notas.AvaliacaoEscrita) : 0;
    const EntrevistaOral = (notas.EntrevistaOral !== '' && notas.EntrevistaOral !== undefined && notas.EntrevistaOral !== null && !isNaN(parseFloat(notas.EntrevistaOral))) 
        ? parseFloat(notas.EntrevistaOral) : 0;

    // Limitar cada uma ao máximo permitido
    const FichamentosLimitado = Math.min(Fichamentos, 4.0);
    const AvaliacaoEscritaLimitada = Math.min(AvaliacaoEscrita, 3.0);
    const EntrevistaOralLimitada = Math.min(EntrevistaOral, 3.0);

    // MF = Fichamentos (máx 4,0) + AvaliacaoEscrita (máx 3,0) + EntrevistaOral (máx 3,0)
    const MF = FichamentosLimitado + AvaliacaoEscritaLimitada + EntrevistaOralLimitada;
    
    return MF;
}

// Função para calcular média genérica (média aritmética)
function calcularMediaGenerica(notas) {
    if (!notas || notas.length === 0) return 0;
    const soma = notas.reduce((acc, nota) => acc + parseFloat(nota || 0), 0);
    return soma / notas.length;
}

// Função para calcular médias de uma matéria
function calcularMediasMateria(materia) {
    const config = materiasConfig[materia.nome];
    
    if (materia.tipo === 'calculo1') {
        const MT = calcularMediaTeoricaCalculo1(materia.notas);
        const MP = calcularMediaPraticaCalculo1(materia.notas);
        const MF = calcularMediaFinalCalculo1(MT, MP);
        return { teorica: MT, pratica: MP, final: MF };
    } else if (materia.tipo === 'organizacao') {
        const MT = calcularMediaTeoricaOrganizacao(materia.notas);
        const MP = calcularMediaPraticaOrganizacao(materia.notas);
        const MF = calcularMediaFinalOrganizacao(MT, MP);
        return { teorica: MT, pratica: MP, final: MF };
    } else if (materia.tipo === 'pi_web') {
        const MT = calcularMediaTeoricaPIWeb(materia.notas);
        const MP = calcularMediaPraticaPIWeb(materia.notas);
        const MF = calcularMediaFinalPIWeb(materia.notas);
        return { teorica: MT, pratica: MP, final: MF };
    } else if (materia.tipo === 'robotica') {
        const MT = calcularMediaTeoricaRobotica(materia.notas);
        const MP = calcularMediaPraticaRobotica(materia.notas);
        const MF = calcularMediaFinalRobotica(materia.notas);
        return { teorica: MT, pratica: MP, final: MF };
    } else if (materia.tipo === 'teologia') {
        const MT = calcularMediaTeoricaTeologia(materia.notas);
        const MP = calcularMediaPraticaTeologia(materia.notas);
        const MF = calcularMediaFinalTeologia(materia.notas);
        return { teorica: MT, pratica: MP, final: MF };
    } else {
        const MT = calcularMediaGenerica(materia.notas.teoricas);
        const MP = calcularMediaGenerica(materia.notas.praticas);
        const MF = MT + MP; // Soma simples para outras matérias
        return { teorica: MT, pratica: MP, final: MF };
    }
}

// Função para atualizar a lista de matérias na tela
function atualizarListaMaterias() {
    const listaMaterias = document.getElementById('listaMaterias');

    if (alunoAtual.materias.length === 0) {
        listaMaterias.innerHTML = '';
        return;
    }

    listaMaterias.innerHTML = alunoAtual.materias.map((materia, materiaIndex) => {
        const medias = calcularMediasMateria(materia);
        const mediaFinal = medias.final;
        
        const status = mediaFinal >= 5 ? 'aprovado' : mediaFinal > 0 ? 'reprovado' : '';
        
        return `
            <section class="card materia-item clickable" onclick="selecionarMateria(${materiaIndex})">
                <div class="materia-header">
                    <h2>Matéria ${materiaIndex + 1}: ${materia.nome}</h2>
                    <div class="media-display ${status}">
                        Média Final: ${mediaFinal.toFixed(2)}
                    </div>
                </div>
                <div class="materia-preview">
                    <p>📖 Teórica: ${medias.teorica.toFixed(2)} | 🔬 Prática: ${medias.pratica.toFixed(2)}</p>
                    <p class="click-hint">Clique para ver detalhes</p>
                </div>
            </section>
        `;
    }).join('');
}

// Função para selecionar uma matéria e mostrar seus detalhes
function selecionarMateria(index) {
    materiaSelecionadaIndex = index;
    const materia = alunoAtual.materias[index];
    
    // Esconder lista de matérias e mostrar detalhes
    document.getElementById('listaMaterias').style.display = 'none';
    document.getElementById('detalhesMateria').style.display = 'block';
    document.getElementById('nomeMateriaSelecionada').textContent = materia.nome;
    
    // Atualizar detalhes da matéria
    atualizarDetalhesMateria();
    
    // Scroll suave até os detalhes
    document.getElementById('detalhesMateria').scrollIntoView({ behavior: 'smooth' });
}

// Função para voltar à lista de matérias
function voltarParaLista() {
    document.getElementById('listaMaterias').style.display = 'block';
    document.getElementById('detalhesMateria').style.display = 'none';
    materiaSelecionadaIndex = -1;
    atualizarListaMaterias();
}

// Função para atualizar apenas as médias (sem re-renderizar campos)
function atualizarApenasMedias() {
    if (materiaSelecionadaIndex === -1) return;

    const materia = alunoAtual.materias[materiaSelecionadaIndex];
    const medias = calcularMediasMateria(materia);
    
    // Atualizar exibição das médias
    document.getElementById('mediaTeorica').textContent = medias.teorica.toFixed(2);
    document.getElementById('mediaPratica').textContent = medias.pratica.toFixed(2);
    document.getElementById('somaMedias').textContent = medias.final.toFixed(2);
    
    // Adicionar classes de status
    const mediaTeoricaEl = document.getElementById('mediaTeorica');
    const mediaPraticaEl = document.getElementById('mediaPratica');
    const somaMediasEl = document.getElementById('somaMedias');
    
    mediaTeoricaEl.className = 'media-valor ' + (medias.teorica >= 5 ? 'aprovado' : medias.teorica > 0 ? 'reprovado' : '');
    mediaPraticaEl.className = 'media-valor ' + (medias.pratica >= 5 ? 'aprovado' : medias.pratica > 0 ? 'reprovado' : '');
    somaMediasEl.className = 'media-valor ' + (medias.final >= 5 ? 'aprovado' : medias.final > 0 ? 'reprovado' : '');
}

// Função para atualizar os detalhes da matéria selecionada
function atualizarDetalhesMateria() {
    if (materiaSelecionadaIndex === -1) return;

    const materia = alunoAtual.materias[materiaSelecionadaIndex];
    const config = materiasConfig[materia.nome];
    const medias = calcularMediasMateria(materia);
    
    // Atualizar exibição das médias
    document.getElementById('mediaTeorica').textContent = medias.teorica.toFixed(2);
    document.getElementById('mediaPratica').textContent = medias.pratica.toFixed(2);
    
    // Atualizar média final (soma ou fórmula específica)
    let mediaFinalTexto = 'Média Final (MT + MP):';
    if (materia.tipo === 'calculo1') {
        mediaFinalTexto = 'Média Final (MF = (MT² × MP)^(1/3)):';
    } else if (materia.tipo === 'organizacao') {
        mediaFinalTexto = 'Média Final (Se MT≥5 e MP≥5: 0.8×MT+0.2×MP, senão: min(MT,MP)):';
    } else if (materia.tipo === 'pi_web') {
        mediaFinalTexto = 'Média Final (MF = TF×0.6 + PTP×0.2 + TPS×0.2):';
    } else if (materia.tipo === 'robotica') {
        mediaFinalTexto = 'Média Final (MF = 0.4×TVC01 + 0.4×TVC02 + 0.2×P):';
    } else if (materia.tipo === 'teologia') {
        mediaFinalTexto = 'Média Final (MF = Fichamentos + Avaliação Escrita + Entrevista Oral, máx 10,0):';
    }
    document.querySelector('.soma-medias .media-label').textContent = mediaFinalTexto;
    document.getElementById('somaMedias').textContent = medias.final.toFixed(2);
    
    // Adicionar classes de status
    const mediaTeoricaEl = document.getElementById('mediaTeorica');
    const mediaPraticaEl = document.getElementById('mediaPratica');
    const somaMediasEl = document.getElementById('somaMedias');
    
    mediaTeoricaEl.className = 'media-valor ' + (medias.teorica >= 5 ? 'aprovado' : medias.teorica > 0 ? 'reprovado' : '');
    mediaPraticaEl.className = 'media-valor ' + (medias.pratica >= 5 ? 'aprovado' : medias.pratica > 0 ? 'reprovado' : '');
    somaMediasEl.className = 'media-valor ' + (medias.final >= 5 ? 'aprovado' : medias.final > 0 ? 'reprovado' : '');
    
    // Renderizar campos específicos baseado no tipo de matéria
    if (materia.tipo === 'calculo1') {
        renderizarCamposCalculo1(materia);
    } else if (materia.tipo === 'organizacao') {
        renderizarCamposOrganizacao(materia);
    } else if (materia.tipo === 'pi_web') {
        renderizarCamposPIWeb(materia);
    } else if (materia.tipo === 'robotica') {
        renderizarCamposRobotica(materia);
    } else if (materia.tipo === 'teologia') {
        renderizarCamposTeologia(materia);
    } else {
        renderizarCamposGenericos(materia);
    }
}

// Função para renderizar campos específicos de Cálculo 1
function renderizarCamposCalculo1(materia) {
    const config = materiasConfig[materia.nome];
    
    // Renderizar campos teóricos
    const notasTeoricasContainer = document.getElementById('notasTeoricas');
    notasTeoricasContainer.innerHTML = Object.keys(config.formulaTeorica).map(key => {
        const campo = config.formulaTeorica[key];
        // Verificar se há valor válido (não null, não undefined, não string vazia)
        const temValor = materia.notas[key] !== undefined && 
                        materia.notas[key] !== null && 
                        materia.notas[key] !== '' &&
                        !isNaN(parseFloat(materia.notas[key]));
        const valorAtual = temValor ? materia.notas[key] : '';
        
        return `
            <div class="nota-item">
                <label class="nota-label">${campo.label} (Peso: ${(campo.peso * 100).toFixed(0)}%):</label>
                <input type="number" 
                       id="input-${key}"
                       min="0" 
                       max="10" 
                       step="0.1" 
                       ${temValor ? `value="${valorAtual}"` : ''}
                       placeholder="Digite a nota (0.0 a 10.0)"
                       oninput="atualizarNotaCalculo1('${key}', this.value)"
                       onchange="atualizarNotaCalculo1('${key}', this.value)"
                       onfocus="this.select()"
                       onclick="event.stopPropagation()"
                       style="pointer-events: auto; cursor: text;">
            </div>
        `;
    }).join('');
    
    // Renderizar campos práticos
    const notasPraticasContainer = document.getElementById('notasPraticas');
    notasPraticasContainer.innerHTML = Object.keys(config.formulaPratica).map(key => {
        const campo = config.formulaPratica[key];
        // Verificar se há valor válido (não null, não undefined, não string vazia)
        const temValor = materia.notas[key] !== undefined && 
                        materia.notas[key] !== null && 
                        materia.notas[key] !== '' &&
                        !isNaN(parseFloat(materia.notas[key]));
        const valorAtual = temValor ? materia.notas[key] : '';
        
        return `
            <div class="nota-item">
                <label class="nota-label">${campo.label} (Peso: ${(campo.peso * 100).toFixed(0)}%):</label>
                <input type="number" 
                       id="input-${key}"
                       min="0" 
                       max="10" 
                       step="0.1" 
                       ${temValor ? `value="${valorAtual}"` : ''}
                       placeholder="Digite a nota (0.0 a 10.0)"
                       oninput="atualizarNotaCalculo1('${key}', this.value)"
                       onchange="atualizarNotaCalculo1('${key}', this.value)"
                       onfocus="this.select()"
                       onclick="event.stopPropagation()"
                       style="pointer-events: auto; cursor: text;">
            </div>
        `;
    }).join('');
}

// Função para renderizar campos específicos de Organização de Sistemas
function renderizarCamposOrganizacao(materia) {
    const config = materiasConfig[materia.nome];
    
    // Renderizar campos teóricos
    const notasTeoricasContainer = document.getElementById('notasTeoricas');
    notasTeoricasContainer.innerHTML = Object.keys(config.formulaTeorica).map(key => {
        const campo = config.formulaTeorica[key];
        // Verificar se há valor válido (não null, não undefined, não string vazia)
        const temValor = materia.notas[key] !== undefined && 
                        materia.notas[key] !== null && 
                        materia.notas[key] !== '' &&
                        !isNaN(parseFloat(materia.notas[key]));
        const valorAtual = temValor ? materia.notas[key] : '';
        
        return `
            <div class="nota-item">
                <label class="nota-label">${campo.label} (Peso: ${(campo.peso * 100).toFixed(0)}%):</label>
                <input type="number" 
                       id="input-${key}"
                       min="0" 
                       max="10" 
                       step="0.1" 
                       ${temValor ? `value="${valorAtual}"` : ''}
                       placeholder="Digite a nota (0.0 a 10.0)"
                       oninput="atualizarNotaOrganizacao('${key}', this.value)"
                       onchange="atualizarNotaOrganizacao('${key}', this.value)"
                       onfocus="this.select()"
                       onclick="event.stopPropagation()"
                       style="pointer-events: auto; cursor: text;">
            </div>
        `;
    }).join('');
    
    // Renderizar campos práticos
    const notasPraticasContainer = document.getElementById('notasPraticas');
    notasPraticasContainer.innerHTML = Object.keys(config.formulaPratica).map(key => {
        const campo = config.formulaPratica[key];
        // Verificar se há valor válido (não null, não undefined, não string vazia)
        const temValor = materia.notas[key] !== undefined && 
                        materia.notas[key] !== null && 
                        materia.notas[key] !== '' &&
                        !isNaN(parseFloat(materia.notas[key]));
        const valorAtual = temValor ? materia.notas[key] : '';
        
        return `
            <div class="nota-item">
                <label class="nota-label">${campo.label} (Peso: ${(campo.peso * 100).toFixed(0)}%):</label>
                <input type="number" 
                       id="input-${key}"
                       min="0" 
                       max="10" 
                       step="0.1" 
                       ${temValor ? `value="${valorAtual}"` : ''}
                       placeholder="Digite a nota (0.0 a 10.0)"
                       oninput="atualizarNotaOrganizacao('${key}', this.value)"
                       onchange="atualizarNotaOrganizacao('${key}', this.value)"
                       onfocus="this.select()"
                       onclick="event.stopPropagation()"
                       style="pointer-events: auto; cursor: text;">
            </div>
        `;
    }).join('');
}

// Função para renderizar campos específicos de PI Web
function renderizarCamposPIWeb(materia) {
    const config = materiasConfig[materia.nome];
    
    // Renderizar campos teóricos (TF - Trabalho Final)
    const notasTeoricasContainer = document.getElementById('notasTeoricas');
    notasTeoricasContainer.innerHTML = Object.keys(config.formulaTeorica).map(key => {
        const campo = config.formulaTeorica[key];
        // Verificar se há valor válido (não null, não undefined, não string vazia)
        const temValor = materia.notas[key] !== undefined && 
                        materia.notas[key] !== null && 
                        materia.notas[key] !== '' &&
                        !isNaN(parseFloat(materia.notas[key]));
        const valorAtual = temValor ? materia.notas[key] : '';
        
        return `
            <div class="nota-item">
                <label class="nota-label">${campo.label}:</label>
                <input type="number" 
                       id="input-${key}"
                       min="0" 
                       max="10" 
                       step="0.1" 
                       ${temValor ? `value="${valorAtual}"` : ''}
                       placeholder="Digite a nota (0.0 a 10.0)"
                       oninput="atualizarNotaPIWeb('${key}', this.value)"
                       onchange="atualizarNotaPIWeb('${key}', this.value)"
                       onfocus="this.select()"
                       onclick="event.stopPropagation()"
                       style="pointer-events: auto; cursor: text;">
            </div>
        `;
    }).join('');
    
    // Renderizar campos práticos (PTP e TPS)
    const notasPraticasContainer = document.getElementById('notasPraticas');
    notasPraticasContainer.innerHTML = Object.keys(config.formulaPratica).map(key => {
        const campo = config.formulaPratica[key];
        // Verificar se há valor válido (não null, não undefined, não string vazia)
        const temValor = materia.notas[key] !== undefined && 
                        materia.notas[key] !== null && 
                        materia.notas[key] !== '' &&
                        !isNaN(parseFloat(materia.notas[key]));
        const valorAtual = temValor ? materia.notas[key] : '';
        
        return `
            <div class="nota-item">
                <label class="nota-label">${campo.label} (Peso: ${(campo.peso * 100).toFixed(0)}% da MF):</label>
                <input type="number" 
                       id="input-${key}"
                       min="0" 
                       max="10" 
                       step="0.1" 
                       ${temValor ? `value="${valorAtual}"` : ''}
                       placeholder="Digite a nota (0.0 a 10.0)"
                       oninput="atualizarNotaPIWeb('${key}', this.value)"
                       onchange="atualizarNotaPIWeb('${key}', this.value)"
                       onfocus="this.select()"
                       onclick="event.stopPropagation()"
                       style="pointer-events: auto; cursor: text;">
            </div>
        `;
    }).join('');
}

// Função para renderizar campos específicos de Robótica Computacional
function renderizarCamposRobotica(materia) {
    const config = materiasConfig[materia.nome];
    
    // Renderizar campos teóricos
    const notasTeoricasContainer = document.getElementById('notasTeoricas');
    notasTeoricasContainer.innerHTML = Object.keys(config.formulaTeorica).map(key => {
        const campo = config.formulaTeorica[key];
        // Verificar se há valor válido (não null, não undefined, não string vazia)
        const temValor = materia.notas[key] !== undefined && 
                        materia.notas[key] !== null && 
                        materia.notas[key] !== '' &&
                        !isNaN(parseFloat(materia.notas[key]));
        const valorAtual = temValor ? materia.notas[key] : '';
        
        return `
            <div class="nota-item">
                <label class="nota-label">${campo.label} (Peso: ${(campo.peso * 100).toFixed(0)}% da MF):</label>
                <input type="number" 
                       id="input-${key}"
                       min="0" 
                       max="10" 
                       step="0.1" 
                       ${temValor ? `value="${valorAtual}"` : ''}
                       placeholder="Digite a nota (0.0 a 10.0)"
                       oninput="atualizarNotaRobotica('${key}', this.value)"
                       onchange="atualizarNotaRobotica('${key}', this.value)"
                       onfocus="this.select()"
                       onclick="event.stopPropagation()"
                       style="pointer-events: auto; cursor: text;">
            </div>
        `;
    }).join('');
    
    // Renderizar campos práticos
    const notasPraticasContainer = document.getElementById('notasPraticas');
    notasPraticasContainer.innerHTML = `
        <div class="lembrete-projeto5" style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin-bottom: 20px; border-radius: 8px;">
            <strong>⚠️ Lembrete sobre o Projeto 5:</strong>
            <p style="margin: 8px 0 0 0; color: #856404;">
                A nota do Projeto 5 substitui a menor nota entre os Projetos 1, 2, 3 e 4. 
                Se a menor nota foi 2 e você tirou 10 no Projeto 5, a menor nota vira 10.
            </p>
        </div>
        ${Object.keys(config.formulaPratica).map(key => {
            const campo = config.formulaPratica[key];
            // Verificar se há valor válido (não null, não undefined, não string vazia)
            const temValor = materia.notas[key] !== undefined && 
                            materia.notas[key] !== null && 
                            materia.notas[key] !== '' &&
                            !isNaN(parseFloat(materia.notas[key]));
            const valorAtual = temValor ? materia.notas[key] : '';
            
            const isP5 = key === 'P5';
            const labelExtra = isP5 ? ' (substitui a menor nota entre P1-P4)' : '';
            
            return `
                <div class="nota-item">
                    <label class="nota-label">${campo.label}${labelExtra}:</label>
                    <input type="number" 
                           id="input-${key}"
                           min="0" 
                           max="10" 
                           step="0.1" 
                           ${temValor ? `value="${valorAtual}"` : ''}
                           placeholder="Digite a nota (0.0 a 10.0)"
                           oninput="atualizarNotaRobotica('${key}', this.value)"
                           onchange="atualizarNotaRobotica('${key}', this.value)"
                           onfocus="this.select()"
                           onclick="event.stopPropagation()"
                           style="pointer-events: auto; cursor: text;">
                </div>
            `;
        }).join('')}
    `;
}

// Função para renderizar campos específicos de Teologia
function renderizarCamposTeologia(materia) {
    const config = materiasConfig[materia.nome];
    
    // Renderizar campos teóricos
    const notasTeoricasContainer = document.getElementById('notasTeoricas');
    notasTeoricasContainer.innerHTML = Object.keys(config.formulaTeorica).map(key => {
        const campo = config.formulaTeorica[key];
        // Verificar se há valor válido (não null, não undefined, não string vazia)
        const temValor = materia.notas[key] !== undefined && 
                        materia.notas[key] !== null && 
                        materia.notas[key] !== '' &&
                        !isNaN(parseFloat(materia.notas[key]));
        const valorAtual = temValor ? materia.notas[key] : '';
        
        return `
            <div class="nota-item">
                <label class="nota-label">${campo.label}:</label>
                <input type="number" 
                       id="input-${key}"
                       min="0" 
                       max="4" 
                       step="0.1" 
                       ${temValor ? `value="${valorAtual}"` : ''}
                       placeholder="Digite a nota (0.0 a 4.0)"
                       oninput="atualizarNotaTeologia('${key}', this.value)"
                       onchange="atualizarNotaTeologia('${key}', this.value)"
                       onfocus="this.select()"
                       onclick="event.stopPropagation()"
                       style="pointer-events: auto; cursor: text;">
            </div>
        `;
    }).join('');
    
    // Renderizar campos práticos
    const notasPraticasContainer = document.getElementById('notasPraticas');
    notasPraticasContainer.innerHTML = Object.keys(config.formulaPratica).map(key => {
        const campo = config.formulaPratica[key];
        // Verificar se há valor válido (não null, não undefined, não string vazia)
        const temValor = materia.notas[key] !== undefined && 
                        materia.notas[key] !== null && 
                        materia.notas[key] !== '' &&
                        !isNaN(parseFloat(materia.notas[key]));
        const valorAtual = temValor ? materia.notas[key] : '';
        
        const maxValue = key === 'AvaliacaoEscrita' || key === 'EntrevistaOral' ? 3 : 10;
        const placeholder = `Digite a nota (0.0 a ${maxValue}.0)`;
        
        return `
            <div class="nota-item">
                <label class="nota-label">${campo.label}:</label>
                <input type="number" 
                       id="input-${key}"
                       min="0" 
                       max="${maxValue}" 
                       step="0.1" 
                       ${temValor ? `value="${valorAtual}"` : ''}
                       placeholder="${placeholder}"
                       oninput="atualizarNotaTeologia('${key}', this.value)"
                       onchange="atualizarNotaTeologia('${key}', this.value)"
                       onfocus="this.select()"
                       onclick="event.stopPropagation()"
                       style="pointer-events: auto; cursor: text;">
            </div>
        `;
    }).join('');
}

// Função para renderizar campos genéricos
function renderizarCamposGenericos(materia) {
    // Garantir que os arrays existam
    if (!materia.notas.teoricas) materia.notas.teoricas = [];
    if (!materia.notas.praticas) materia.notas.praticas = [];
    
    // Renderizar notas teóricas
    const notasTeoricasContainer = document.getElementById('notasTeoricas');
    if (materia.notas.teoricas.length === 0) {
        notasTeoricasContainer.innerHTML = `
            <div class="empty-state">Nenhuma nota teórica adicionada ainda.</div>
            <button class="btn-adicionar-nota" onclick="adicionarNotaGenerica('teoricas')">+ Adicionar Nota Teórica</button>
        `;
    } else {
        notasTeoricasContainer.innerHTML = materia.notas.teoricas.map((nota, notaIndex) => `
            <div class="nota-item">
                <span>Nota ${notaIndex + 1}:</span>
                <input type="number" 
                       min="0" 
                       max="10" 
                       step="0.1" 
                       value="${nota}" 
                       oninput="atualizarNotaGenerica('teoricas', ${notaIndex}, this.value)"
                       onchange="atualizarNotaGenerica('teoricas', ${notaIndex}, this.value)">
                <button class="btn-remover" onclick="removerNotaGenerica('teoricas', ${notaIndex})">Remover</button>
            </div>
        `).join('') + `
            <button class="btn-adicionar-nota" onclick="adicionarNotaGenerica('teoricas')">+ Adicionar Nota Teórica</button>
        `;
    }
    
    // Renderizar notas práticas
    const notasPraticasContainer = document.getElementById('notasPraticas');
    if (materia.notas.praticas.length === 0) {
        notasPraticasContainer.innerHTML = `
            <div class="empty-state">Nenhuma nota prática adicionada ainda.</div>
            <button class="btn-adicionar-nota" onclick="adicionarNotaGenerica('praticas')">+ Adicionar Nota Prática</button>
        `;
    } else {
        notasPraticasContainer.innerHTML = materia.notas.praticas.map((nota, notaIndex) => `
            <div class="nota-item">
                <span>Nota ${notaIndex + 1}:</span>
                <input type="number" 
                       min="0" 
                       max="10" 
                       step="0.1" 
                       value="${nota}" 
                       oninput="atualizarNotaGenerica('praticas', ${notaIndex}, this.value)"
                       onchange="atualizarNotaGenerica('praticas', ${notaIndex}, this.value)">
                <button class="btn-remover" onclick="removerNotaGenerica('praticas', ${notaIndex})">Remover</button>
            </div>
        `).join('') + `
            <button class="btn-adicionar-nota" onclick="adicionarNotaGenerica('praticas')">+ Adicionar Nota Prática</button>
        `;
    }
}

// Função para atualizar nota de Cálculo 1
function atualizarNotaCalculo1(campo, valor) {
    if (materiaSelecionadaIndex === -1) return;
    
    const materia = alunoAtual.materias[materiaSelecionadaIndex];
    
    // Se o valor estiver vazio, salvar como string vazia mas ainda calcular
    if (valor === '' || valor === null || valor === undefined || valor.trim() === '') {
        materia.notas[campo] = '';
        // Atualizar apenas os cálculos, não re-renderizar tudo
        atualizarApenasMedias();
        return;
    }
    
    let nota = parseFloat(valor);
    
    // Validar nota
    if (isNaN(nota)) {
        materia.notas[campo] = '';
        atualizarApenasMedias();
        return;
    }
    
    // Limitar entre 0 e 10
    if (nota < 0) {
        nota = 0;
    } else if (nota > 10) {
        nota = 10;
        // Atualizar o campo visualmente
        const input = document.getElementById(`input-${campo}`);
        if (input) input.value = 10;
    }
    
    // Salvar a nota
    materia.notas[campo] = nota;
    
    // Atualizar apenas os cálculos (mais rápido, sem re-renderizar os campos)
    atualizarApenasMedias();
}

// Função para atualizar nota de PI Web
function atualizarNotaPIWeb(campo, valor) {
    if (materiaSelecionadaIndex === -1) return;
    
    const materia = alunoAtual.materias[materiaSelecionadaIndex];
    
    // Se o valor estiver vazio, salvar como string vazia mas ainda calcular
    if (valor === '' || valor === null || valor === undefined || valor.trim() === '') {
        materia.notas[campo] = '';
        // Atualizar apenas os cálculos, não re-renderizar tudo
        atualizarApenasMedias();
        return;
    }
    
    let nota = parseFloat(valor);
    
    // Validar nota
    if (isNaN(nota)) {
        materia.notas[campo] = '';
        atualizarApenasMedias();
        return;
    }
    
    // Limitar entre 0 e 10
    if (nota < 0) {
        nota = 0;
    } else if (nota > 10) {
        nota = 10;
        // Atualizar o campo visualmente
        const input = document.getElementById(`input-${campo}`);
        if (input) input.value = 10;
    }
    
    // Salvar a nota
    materia.notas[campo] = nota;
    
    // Atualizar apenas os cálculos (mais rápido, sem re-renderizar os campos)
    atualizarApenasMedias();
}

// Função para atualizar nota de Robótica Computacional
function atualizarNotaRobotica(campo, valor) {
    if (materiaSelecionadaIndex === -1) return;
    
    const materia = alunoAtual.materias[materiaSelecionadaIndex];
    
    // Se o valor estiver vazio, salvar como string vazia mas ainda calcular
    if (valor === '' || valor === null || valor === undefined || valor.trim() === '') {
        materia.notas[campo] = '';
        // Atualizar apenas os cálculos, não re-renderizar tudo
        atualizarApenasMedias();
        return;
    }
    
    let nota = parseFloat(valor);
    
    // Validar nota
    if (isNaN(nota)) {
        materia.notas[campo] = '';
        atualizarApenasMedias();
        return;
    }
    
    // Limitar entre 0 e 10
    if (nota < 0) {
        nota = 0;
    } else if (nota > 10) {
        nota = 10;
        // Atualizar o campo visualmente
        const input = document.getElementById(`input-${campo}`);
        if (input) input.value = 10;
    }
    
    // Salvar a nota
    materia.notas[campo] = nota;
    
    // Atualizar apenas os cálculos (mais rápido, sem re-renderizar os campos)
    atualizarApenasMedias();
}

// Função para atualizar nota de Teologia
function atualizarNotaTeologia(campo, valor) {
    if (materiaSelecionadaIndex === -1) return;
    
    const materia = alunoAtual.materias[materiaSelecionadaIndex];
    
    // Se o valor estiver vazio, salvar como string vazia mas ainda calcular
    if (valor === '' || valor === null || valor === undefined || valor.trim() === '') {
        materia.notas[campo] = '';
        // Atualizar apenas os cálculos, não re-renderizar tudo
        atualizarApenasMedias();
        return;
    }
    
    let nota = parseFloat(valor);
    
    // Validar nota
    if (isNaN(nota)) {
        materia.notas[campo] = '';
        atualizarApenasMedias();
        return;
    }
    
    // Limitar conforme o campo
    let maxValue = 10;
    if (campo === 'Fichamentos') {
        maxValue = 4;
    } else if (campo === 'AvaliacaoEscrita' || campo === 'EntrevistaOral') {
        maxValue = 3;
    }
    
    if (nota < 0) {
        nota = 0;
    } else if (nota > maxValue) {
        nota = maxValue;
        // Atualizar o campo visualmente
        const input = document.getElementById(`input-${campo}`);
        if (input) input.value = maxValue;
    }
    
    // Salvar a nota
    materia.notas[campo] = nota;
    
    // Atualizar apenas os cálculos (mais rápido, sem re-renderizar os campos)
    atualizarApenasMedias();
}

// Função para atualizar nota de Organização de Sistemas
function atualizarNotaOrganizacao(campo, valor) {
    if (materiaSelecionadaIndex === -1) return;
    
    const materia = alunoAtual.materias[materiaSelecionadaIndex];
    
    // Se o valor estiver vazio, salvar como string vazia mas ainda calcular
    if (valor === '' || valor === null || valor === undefined || valor.trim() === '') {
        materia.notas[campo] = '';
        // Atualizar apenas os cálculos, não re-renderizar tudo
        atualizarApenasMedias();
        return;
    }
    
    let nota = parseFloat(valor);
    
    // Validar nota
    if (isNaN(nota)) {
        materia.notas[campo] = '';
        atualizarApenasMedias();
        return;
    }
    
    // Limitar entre 0 e 10
    if (nota < 0) {
        nota = 0;
    } else if (nota > 10) {
        nota = 10;
        // Atualizar o campo visualmente
        const input = document.getElementById(`input-${campo}`);
        if (input) input.value = 10;
    }
    
    // Salvar a nota
    materia.notas[campo] = nota;
    
    // Atualizar apenas os cálculos (mais rápido, sem re-renderizar os campos)
    atualizarApenasMedias();
}

// Funções para gerenciar notas genéricas
function adicionarNotaGenerica(tipo) {
    if (materiaSelecionadaIndex === -1) return;
    
    const materia = alunoAtual.materias[materiaSelecionadaIndex];
    materia.notas[tipo].push(0);
    atualizarDetalhesMateria();
}

function atualizarNotaGenerica(tipo, notaIndex, valor) {
    if (materiaSelecionadaIndex === -1) return;
    
    const materia = alunoAtual.materias[materiaSelecionadaIndex];
    
    // Garantir que o array existe
    if (!materia.notas[tipo]) {
        materia.notas[tipo] = [];
    }
    
    // Se o valor estiver vazio, usar 0
    if (valor === '' || valor === null || valor === undefined) {
        materia.notas[tipo][notaIndex] = 0;
        atualizarDetalhesMateria();
        return;
    }
    
    let nota = parseFloat(valor);
    
    // Validar nota
    if (isNaN(nota)) {
        nota = 0;
    } else if (nota < 0) {
        nota = 0;
    } else if (nota > 10) {
        nota = 10;
    }
    
    materia.notas[tipo][notaIndex] = nota;
    atualizarDetalhesMateria();
}

function removerNotaGenerica(tipo, notaIndex) {
    if (materiaSelecionadaIndex === -1) return;
    
    const materia = alunoAtual.materias[materiaSelecionadaIndex];
    materia.notas[tipo].splice(notaIndex, 1);
    atualizarDetalhesMateria();
}

// Funções legadas (mantidas para compatibilidade, mas não usadas para Cálculo 1)
function adicionarNotaTeorica() {
    if (materiaSelecionadaIndex === -1) return;
    const materia = alunoAtual.materias[materiaSelecionadaIndex];
    if (materia.tipo === 'calculo1') return;
    adicionarNotaGenerica('teoricas');
}

function adicionarNotaPratica() {
    if (materiaSelecionadaIndex === -1) return;
    const materia = alunoAtual.materias[materiaSelecionadaIndex];
    if (materia.tipo === 'calculo1') return;
    adicionarNotaGenerica('praticas');
}

// Função para enviar feedback
function enviarFeedback(event) {
    event.preventDefault();
    
    const mensagem = document.getElementById('mensagemFeedback').value.trim();
    const feedbackMensagem = document.getElementById('feedbackMensagem');
    
    if (mensagem === '') {
        feedbackMensagem.textContent = 'Por favor, digite sua mensagem antes de enviar.';
        feedbackMensagem.className = 'feedback-mensagem erro';
        feedbackMensagem.style.display = 'block';
        return;
    }
    
    // Criar link mailto com assunto e corpo da mensagem
    const assunto = encodeURIComponent('Dicas de Melhorias - AvaliaPucc');
    const corpo = encodeURIComponent(`Olá,\n\nGostaria de compartilhar as seguintes sugestões de melhorias para o site:\n\n${mensagem}\n\nAtenciosamente,\n${alunoAtual.nome || 'Usuário'}\nRA: ${alunoAtual.ra || 'N/A'}`);
    const email = 'avaliapuc@gmail.com';
    
    const mailtoLink = `mailto:${email}?subject=${assunto}&body=${corpo}`;
    
    // Abrir cliente de email
    window.location.href = mailtoLink;
    
    // Mostrar mensagem de sucesso
    feedbackMensagem.textContent = 'Cliente de email aberto! Preencha e envie sua mensagem.';
    feedbackMensagem.className = 'feedback-mensagem sucesso';
    feedbackMensagem.style.display = 'block';
    
    // Limpar formulário após 3 segundos
    setTimeout(() => {
        document.getElementById('feedbackForm').reset();
        feedbackMensagem.style.display = 'none';
    }, 5000);
}

// Inicializar ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    // Permitir acessar matérias pressionando Enter nos campos
    document.getElementById('nomeAluno').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('raAluno').focus();
        }
    });
    
    document.getElementById('raAluno').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            acessarMaterias();
        }
    });
});
