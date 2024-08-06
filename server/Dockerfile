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

RUN a2ensite 000-default.conf && a2enmod rewrite

EXPOSE 80

# 環境変数 PORT を使用してApacheのポートを設定
CMD sed -i -e "s/Listen 80/Listen ${PORT}/g" /etc/apache2/ports.conf && \
    sed -i -e "s/<VirtualHost \*:80>/<VirtualHost \*:${PORT}>/g" /etc/apache2/sites-available/000-default.conf && \
    apache2-foreground


# FROM php:8.2-apache AS backend

# WORKDIR /var/www/html

# ENV APP_ENV=local
# ENV APP_DEBUG=true
# ENV APP_KEY=base64:4mOZyqvol9/9o87SCaUVjt8SSzmR1sfEYYuUay+Ze+s=
# ENV APP_URL=http://localhost:8000
# ENV FRONTEND_URL=http://localhost:3000
# ENV FILESYSTEM_DISK=public
# ENV LOG_CHANNEL=stack
# ENV SESSION_DRIVER=database
# ENV CACHE_DRIVER=database
# ENV SESSION_STORE=database
# ENV SESSION_DOMAIN=localhost
# ENV SESSION_SECURE_COOKIE=true
# ENV SESSION_LIFETIME=120
# ENV SANCTUM_STATEFUL_DOMAINS=localhost:3000,localhost
# ENV MAIL_MAILER=smtp
# ENV MAIL_HOST=mailhog
# ENV MAIL_PORT=1025
# ENV MAIL_USERNAME=null
# ENV MAIL_PASSWORD=null
# ENV MAIL_ENCRYPTION=null
# ENV MAIL_FROM_ADDRESS=hairsaron.app@gmail.com
# ENV MAIL_FROM_NAME="${APP_NAME}"
# ENV REACT_APP_ENCRYPTION_KEY=_serori@fire_hairsalon+app_
# ENV REACT_APP_OWNER_ROLE=o_w@_seR_ori_N_N_EbR
# ENV REACT_APP_MANAGER_ROLE=M_an@aSe_ro_ri_a_@gEr
# ENV REACT_APP_STAFF_ROLE=S_taf@F@_seR_@_Ri@
# ENV OWNER_ROLE=o_w@_seR_ori_N_N_EbR
# ENV MANAGER_ROLE=M_an@aSe_ro_ri_a_@gEr
# ENV STAFF_ROLE=S_taf@F@_seR_@_Ri@
# ENV DB_CONNECTION=mysql
# ENV DB_HOST=db
# ENV DB_PORT=3306
# ENV DB_DATABASE=homestead
# ENV DB_USERNAME=root
# ENV DB_PASSWORD=root

# # 必要なパッケージをインストール
# RUN apt-get update && apt-get install -y \
#     apt-utils \
#     git \
#     zip \
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

# # Composerの依存関係をインストール
# RUN composer install --no-interaction

# # Apacheの設定ファイルをコピー
# COPY apache-config.conf /etc/apache2/sites-available/000-default.conf

# # Apacheの設定を有効にする
# RUN a2ensite 000-default.conf && a2enmod rewrite

# # Apacheのデフォルトポートを8000に変更
# EXPOSE 8000

# # Apacheのポートを環境変数に応じて設定
# CMD sed -i -e "s/Listen 80/Listen 8000/g" /etc/apache2/ports.conf && \
#     sed -i -e "s/<VirtualHost \*:80>/<VirtualHost \*:8000>/g" /etc/apache2/sites-available/000-default.conf && \
#     apache2-foreground
