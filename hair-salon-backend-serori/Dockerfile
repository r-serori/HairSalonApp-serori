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

# server ディレクトリ内の composer.json と composer.lock をコピー
COPY composer.* ./
RUN composer install --no-interaction

# server ディレクトリ内の残りのファイルをコピー
COPY . /var/www/html/

# Apache 設定ファイルをコピー
COPY apache-config.conf /etc/apache2/sites-available/000-default.conf

EXPOSE 80

# Apache サーバーを起動
CMD ["apache2-foreground"]
