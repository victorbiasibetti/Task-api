# Task API
Este projeto foi desenvolvido como uma prova prática em que consiste desenvolver uma api em **NodeJs** para  gerenciamento de tarefas de funcionários de uma empresa.

# Requisitos

O sistema deve possuir dois tipos de usuários *Administrador* e *Agente*.
- Administrador: pode parametrizar departamentos, tipos e status de tarefas, além de outras coisas que um agente pode fazer;
 - Agente: pode criar e alterar tarefas

## Iniciando
A base de dados utilizada neste projeto é o Postgres (podendo ser baixada uma imagem docker neste [link](https://drive.google.com/open?id=1I1PkcnxAhMkrHE07xRWuH9TW6fyEJ4FN).
Para iniciar o desenvolvimento do projeto faça um clone deste repositório e dentro da pasta rode o comando `yarn` para instalar as dependências.

## Testes
Para testar em ambiente local as rotas da API pode-se usar o Insomnia.
Facilitando a vida, aqui está as rotas já configuradas. Basta modificar as variáveis *base_url* e *token* no menu *Manage Enviroments* (ou atalho *Ctrl + E*)

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Task%20Api&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fvictorbiasibetti%2FTask-api%2Fmaster%2FInsomnia.json)

## Implementação
A API está dividia em pastas com os seguintes significados

 - src/app: onde estão as controllers, models e middlewares que a API utiliza
 - src/config: onde estão as configurações de autenticação e conexão com a base de dados
 - src/database: onde estão as migrations do sistema e conexão com o banco de dados
 - src/routes.js:  onde estão as rotas da API
 - src/app.js: onde está a inicialização da aplicação juntamente com a utilização das rotas e middlewares da API
 - src:/server.js: onde está a inicialização do servidor

A API também utiliza recursos para linting de estilos (eslint e prittier), live reloading (em desenvolvimento) e sucrase (para importação de arquivos alterativa para o babel utilizando a sintaxe de *import/export* que ainda não está com suporte nativo no Node)

## Executando

 1. Realizar clone do projeto
 2. Rodar *yarn* dentro da pasta do projeto para instalar dependências
 3. Criar arquivo *.env* na raiz do projeto inserindo os dados da variáveis (utilizar *.env.example* como exemplo)
 3.1.  Caso esteja utilizando a base de dados via docker rodar comando `docker import /caminho/da/database.out`
  4. Rodar o comando *yarn dev* para rodar o projeto utilizando o *nodemon* em modo de desenvolvimento
  4.1. Para debugar o projeto é preciso configurar sua IDE para realizar o attach no debugger (no caso do VsCode pode-se baixar desta [pasta](https://drive.google.com/open?id=1TE62SuZXX1W7qNhycaCVGOcCZtZQvByQ) e colar na raiz do projeto
  5. Para gerar uma versão de produção rode o comando *yarn build* na qual irá gerar a past *dist/* com os arquivos transpilados para NodeJS (lembre-se o Node ainda não suporta *import/export* nativamente)

## Licença
Este projeto está sob a licença MIT.
