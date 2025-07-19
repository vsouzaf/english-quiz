# =================== Estágio Builder ===================
# Use uma imagem Node.js com a versão LTS
FROM node:22-alpine AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências primeiro para aproveitar o cache do Docker
COPY package*.json ./

# Instala as dependências
RUN npm ci --only=production

# Copia o resto do código-fonte da aplicação
COPY . .

# Constrói a aplicação
RUN npm run build

# =================== Estágio de Desenvolvimento (local) ===================
# Este estágio usa volumes para permitir hot reload do código-fonte
# Para usar: docker run -v $(pwd):/app -p 80:80 -p 9229:9229 --name study-experience-local study-experience:local
FROM node:22-alpine AS local

WORKDIR /app


# Copia package.json e package-lock.json
COPY package*.json ./

# Instala todas as dependências (incluindo devDependencies)
RUN npm ci

COPY . .

# Expõe a porta padrão do NestJS
EXPOSE 80

# Define a porta de debug para permitir anexar um debugger remotamente
EXPOSE 9229

# Comando para iniciar o NestJS em modo de desenvolvimento (hot reload)
CMD ["npm", "run", "start:dev"]

# =================== Estágio de Produção (prod) ===================
# Este estágio usa uma imagem mínima para produção
FROM node:22-alpine AS prod

WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala apenas as dependências de produção
RUN npm ci --only=production

# Instala PM2 globalmente
RUN npm install -g pm2

# Copia os arquivos construídos do estágio builder
COPY --from=builder /app/dist ./dist

# Copia o arquivo de configuração do PM2
COPY ecosystem.config.js ./

# Cria diretório de logs
RUN mkdir -p logs

# Cria um usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Muda a propriedade dos arquivos para o usuário não-root
RUN chown -R nestjs:nodejs /app
USER nestjs

# Expõe a porta da aplicação
EXPOSE 80

# Comando para iniciar a aplicação com PM2
CMD ["pm2-runtime", "start", "ecosystem.config.js"] 