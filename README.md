# 📖 CODEX - Incentivando a Leitura de Forma Divertida

Bem-vindo ao repositório frontend do **Codex**. Este projeto utiliza HTML, CSS e JavaScript puros, estruturado 
para ser executado através de Docker.

## 🚀 Como correr o projeto na sua máquina

Para garantir que o ambiente é igual para todos, utilizamos Docker.

1. Clone o repositório:
   `git clone https://github.com/chdevbr/CODEX.git`
2. Entre na pasta do projeto:
   `cd CODEX`
3. Construa a imagem Docker:
   `docker build -t codex-app .`
4. Execute o contentor:
   `docker run -d -p 8080:80 --name meu-codex codex-app`

Acesse `http://localhost:8080` no seu navegador.

## 🛠️ Fluxo de Trabalho (Pull Requests)
- Ninguém faz commits diretamente na `main`.
- Crie uma branch para a sua tarefa: `git checkout -b feature/nome-da-tarefa`
- Faça o commit, envie para o GitHub e abra um **Pull Request**.
- Indique o número da Issue que resolve (ex: `Closes #3`).
- **Atenção:** Todos os PRs requerem a revisão e aprovação do Tech Lead (@chdevbr).