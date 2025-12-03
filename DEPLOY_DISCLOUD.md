# 🚀 Como Publicar na Discloud

## Passo a Passo para Deploy na Discloud

### 1. Preparar os Arquivos
Certifique-se de que todos os arquivos estão na pasta do projeto:
- ✅ index.html
- ✅ style.css
- ✅ script.js
- ✅ logo.png
- ✅ discloud.json
- ✅ package.json

### 2. Criar Conta na Discloud
1. Acesse [discloud.app](https://discloud.app) ou o site oficial da Discloud
2. Crie uma conta ou faça login
3. Acesse o painel de controle

### 3. Fazer Upload dos Arquivos

#### Opção A: Via Interface Web
1. No painel da Discloud, clique em "Novo Site" ou "Upload"
2. Selecione todos os arquivos do projeto
3. Faça upload do arquivo ZIP ou arraste os arquivos
4. Aguarde o processamento

#### Opção B: Via ZIP
1. Compacte todos os arquivos em um arquivo ZIP
2. Nomeie como `avaliapucc.zip`
3. Faça upload do ZIP na Discloud

### 4. Configurações Importantes
- **Tipo de Site**: Estático (Static)
- **Arquivo Principal**: index.html
- **Pasta Raiz**: / (raiz)

### 5. Verificar Deploy
Após o upload, a Discloud fornecerá uma URL para acessar seu site, algo como:
```
https://seu-site.discloud.app
```

## 📋 Checklist de Arquivos

Antes de fazer upload, verifique se tem:
- [ ] index.html
- [ ] style.css
- [ ] script.js
- [ ] logo.png
- [ ] discloud.config
- [ ] discloud.json
- [ ] package.json (opcional)
- [ ] .htaccess (opcional)

## ⚠️ Observações Importantes

1. **Caminhos Relativos**: Todos os caminhos no HTML devem ser relativos (ex: `style.css`, não `/style.css`)
2. **Arquivo Principal**: O arquivo principal DEVE se chamar `index.html`
3. **Tamanho**: Verifique o limite de tamanho de arquivos da Discloud
4. **HTTPS**: A Discloud geralmente fornece HTTPS automaticamente

## 🔧 Troubleshooting

### Site não carrega
- Verifique se o arquivo principal é `index.html`
- Confirme que todos os caminhos estão corretos
- Verifique o console do navegador para erros

### CSS/JS não carrega
- Verifique se os caminhos nos arquivos HTML estão corretos
- Certifique-se de que os arquivos foram enviados corretamente
- Limpe o cache do navegador (Ctrl+F5)

### Logo não aparece
- Verifique se o arquivo logo.png foi enviado
- Confirme o caminho no HTML: `src="logo.png"`

## 📞 Suporte

Para problemas com a Discloud, consulte:
- Documentação oficial da Discloud
- Suporte da plataforma

---

**Desenvolvido por André Wilckay em 2025**

