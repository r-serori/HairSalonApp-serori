# FROM php:8.2-apache AS backend

# WORKDIR /var/www/html

# # 必要なパッケージをインストール
# RUN apt-get update && apt-get install -y \
#     apt-utils \
#     git \
#     zip \
#     jpegoptim \
#     unzip \
#     curl \
#     && rm -rf /var/lib/apt/lists/* 

# # PHP拡張機能のインストール
# RUN docker-php-ext-install pdo pdo_mysql  

# # Composerのインストール
# RUN curl -sS https://getcomposer.org/installer -o /tmp/composer-setup.php \
#     && php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer \
#     && rm /tmp/composer-setup.php

# # 環境変数設定
# ENV COMPOSER_ALLOW_SUPERUSER=1

# # プロジェクトファイルをコピー
# COPY . /var/www/html/

# # ファイル所有者と権限の設定
# # RUN chown -R www-data:www-data /var/www/html/public /var/www/html/storage
# # RUN chmod -R 755 /var/www/html/public /var/www/html/storage

# # Composerの依存関係をインストール
# RUN composer install --no-interaction

# RUN php artisan storage:link

# # Apacheの設定ファイルをコピー
# COPY apache-config.conf /etc/apache2/sites-available/000-default.conf

# # Apacheの設定を有効にする
# RUN a2ensite 000-default.conf && a2enmod rewrite

# # # 環境変数 PORT を使用してApacheのポートを設定
# CMD sed -i -e "s/Listen 80/Listen ${PORT}/g" /etc/apache2/ports.conf && \
#     sed -i -e "s/<VirtualHost \*:80>/<VirtualHost \*:${PORT}>/g" /etc/apache2/sites-available/000-default.conf && \
#     apache2-foreground

# # entrypoint.sh をコンテナにコピー
# # COPY entrypoint.sh /usr/local/bin/entrypoint.sh

# # # entrypoint.sh を実行可能にする
# # RUN chmod +x /usr/local/bin/entrypoint.sh

# # # Entrypoint の設定
# # ENTRYPOINT ["entrypoint.sh"]





FROM php:8.2-apache AS backend

WORKDIR /var/www/html

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y \
    apt-utils \
    git \
    zip \
    jpegoptim \
    unzip \
    curl \
    && rm -rf /var/lib/apt/lists/* 

# PHP拡張機能のインストール
RUN docker-php-ext-install pdo pdo_mysql  

# Composerのインストール
RUN curl -sS https://getcomposer.org/installer -o /tmp/composer-setup.php \
    && php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer \
    && rm /tmp/composer-setup.php

# 環境変数設定
ENV COMPOSER_ALLOW_SUPERUSER=1

# プロジェクトファイルをコピー
COPY . /var/www/html/

# Composerの依存関係をインストール
RUN composer install --no-interaction

RUN php artisan storage:link

# Apacheの設定ファイルをコピー
COPY apache-config.conf /etc/apache2/sites-available/000-default.conf

# Apacheの設定を有効にする
RUN a2ensite 000-default.conf && a2enmod rewrite

# Apacheのデフォルトポートを8000に変更
EXPOSE 8000

# # Apacheのポートを環境変数に応じて設定
CMD sed -i -e "s/Listen 80/Listen 8000/g" /etc/apache2/ports.conf && \
    sed -i -e "s/<VirtualHost \*:80>/<VirtualHost \*:8000>/g" /etc/apache2/sites-available/000-default.conf 

# entrypoint.sh をコンテナにコピー
# COPY entrypoint.sh /usr/local/bin/entrypoint.sh

# # entrypoint.sh を実行可能にする
# RUN chmod +x /usr/local/bin/entrypoint.sh

# # Entrypoint の設定
# ENTRYPOINT ["entrypoint.sh"]
