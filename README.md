# Link Locker - PWA para Compartilhamento de Links

Link Locker é uma Aplicação Web Progressiva (PWA) que permite salvar, organizar e compartilhar links úteis. 
A aplicação funciona offline, pode ser instalada na tela inicial de dispositivos e utiliza tecnologias web modernas.

## Funcionalidades

- ✅ Salvar links com título, URL e categoria
- ✅ Gerenciar links (visualizar, editar, excluir)
- ✅ Categorizar links para fácil organização
- ✅ Compartilhar links usando a Web Share API
- ✅ Funcionalidade completa offline
- ✅ Instalável como aplicativo na tela inicial
- ✅ Interface responsiva e amigável

## Tecnologias Utilizadas

- **HTML5** - Estrutura da aplicação
- **CSS3** - Estilização com suporte a modo escuro
- **JavaScript** - Lógica da aplicação
- **Web Components** - Componentes reutilizáveis com Shadow DOM
- **LocalStorage API** - Armazenamento persistente de dados
- **Service Worker** - Suporte offline e cache
- **Web Share API** - Compartilhamento de conteúdo
- **Manifest.json** - Configurações para instalação da PWA

## Como Usar

### Instalação Local

1. Clone este repositório:
   ```bash
   git clone https://github.com/moralesgabi/link-locker-pwa.git
   cd link-locker-pwa
   ```

2. Abra o arquivo `index.html` em um navegador moderno (Chrome, Firefox, Edge, etc.)

### Instalação como PWA

1. Acesse a aplicação no navegador Chrome ou compatível
2. Clique no ícone de instalação na barra de endereços (ou no menu do navegador)
3. Siga as instruções para adicionar à tela inicial

## Funcionalidades Técnicas

### Service Worker

O Service Worker implementado nesta aplicação garante:

- Cache de arquivos estáticos para carregamento rápido
- Funcionamento offline através de estratégia cache-first
- Atualização automática de cache quando novas versões são detectadas

### Web Components

A aplicação utiliza Web Components para criar componentes reutilizáveis:

- `<link-item>`: Componente para exibir cada link
- `<category-filter>`: Componente para filtrar links por categoria

Os componentes utilizam Shadow DOM para encapsular estilos e estrutura, evitando conflitos com o CSS global.

### Local Storage

Os dados dos links são armazenados localmente usando a API LocalStorage, permitindo:

- Persistência de dados entre sessões
- Funcionamento offline completo
- Rápido acesso aos dados sem necessidade de servidor

### Web Share API

A integração com a Web Share API permite:

- Compartilhar links diretamente de dentro da aplicação
- Utilizar os mecanismos nativos de compartilhamento do dispositivo

## Estrutura do Projeto

```
link-locker-pwa/
├── index.html               # Página principal da aplicação
├── manifest.json            # Configuração para instalação da PWA
├── sw.js                    # Service Worker para funcionalidade offline
├── assets/
│   ├── css/
│   │   └── style.css        # Estilos da aplicação
│   ├── js/
│   │   ├── app.js           # Código principal da aplicação
│   │   ├── components/      # Web Components
│   │   │   ├── link-item.js      # Componente para item de link
│   │   │   └── category-filter.js # Componente para filtro de categoria
│   │   └── db.js            # Lógica de armazenamento local
│   └── icons/
│       ├── icon-192.png     # Ícone para dispositivos (192x192)
│       └── icon-512.png     # Ícone para dispositivos (512x512)
└── README.md                # Documentação do projeto
```

