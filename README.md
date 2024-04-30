# WEB Front End - React e Vite

Bem-vindo(a) ao Front-End Web desenvolvido com React e Vite!

No desenvolvimento deste sistema de gerenciamento de usuários, utilizei o React como nossa biblioteca principal para construir a interface do usuário, junto com o Vite como nosso bundler para uma compilação rápida e eficiente do código.

Uma das principais funcionalidades do sistema é sua capacidade de exibir gráficos e estatísticas relacionadas aos usuários. Para isso, utilizamos bibliotecas como D3.js para a visualização dos dados de forma interativa e informativa.

Além disso, implementamos uma lista de usuários com operações básicas, como editar, deletar e cadastrar novos usuários. Essas operações foram simplificadas e agilizadas com o uso da biblioteca Ant Design (antd), que fornece componentes prontos e personalizáveis para interfaces de usuário.

Foi implementado uma area dedicada a recuperação de senha por e-mail para oferecer aos usuários uma maneira segura e conveniente de recuperar o acesso às suas contas.

Foi adotado Docker para facilitar a configuração e o gerenciamento do ambiente de desenvolvimento, garantindo consistência e portabilidade em diferentes plataformas.

Embora tenha feito uma tentativa de implementar o Tailwind CSS para facilitar o design e a estilização, devido a restrições de tempo, não conseguimos integrá-lo completamente neste estágio inicial do projeto.

Embora não tenhamos implementado testes unitários nesta fase inicial do projeto devido a restrições de tempo, reconhecemos a importância de testes para garantir a qualidade e a confiabilidade do código. 


## Pré-requisitos

- Sistema operacional Linux Ubuntu 20.04 lts ou Windows 11

- Instalar VS CODE para visualizar os projetos

- Instalar Node versão v18.20.0 !Importante

- Instalar Yarn versão 1.22.22 !Importante

- Instalar a versão Git 2.25.1 

- Instalar Docker versão 24.0.5

- Instalar Docker-compose versão1.25.0-1

## Tecnologias
- React
- Typescript
- Vite
- Docker

## Acesso ao sistema

`email`: testeindtmail@gmail.com
`senha`: 123456

## Link para testar em produção:

`link`: http://web.ecore-inovation.com/login


# Observações


- É necessário adicionar todas as variaveis de ambiente para rodar perfeitamente.

- Deixarei no .env.example as variaveis ja disponivel.

- Qualquer dúvida, pode mandar mensagem para o meu e-mail luan.santos6605@gmail.com


## Arvore de diretorios e arquivos

```shell
  $ tree

├── App.css
├── App.styles.ts
├── App.tsx
├── assets
│   └── react.svg
├── components
│   ├── dashborad
│   │   └── PieChartComponent.tsx
│   ├── NavBarComponent.tsx
│   └── users
│       ├── CreateModalComponent.tsx
│       ├── FormCreateUserComponent.tsx
│       ├── FormEditModalComponent.tsx
│       ├── FormEditUserComponent.tsx
│       └── TableComponent.tsx
├── guards
│   └── protected.route.tsx
├── index.css
├── lib
│   └── utils.ts
├── main.tsx
├── pages
│   ├── DashboradPage.tsx
│   ├── ErroPage.tsx
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── RepairPasswordPage.tsx
│   ├── UpdatePasswordPage.tsx
│   └── UsersPage.tsx
├── redirect.navigate.ts
├── router.tsx
├── services
│   ├── api
│   │   ├── auth.service.ts
│   │   ├── axios-http-config.ts
│   │   └── users.service.ts
│   └── models
│       └── User.model.ts
└── vite-env.d.ts

```


## Inicializando Projeto

1. Clonar repositório

```bash
git clone 
```

2. Instalar as depedências

obs: de preferencia yarn

```bash
npm install
ou
yarn
```

3. Ajustar o .env

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env ( ou somente renomear o arquivo env.example para .env )

`VITE_API_BACKEND_URL`
`VITE_PORT`


4. Rodar a aplicação com docker

```bash
docker compose up -d --build
```

5. Rodar a aplicação localmente

```bash
yarn start:dev

```

6. Rodar a jest

```bash
yarn test

```
