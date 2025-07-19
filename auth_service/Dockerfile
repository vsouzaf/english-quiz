# =================== Estágio Builder ===================
# Use uma imagem com Gradle e a versão do Java do seu projeto (ex: jdk21).
FROM gradle:8.5.0-jdk21 AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de build do Gradle primeiro para aproveitar o cache do Docker.
# As dependências só serão baixadas novamente se esses arquivos mudarem.
COPY build.gradle gradle.properties settings.gradle gradlew ./
COPY gradle ./gradle

RUN chmod +x ./gradlew

# Baixa as dependências do projeto para criar uma camada de cache.
RUN ./gradlew dependencies

# Copia o resto do código-fonte da aplicação.
COPY . .


# =================== Estágio de Desenvolvimento (dev) ===================
# Este estágio usa o código-fonte e as dependências para rodar em modo de desenvolvimento.
FROM builder AS dev

# Expõe a porta padrão do Quarkus
EXPOSE 80

# Define a porta de debug para permitir anexar um debugger remotamente
EXPOSE 5005

# Comando para iniciar o Quarkus em modo de desenvolvimento (hot reload)
# O Quarkus detectará mudanças nos arquivos e reconstruirá a aplicação automaticamente.
CMD ["./gradlew", "quarkusDev", "--no-daemon", "-Dquarkus.http.host=0.0.0.0"]


# =================== Estágio de Produção (prod) ===================
# Este estágio constrói uma imagem nativa e a copia para uma imagem final mínima.
FROM builder AS native-builder

# Executa o build nativo. Isso pode levar alguns minutos.
# -Dquarkus.package.type=native ativa o build nativo.
RUN ./gradlew build -Dquarkus.package.type=native

# --- Imagem Final ---
# Use uma imagem base mínima. A imagem do Quarkus é uma excelente opção.
FROM quay.io/quarkus/ubi9-quarkus-micro-image:2.0 AS prod

WORKDIR /work/
RUN chown 1001 /work \
    && chmod "g+rwX" /work \
    && chown 1001:root /work
COPY --chown=1001:root --chmod=0755 build/*-runner /work/application

EXPOSE 80
USER 1001

ENTRYPOINT ["./application", "-Dquarkus.http.host=0.0.0.0"]