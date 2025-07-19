# Quiz Service

Serviço de quiz desenvolvido em PHP/Symfony.

## Configuração do Ambiente

### Desenvolvimento Local

Para desenvolvimento local, use o stage `local` que inclui o Symfony CLI:

```bash
# Usando docker-compose local
docker-compose -f docker-compose.local.yml up --build

# Ou usando o override global
docker-compose up --build
```

O stage `local` inclui:
- PHP 8.2 com FPM
- Composer
- Symfony CLI
- Hot reload para desenvolvimento
- Volumes montados para desenvolvimento

### Produção

Para produção, use o stage `prod`:

```bash
docker-compose up --build
```

O stage `prod` inclui:
- PHP 8.2 com FPM otimizado
- Aplicação pré-compilada
- Configurações de segurança
- Sem ferramentas de desenvolvimento

## Stages do Dockerfile

### Builder Stage
- Instala dependências do sistema
- Instala Composer
- Compila dependências PHP
- Prepara a aplicação para produção

### Local Stage
- Baseado no PHP 8.2-fpm
- Inclui Symfony CLI para desenvolvimento
- Volumes montados para hot reload
- Ferramentas de desenvolvimento

### Prod Stage
- Imagem otimizada para produção
- Sem ferramentas de desenvolvimento
- Permissões configuradas adequadamente
- Aplicação pré-compilada

## Estrutura do Projeto

```
quiz_service/
├── .docker/
│   ├── php/
│   │   └── Dockerfile
│   └── nginx/
│       └── default.conf
├── docker-compose.yml
├── docker-compose.local.yml
└── .dockerignore
```

## Comandos Úteis

### Acessar o container de desenvolvimento
```bash
docker exec -it quiz_service bash
```

### Executar comandos Symfony
```bash
docker exec -it quiz_service symfony console cache:clear
```

### Instalar dependências
```bash
docker exec -it quiz_service composer install
```

## Configuração do Traefik

O serviço está configurado para ser roteado pelo Traefik com o path `/quiz`.

## Variáveis de Ambiente

Crie um arquivo `.env` baseado no `.env.example` para configurar as variáveis de ambiente necessárias. 