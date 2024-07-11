# OralCancerWatch

## Introdução

OralCancerWatch é uma aplicação projetada para auxiliar na detecção e monitoramento do câncer bucal. A aplicação fornece auxilio para os ACSs realizarem o cadastro e monitoramento do grupo de risco.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 22.4.0)
- [npm](https://www.npmjs.com/) (versão 10.2.5)
- [Go](https://golang.org/) (versão 1.22.2)

## Instalação

### Front-end (React)

1. Clone o repositório:

   ```sh
   git clone https://github.com/Sobrevidas-aplicacao-grupo-8/ProjetoIntegrador.git
   cd ProjetoIntegrador
   ```

2. Instale as dependências:
   ```sh
   npm install
   npm install axios
   ```

### Back-end (Go)

1. Navegue até o diretório do backend:

   ```sh
   cd ProjetoIntegrador
   ```

2. Instale as dependências:
   ```sh
   go mod tidy
   ```

## Execução

### Front-end (React)

Para iniciar o servidor de desenvolvimento:

```sh
npm run dev
```

## Estrutura do Projeto

main.go: Arquivo principal do backend Go.
index.html: Contém as informações para o browser.
src/: Contém todo o código Front-end.
src/app.js: Junta todo o código por meio do React-Router-DOM.
src/main.js: Faz o carregamento de tudo para o servidor e controla as rotas.
src/assets/: Contém as imagens do projeto.
src/components/: Contém funções reutilizáveis em várias páginas.
src/routes/: Contém cada uma das páginas.
src/routes/Style/: Contém os estilos CSS das páginas.
