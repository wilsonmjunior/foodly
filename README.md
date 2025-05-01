# 🍔 Foodly App

Foodly é um aplicativo moderno para delivery de comida, desenvolvido com Next.js, React e TypeScript. Nossa plataforma oferece uma experiência fluida para os usuários navegarem por estabelecimentos, produtos e realizarem pedidos.

## 🚀 Funcionalidades

- 📱 Design responsivo para mobile
- 🍕 Catálogo de produtos por estabelecimento
- 🛒 Carrinho de compras (ticket) com persistência
- 🔄 Gerenciamento de estados com Zustand
- 💾 Armazenamento local via cookies
- 📦 Arquitetura limpa com separação de responsabilidades

## 🛠️ Tecnologias Utilizadas

- [Next.js 15](https://nextjs.org/) - Framework React com suporte a SSR/SSG
- [React](https://reactjs.org/) - Biblioteca JavaScript para interfaces
- [TypeScript](https://www.typescriptlang.org/) - Superset tipado do JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário
- [Zustand](https://github.com/pmndrs/zustand) - Gerenciamento de estado
- [Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) - Armazenamento persistente

## 📊 Arquitetura

O projeto segue os princípios de Clean Architecture para garantir separação de responsabilidades:

```
src/
├── app/                 # Rotas e páginas Next.js
├── application/         # Casos de uso e regras de aplicação
│   ├── services/        # Serviços da aplicação
│   └── store/           # Gerenciadores de estado
├── domain/              # Entidades e regras de negócio
│   └── entities/        # Modelos de dados
├── infrastructure/      # Detalhes de implementação externa
│   ├── api/             # Serviços de API
│   ├── repositories/    # Repositórios de dados
│   └── storage/         # Utilitários de armazenamento
├── presentation/        # Componentes de UI
│   └── components/      # Componentes React
└── utils/               # Funções utilitárias
```

## 🚦 Começando

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/foodlyapp.git
cd foodlyapp
```

2. Instale as dependências

```bash
npm install
# ou
yarn install
```

3. Inicie o servidor de desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

4. Inicie o servidor de API fake (json-server)

```bash
npm run server
# ou
yarn server
```

O json-server irá rodar em [http://localhost:4000](http://localhost:4000) usando o arquivo `db.json` na raiz do projeto.

5. Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

## 🌐 Deeplinks

O Foodly suporta deeplinks para navegação direta para diferentes partes do aplicativo. Use os seguintes formatos:

### Formato de Deeplinks

- Página inicial: `/`
- Ver estabelecimento: `/catalog/:id`
- Ver produto: `/catalog/:id/product/:productId`
- Ver ticket (carrinho): `/ticket`

### Exemplos de Deeplinks

1. Acessar uma categoria específica:

```
http://localhost:3000/catalog/1
```

2. Acessar um produto específico:

```
http://localhost:3000/catalog/1/product/101
```

3. Acessar diretamente o carrinho:

```
http://localhost:3000/ticket
```

## 📱 Uso Mobile

Para testar no dispositivo móvel na mesma rede:

1. Descubra o endereço IP da sua máquina na rede local

```bash
ipconfig # Windows
ifconfig # Mac/Linux
```

2. Inicie o servidor especificando o host

```bash
npm run dev -- -H seu-ip-local
# ex: npm run dev -- -H 192.168.1.100
```

3. Acesse `http://seu-ip-local:3000` no seu dispositivo móvel

## 📦 Build para Produção

```bash
npm run build
npm start
# ou
yarn build
yarn start
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/amazing-feature`)
3. Commit suas mudanças (`git commit -m 'Add amazing feature'`)
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.
