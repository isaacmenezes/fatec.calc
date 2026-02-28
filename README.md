![Status do Projeto](https://img.shields.io/badge/Status-Em%20Andamento-brightgreen?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

# fatec.calc

O **fatec.calc** é uma ferramenta desenvolvida de forma independente para ajudar os candidatos do vestibular da FATEC a calcularem e simularem as suas notas. 

A ideia surgiu de uma necessidade real: durante a minha própria espera pelos resultados da prova, percebi que com as recentes mudanças no formato do vestibular da FATEC, as ferramentas e calculadoras antigas disponíveis na internet deixaram de funcionar corretamente. Para preencher esta lacuna e ajudar outros estudantes, desenvolvi este projeto do zero.

---

## Funcionalidades

O aplicativo foi desenhado para ser simples e direto ao ponto, contando com duas frentes principais:

* **Simulador de Notas:** Uma interface intuitiva onde o candidato insere os seus acertos e dados para prever a sua pontuação final no vestibular.
* **Como funciona o cálculo:** Uma secção educativa detalhando as regras do vestibular atual, pesos das disciplinas, sistema de pontuação acrescida (escolaridade pública/afrodescendência) e como a nota final é matematicamente definida.

---

## Tecnologias Utilizadas

Este projeto foi construído utilizando as ferramentas mais modernas do ecossistema front-end:

* **[Next.js](https://nextjs.org/)** - Framework React com renderização otimizada.
* **[React](https://reactjs.org/)** - Biblioteca para construção de interfaces de utilizador.
* **[TypeScript](https://www.typescriptlang.org/)** - Superset do JavaScript que adiciona tipagem estática, garantindo um código mais seguro.
* **[Tailwind CSS](https://tailwindcss.com/)** - Framework de CSS utilitário para uma estilização rápida e responsiva.

---

## Estrutura do Projeto

Abaixo está um resumo da arquitetura dos componentes principais (`/components` e `/hooks`), separados para manter a responsabilidade do código limpa e modular:

```text
fatec.calc/
 ┣ components/
 ┃ ┣ ui/                  # Componentes base de interface (botões, inputs, etc.)
 ┃ ┣ AboutView.tsx        # View explicando o projeto / como o cálculo funciona
 ┃ ┣ CalculatorForm.tsx   # Formulário para entrada dos dados do candidato
 ┃ ┣ CalculatorResult.tsx # View para exibição detalhada do resultado final
 ┃ ┣ DesktopSidebar.tsx   # Navegação lateral para ecrãs grandes
 ┃ ┣ LandingPage.tsx      # Página inicial de apresentação
 ┃ ┣ MobileMenu.tsx       # Menu responsivo para smartphones
 ┃ ┣ Sidebar.tsx          # Estrutura base da barra de navegação
 ┃ ┣ SimulatorView.tsx    # View principal que engloba a lógica de simulação
 ┃ ┗ Ticker.tsx           # Componente de avisos dinâmicos/rolagem
 ┣ hooks/
 ┃ ┗ useCalculator.ts     # Hook customizado contendo toda a lógica e matemática das notas
 ┣ App.tsx                # Ponto de entrada e rotas da aplicação
 ┗ README.md              # Documentação do projeto
```

 ---

# Como iniciar o projeto localmente
Siga as instruções abaixo para executar o fatec.calc na sua máquina.

### Pré-requisitos
- Node.js (versão 18+ recomendada)
- Gestor de pacotes (npm, yarn ou pnpm)

### Passo a passo
1. Clone o repositório e aceda à pasta do projeto::

```bash
git clone https://github.com/isaacmenezes/fatec.calc
cd fatec.calc
```

2. Instale as dependências: 
```bash
npm install
# ou yarn install / pnpm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou yarn dev / pnpm dev
```

4. Aceda no navegador:
Abra `http://localhost:3000` no seu navegador favorito para ver a aplicação a correr.

---

Feito com dedicação para ajudar a comunidade de futuros Fatecanos!





