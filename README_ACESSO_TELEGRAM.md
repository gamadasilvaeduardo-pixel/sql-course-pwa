# Acesso e Telegram

- Login admin inicial: `admin` / `admin123`.
- No primeiro login o app obriga troca de senha.
- Usuários seguem o padrão `nome.sobrenome`.
- A tela **Solicitar acesso** gera usuário/senha inicial e tenta enviar ao Telegram.
- Para ativar Telegram, copie `.env.example` para `.env` e preencha `VITE_TELEGRAM_BOT_TOKEN` e `VITE_TELEGRAM_CHAT_ID`.

Observação: app PWA estático não consegue esconder token no frontend. Para uso público, use backend/proxy.
