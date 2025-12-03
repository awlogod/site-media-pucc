# 📚 AvaliaPucc - Calculadora de Médias

Calculadora web para gerenciar notas e calcular médias por matéria dos alunos da PUC Campinas.

## 🚀 Como Publicar o Site

### Opção 1: GitHub Pages (Gratuito)

### Passo 1: Verificar se o repositório está no GitHub
1. Acesse [github.com](https://github.com)
2. Verifique se seu repositório já existe
3. Se não existir, crie um novo repositório

### Passo 2: Fazer commit e push dos arquivos
```bash
# Se ainda não inicializou o git
git init
git add .
git commit -m "Primeira versão do site AvaliaPucc"

# Adicionar o repositório remoto (substitua SEU_USUARIO e NOME_REPOSITORIO)
git remote add origin https://github.com/SEU_USUARIO/NOME_REPOSITORIO.git
git branch -M main
git push -u origin main
```

### Passo 3: Ativar o GitHub Pages
1. No GitHub, vá até seu repositório
2. Clique em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Source** (Origem), selecione:
   - **Branch**: `main` (ou `master`)
   - **Folder**: `/ (root)` ou `/docs` (se seus arquivos estiverem em uma pasta docs)
5. Clique em **Save** (Salvar)

### Passo 4: Acessar seu site
Após alguns minutos, seu site estará disponível em:
```
https://SEU_USUARIO.github.io/NOME_REPOSITORIO/
```

**Exemplo**: Se seu usuário é `andre-wilckay` e o repositório é `site_medias`, a URL será:
```
https://andre-wilckay.github.io/site_medias/
```

## 📝 Estrutura do Projeto

```
site_medias/
├── index.html      # Página principal
├── style.css       # Estilos do site
├── script.js       # Lógica JavaScript
├── logo.png        # Logo do site
└── README.md       # Este arquivo
```

## ✨ Funcionalidades

- ✅ Cálculo de médias por matéria
- ✅ Fórmulas específicas para cada disciplina
- ✅ Interface moderna e responsiva
- ✅ Validação de RA (8 dígitos)
- ✅ Sistema de feedback para melhorias

## 🎓 Matérias Suportadas

1. **Cálculo 1** - Fórmulas específicas de média teórica e prática
2. **Organização de Sistemas de Computação** - Cálculo com condições
3. **PI: Desenvolvimento de Sistemas Web** - Trabalho Final e avaliações
4. **Robótica Computacional** - Testes e projetos com lógica especial
5. **Teologia e Fenômeno Humano** - Sistema de pontos

### Opção 2: Discloud (Gratuito)

Para publicar na Discloud, consulte o arquivo **[DEPLOY_DISCLOUD.md](./DEPLOY_DISCLOUD.md)** que contém instruções detalhadas.

**Arquivos necessários já incluídos:**
- ✅ `discloud.json` - Configuração da Discloud
- ✅ `package.json` - Metadados do projeto
- ✅ `.htaccess` - Configurações do servidor (se necessário)

**Passos rápidos:**
1. Acesse [discloud.app](https://discloud.app)
2. Faça login ou crie uma conta
3. Faça upload de todos os arquivos do projeto
4. Aguarde o processamento
5. Acesse seu site pela URL fornecida

## 📧 Contato

Para sugestões e melhorias: avaliapuc@gmail.com

## 📄 Licença

© 2025 André Wilckay. Todos os direitos reservados.

