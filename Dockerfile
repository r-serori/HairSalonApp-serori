# フロントエンド用の設定
FROM node:21.5.0-alpine AS frontend

WORKDIR /app/client
COPY hair-salon-frontend-serori/package*.json ./
RUN npm install
COPY hair-salon-frontend-serori/ ./
RUN npm run build

# バックエンド用の設定
FROM php:8.2-apache AS backend

WORKDIR /var/www/html/server
RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip \
    && rm -rf /var/lib/apt/lists/*

RUN curl -sS https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin/composer
ENV COMPOSER_ALLOW_SUPERUSER=1

COPY hair-salon-backend-serori/composer.json hair-salon-backend-serori/composer.lock ./
RUN composer install --no-interaction
COPY hair-salon-backend-serori/ ./

# 最終ステージで Apache を設定してアプリケーションを起動
FROM php:8.2-apache

RUN a2enmod rewrite

WORKDIR /var/www/html

COPY --from=frontend /app/client/.next /var/www/html/client/.next
COPY --from=frontend /app/client/public /var/www/html/client/public
COPY --from=backend /var/www/html/server /var/www/html/server

ENV APACHE_DOCUMENT_ROOT /var/www/html/client/public

CMD ["apache2-foreground"]
