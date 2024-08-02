# バックエンド用のステージ
FROM php:8.2-apache AS backend

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
    apt-utils \
    git \
    zip \
    unzip \
    && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo pdo_mysql

RUN curl -sS https://getcomposer.org/installer -o /tmp/composer-setup.php \
    && php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer \
    && rm /tmp/composer-setup.php

ENV COMPOSER_ALLOW_SUPERUSER=1

COPY . /var/www/html/

RUN composer install --no-interaction

# Apacheの設定ファイルをコピー
COPY apache-config.conf /etc/apache2/sites-available/000-default.conf

# 環境変数 PORT を使用してApacheのポートを設定
CMD sed -i -e "s/Listen 80/Listen ${PORT}/g" /etc/apache2/ports.conf && \
    sed -i -e "s/<VirtualHost \*:80>/<VirtualHost \*:${PORT}>/g" /etc/apache2/sites-available/000-default.conf && \
    apache2-foreground
