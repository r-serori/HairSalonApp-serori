# ベースイメージの指定 (フロントエンド用)
FROM node:21.5.0-alpine AS frontend

# フロントエンドアプリケーション用の作業ディレクトリを作成
WORKDIR /app/client

# フロントエンドの依存関係をインストール
COPY hair-salon-frontend-serori/package*.json ./
RUN npm install

# フロントエンドのコードをコピーしてビルド
COPY hair-salon-frontend-serori/ ./
RUN npm run build

# バックエンド用の設定
FROM php:8.2-apache AS backend

# バックエンドアプリケーション用の作業ディレクトリを作成
WORKDIR /var/www/html/server

# 必要なパッケージのインストール
RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip \
    && rm -rf /var/lib/apt/lists/*


# Composer のインストール
RUN curl -sS https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin/composer

# COMPOSER_ALLOW_SUPERUSER 環境変数を設定
ENV COMPOSER_ALLOW_SUPERUSER=1

# バックエンドのコードをコピー
COPY hair-salon-backend-serori/ ./

# バックエンドの依存関係をインストール
COPY hair-salon-backend-serori/composer.json hair-salon-backend-serori/composer.lock ./
RUN composer install --no-interaction

# 最終ステージで Apache を設定してアプリケーションを起動
FROM php:8.2-apache

# Apache モジュールを有効にする
RUN a2enmod rewrite

# 作業ディレクトリを設定
WORKDIR /var/www/html

# フロントエンドとバックエンドのファイルをコピー
COPY --from=frontend /app/client/.next /var/www/html/client/.next
COPY --from=frontend /app/client/public /var/www/html/client/public
COPY --from=backend /var/www/html/server /var/www/html/server

# Apache のドキュメントルートを設定 (フロントエンドの静的ファイルをサーブ)
ENV APACHE_DOCUMENT_ROOT /var/www/html/client/public

# Apache を起動するコマンド
CMD ["apache2-foreground","npm","run","start"]
