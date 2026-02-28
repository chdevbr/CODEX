# 📖 CODEX - Gamificando a Jornada da Leitura

O **Codex** é uma plataforma focada em incentivar o hábito da leitura em ambientes escolares através de desafios, conquistas e um sistema de ranking competitivo. Este repositório contém todo o ecossistema frontend do projeto.

---

## 👥 Membros da Equipe e Responsabilidades
Abaixo estão os talentos responsáveis por dar vida ao Codex, com os papéis redistribuídos para máxima eficiência:

| Membro | Papel | Responsabilidades Principais |
| :--- | :--- | :--- |
| **Carlos Farias** | Tech Lead e PO | Liderança técnica, priorização do backlog, validação de entregas e aprovação de PRs. |
| **Lucas Segundo** | Scrum Master | Organização das Sprints, acompanhamento de tarefas e remoção de impedimentos. |
| **Cecília Victória** | UX/UI Designer | Identidade visual, design no Figma, escolha de cores e tipografia. |
| **Emanoel Alesandro** | Analista de Sistemas | Documentação funcional, histórias de usuário e critérios de aceitação. |
| **Boniek Araújo** | Desenvolvedor | Implementação das páginas, componentes e lógica JavaScript. |
| **Breno Cruz** | Desenvolvedor | Desenvolvimento de funcionalidades de interface e suporte técnico. |
| **Lucas Barreto** | Desenvolvedor | Implementação de componentes reutilizáveis e ajustes de interface. |
| **Gabriel Gomes** | Desenvolvedor | Integração de páginas e organização estrutural do projeto. |
| **Letícia Gomes** | QA (Quality Assurance) | Testes funcionais, validação de responsividade e checklist de qualidade. |
| **Eloi de Lima** | QA (Quality Assurance) | Testes de usabilidade, busca de bugs e garantia do "Definition of Done". |

---

## 🛠️ Stack Técnica e Estrutura
O projeto utiliza tecnologias puras para máxima performance e padronização via Docker.

* **Linguagens:** HTML5, CSS3 e JavaScript (ES6+).
* **Ambiente:** Servidor Nginx isolado via Docker.
* **Arquitetura de Pastas:**
    * `/.github`: Configurações de automação e CODEOWNERS.
    * `/assets`: Recursos visuais e mídias.
    * `/css`: Folhas de estilo (Global e Componentes).
    * `/js`: Lógica de interatividade e gamificação.
    * `/pages`: Visualização das rotas internas do app.

---

## 📈 Gestão e Planejamento
Utilizamos metodologias ágeis para garantir a entrega em 2 semanas.

* **Quadro de Atividades:** Gerenciado via [Trello da Equipe CODEX](https://trello.com/invite/b/699ef7952f9943a9f39511e2/ATTI409aee3d7f04486af5bfda6972cf2472700E44DB/codex).
* **Protótipo:** Desenvolvido no [Figma Oficial](https://www.figma.com/make/ygoYdoYVmqEq1JK2IccSho/Aplicativo-de-Incentivo-%C3%A0-Leitura?t=02OxOyB45PIyJDpr-20&fullscreen=1).

### ⚠️ Mapeamento de Riscos
| Risco | Impacto | Responsável | Plano de Contingência |
| :--- | :--- | :--- | :--- |
| Atraso na entrega | Alto | Scrum Master | Replanejamento da sprint. |
| Falta de comunicação | Médio | PO (Carlos Farias) | Reuniões semanais (Syncs). |
| Problemas técnicos | Alto | Tech Lead (Carlos Farias) | Suporte técnico imediato e revisão de código. |
| Indisponibilidade de membro | Médio | Scrum Master | Redistribuição de tarefas entre os desenvolvedores. |

---

## ✅ Checklist de Qualidade (Definition of Done)
Para que uma tarefa seja considerada "Pronta", ela deve cumprir os seguintes critérios:

- [ ] Código revisado por outro membro.
- [ ] Testes funcionais realizados.
- [ ] Sem erros no console do navegador.
- [ ] Funcionalidade validada pelo QA (Letícia ou Eloi).
- [ ] Documentação atualizada.
- [ ] Deploy (Docker) funcionando.

---

## 🚀 Como Executar o Projeto
Certifique-se de ter o **Docker Desktop** instalado.

1.  Clone o repositório: `git clone https://github.com/chdevbr/CODEX.git`
2.  Entre na pasta: `cd codex`
3.  Suba o ambiente: `docker build -t codex-app .`
4.  Rode o container: `docker run -d -p 8080:80 --name meu-codex codex-app`
5.  Acesse: `http://localhost:8080`

*(Se você alterar algum arquivo HTML/CSS/JS, basta dar **F5 no navegador** para ver a mudança).*

---

## 💻 Fluxo de Trabalho (Git Flow)

**⚠️ REGRA DE OURO: NINGUÉM FAZ COMMIT DIRETO NA BRANCH `main`.** A `main` está protegida. Todo código precisa passar pela aprovação do Tech Lead e ser testado pelos QAs.

Sempre que um desenvolvedor (Boniek, Breno, Lucas ou Gabriel) for começar uma tarefa, deve seguir este ciclo:

**1. Atualize sua máquina com a versão mais recente**
```bash
git checkout main
git pull origin main
```

**2. Crie uma branch para a sua tarefa**
```bash
# Use o prefixo feat/ (nova funcionalidade) ou fix/ (correção de bug)
git checkout -b feat/nome-da-sua-tarefa
```

**3. Programe e salve (Commit)**
```bash
git add .
git commit -m "feat: adiciona barra de navegacao inferior"
```

**4. Envie para o GitHub**
```bash
git push -u origin feat/nome-da-sua-tarefa
```

**5. Abra o Pull Request (PR)**
Vá até o GitHub, clique em "Compare & pull request".
- Adicione o Carlos Farias como Reviewer.
- Na descrição, escreva Closes #NumeroDaIssue para fechar a tarefa automaticamente.
- Marque a Letícia ou o Eloi para QA.

---

## Comandos Úteis (Docker)
```bash
# Ver quais containers estão rodando
docker ps

# Parar o container do projeto (se a porta 8080 travar)
docker stop meu-codex

# Apagar o container (para rodar do zero)
docker rm meu-codex

# Criar uma Imagem (a "forma" ou a receita do projeto) / Empacota o projeto com o servidor.
docker build -t codex-app .

# Ligar o servidor e jogar a tela para o seu navegador no localhost:8080.
docker run -d -p 8080:80 --name meu-codex codex-app
```
---

## Errou na Branch do Git?
```bash
# Ver em qual branch você está agora
git branch

# Desfazer alterações que você ainda não deu commit
git restore .
```
