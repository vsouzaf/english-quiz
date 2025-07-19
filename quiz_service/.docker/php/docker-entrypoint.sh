#!/bin/bash

echo Preparing runner user
chsh -s /bin/bash www-data
groupmod -g $(stat -c "%g" $(pwd)) www-data
usermod -u $(stat -c "%u" $(pwd)) www-data

chown -R www-data:www-data /var/www/

su www-data -c "
    [[ -f .env ]] || cp .env.example .env

    echo Installing dependencies
    composer install --no-interaction --verbose --no-dev
"

echo Running php-fpm
php-fpm