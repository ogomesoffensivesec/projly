# MVP Dev Manager

Um painel moderno para gerenciamento de projetos, desenvolvido com React, TypeScript, Vite, Tailwind CSS, TanStack Table e animações com Framer Motion.

## Funcionalidades

- **Dashboard de Projetos**: Visualize, filtre, pesquise e gerencie projetos em uma tabela interativa.
- **Favoritos**: Marque projetos como favoritos e visualize-os em cards com rolagem horizontal e animações.
- **Tema Escuro**: Interface totalmente adaptada para dark mode usando cores neutras do Tailwind.
- **Ações rápidas**: Edite, duplique, arquive, compartilhe ou exclua projetos com confirmação.
- **Paginação e Filtros**: Controle de paginação, filtros por status, busca multi-coluna e alternância de colunas.
- **Animações**: Cards de favoritos com fade-in/fade-out ao adicionar ou remover.
- **Responsivo**: Layout adaptado para diferentes tamanhos de tela.

## Tecnologias

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TanStack Table](https://tanstack.com/table/v8)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev/)

## Como rodar o projeto

1. Instale as dependências:
   ```sh
   pnpm install
   ```
2. Rode o projeto em modo desenvolvimento:
   ```sh
   pnpm dev
   ```
3. Acesse [http://localhost:5173](http://localhost:5173) no navegador.

## Estrutura principal

- `src/components/dev/dashboard/sections/projects-section.tsx`: Componente principal da tabela e cards de projetos.
- `src/components/ui/`: Componentes reutilizáveis de UI (botões, inputs, tabelas, etc).

## Customização

- Para alterar os projetos exibidos, edite o array `mockProjects` no arquivo `projects-section.tsx`.
- Para mudar as cores, personalize as classes do Tailwind no próprio componente.
