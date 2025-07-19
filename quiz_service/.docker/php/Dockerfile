# =================== Estágio Builder ===================
FROM php:8.2-fpm AS builder

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    zip unzip curl libzip-dev libonig-dev libxml2-dev \
    git \
    && docker-php-ext-install pdo_mysql zip

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer


WORKDIR /var/www

# Copiar arquivos de dependências primeiro para aproveitar cache
COPY composer.json composer.lock* ./

# Instalar dependências (se composer.json existir)
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Copiar código da aplicação
COPY . .

# =================== Estágio Local (dev) ===================
FROM php:8.2-fpm AS local


# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    zip unzip curl libzip-dev libonig-dev libxml2-dev \
    git \
    && docker-php-ext-install pdo_mysql zip

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

# Expor porta
EXPOSE 9000

RUN chmod +x /var/www/.docker/php/docker-entrypoint.sh

# Comando para desenvolvimento
ENTRYPOINT [ "/var/www/.docker/php/docker-entrypoint.sh" ]

# =================== Estágio Produção (prod) ===================
FROM php:8.2-fpm AS prod

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    zip unzip curl libzip-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql zip

WORKDIR /var/www

# Copiar aplicação do builder
COPY --from=builder /var/www .

# Configurar permissões
RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www

# Expor porta
EXPOSE 9000

# Comando para produção
CMD ["php-fpm"]
