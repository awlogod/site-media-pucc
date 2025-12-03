# 🔥 Guia de Configuração do Firebase

Este guia explica como configurar o Firebase Firestore para o fórum funcionar em produção.

## 📋 Pré-requisitos

- Conta Google (para acessar Firebase Console)
- Acesso à internet

## 🚀 Passo a Passo

### 1. Criar Projeto no Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em **"Adicionar projeto"** ou **"Add project"**
3. Digite o nome do projeto (ex: "avaliapucc-forum")
4. Aceite os termos e clique em **"Continuar"**
5. Desative o Google Analytics (ou mantenha ativado, se preferir)
6. Clique em **"Criar projeto"**

### 2. Criar Aplicativo Web

1. No painel do projeto, clique no ícone **Web (</>)** ou **"Add app"** > **Web**
2. Registre o app com um nome (ex: "AvaliaPucc Web")
3. **NÃO** marque a opção "Also set up Firebase Hosting"
4. Clique em **"Registrar app"**

### 3. Copiar Credenciais

Após registrar o app, você verá um objeto `firebaseConfig` com suas credenciais. Copie essas informações.

### 4. Configurar Firestore Database

1. No menu lateral, clique em **"Firestore Database"**
2. Clique em **"Criar banco de dados"**
3. Escolha **"Começar no modo de teste"** (para desenvolvimento)
4. Selecione a localização do servidor (escolha a mais próxima do Brasil, como `southamerica-east1`)
5. Clique em **"Ativar"**

### 5. Configurar Regras de Segurança

1. Na aba **"Regras"** do Firestore, cole as seguintes regras:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir leitura e escrita para todos (ajuste conforme necessário)
    match /forumMensagens/{document=**} {
      allow read, write: if true;
    }
  }
}
```

2. Clique em **"Publicar"**

⚠️ **IMPORTANTE**: Essas regras permitem que qualquer pessoa leia e escreva no fórum. Para produção, você deve implementar autenticação e regras mais restritivas.

### 6. Configurar o Site

1. Abra o arquivo `index.html`
2. Localize a seção com o comentário `<!-- Firebase SDK -->`
3. Substitua os valores do `firebaseConfig` com suas credenciais:

```javascript
const firebaseConfig = {
    apiKey: "SUA_API_KEY_AQUI",
    authDomain: "seu-projeto.firebaseapp.com",
    projectId: "seu-projeto-id",
    storageBucket: "seu-projeto.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef1234567890"
};
```

### 7. Testar

1. Abra o site no navegador
2. Faça login com nome e RA
3. Tente adicionar uma mensagem no fórum
4. Verifique se a mensagem aparece e se persiste após recarregar a página

## 🔒 Segurança (Opcional - Recomendado para Produção)

Para melhorar a segurança, você pode:

1. **Implementar Autenticação Firebase**:
   - Adicionar login com email/senha ou Google
   - Modificar as regras do Firestore para exigir autenticação

2. **Regras de Segurança Mais Restritivas**:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /forumMensagens/{document=**} {
      // Permitir leitura para todos
      allow read: if true;
      // Permitir escrita apenas para usuários autenticados
      allow write: if request.auth != null;
    }
  }
}
```

3. **Limitar Tamanho das Mensagens**:
   - Adicionar validação no código JavaScript
   - Limitar caracteres no textarea

## 📊 Monitoramento

- Acesse o Firebase Console para ver as mensagens sendo criadas
- Monitore o uso do Firestore na aba "Uso"
- Configure alertas se necessário

## 💰 Custos

O Firebase tem um **plano gratuito generoso**:
- 50.000 leituras/dia
- 20.000 escritas/dia
- 20.000 exclusões/dia
- 1 GB de armazenamento

Para a maioria dos casos, o plano gratuito é suficiente.

## 🆘 Problemas Comuns

### Erro: "Firebase: Error (auth/unauthorized-domain)"
- **Solução**: Adicione seu domínio em Firebase Console > Authentication > Settings > Authorized domains

### Erro: "Firebase: Error (permission-denied)"
- **Solução**: Verifique as regras do Firestore e certifique-se de que estão publicadas

### Mensagens não aparecem
- **Solução**: Verifique o console do navegador (F12) para erros
- Certifique-se de que o Firestore está ativado
- Verifique se as credenciais estão corretas

## 📝 Notas

- As mensagens são armazenadas no Firestore e são compartilhadas entre todos os usuários
- O sistema tem fallback para localStorage se o Firebase não estiver configurado
- As mensagens são ordenadas por data (mais recentes primeiro)

