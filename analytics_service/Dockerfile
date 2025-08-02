# =================== Estágio Builder ===================
# Use uma imagem Python com a versão LTS
FROM python:3.11-slim AS builder

# Define o diretório de trabalho
WORKDIR /app

# Instala dependências do sistema necessárias
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copia o arquivo de requirements primeiro para aproveitar o cache do Docker
COPY requirements.txt .

# Cria um ambiente virtual e instala as dependências
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copia o resto do código-fonte da aplicação
COPY . .

# =================== Estágio de Desenvolvimento (local) ===================
# Este estágio usa volumes para permitir hot reload do código-fonte
# Para usar: docker run -v $(pwd):/app -p 80:80 --name analytics-local analytics:local
FROM python:3.11-slim AS local

WORKDIR /app

# Instala dependências do sistema
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copia o arquivo de requirements
COPY requirements.txt .

# Instala as dependências diretamente (incluindo dependências de desenvolvimento)
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Instala dependências de desenvolvimento
RUN pip install --no-cache-dir \
    pytest==7.4.3 \
    pytest-asyncio==0.21.1 \
    black==23.11.0 \
    flake8==6.1.0

# Copia o código da aplicação
COPY . .

# Expõe a porta padrão do FastAPI
EXPOSE 80

# Comando para iniciar o FastAPI em modo de desenvolvimento (hot reload)
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "80", "--reload"]

# =================== Estágio de Produção (prod) ===================
# Este estágio usa uma imagem mínima para produção
FROM python:3.11-slim AS prod

WORKDIR /app

# Copia o ambiente virtual do estágio builder
COPY --from=builder /opt/venv /opt/venv

# Ativa o ambiente virtual
ENV PATH="/opt/venv/bin:$PATH"

# Copia os arquivos necessários da aplicação
COPY src/ ./src/

# Cria um usuário não-root para segurança
RUN groupadd -r appgroup && useradd -r -g appgroup appuser

# Cria diretório de logs
RUN mkdir -p logs && chown -R appuser:appgroup /app

# Muda para o usuário não-root
USER appuser

# Expõe a porta da aplicação
EXPOSE 80

# Comando para iniciar a aplicação em produção
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "80", "--workers", "4"]