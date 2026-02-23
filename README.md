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
| **Emanoel Alessandro** | Analista de Sistemas | Documentação funcional, histórias de usuário e critérios de aceitação. |
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

* **Quadro de Atividades:** Gerenciado via **Trello**.
* **Protótipo:** Desenvolvido no **Figma**.

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
