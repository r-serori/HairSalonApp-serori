# フロントエンド用のステージ
FROM node:22.5.1-alpine AS frontend

WORKDIR /app/client

COPY hair-salon-frontend-serori/package*.json ./
RUN npm install

COPY hair-salon-frontend-serori/ ./
RUN npm run build

# バックエンド用のステージ
FROM php:8.2-apache AS backend

WORKDIR /var/www/html/server

RUN apt-get update && apt-get install -y \
    apt-utils \
    git \
    zip \
    unzip \
    && rm -rf /var/lib/apt/lists/*

RUN curl -sS https://getcomposer.org/installer -o /tmp/composer-setup.php \
    && php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer \
    && rm /tmp/composer-setup.php

ENV COMPOSER_ALLOW_SUPERUSER=1

COPY hair-salon-backend-serori/ /var/www/html/server/

WORKDIR /var/www/html/server

RUN composer install --no-interaction

# 最終ステージ
FROM php:8.2-apache

RUN a2enmod rewrite
RUN a2dismod mpm_event
RUN a2enmod mpm_prefork

WORKDIR /var/www/html

COPY --from=frontend /app/client/.next /var/www/html/client/.next
COPY --from=frontend /app/client/public /var/www/html/client/public
COPY --from=backend /var/www/html/server /var/www/html/server

ENV APACHE_DOCUMENT_ROOT /var/www/html/client/public

CMD ["apache2-foreground"]
