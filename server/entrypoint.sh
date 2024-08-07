#!/bin/bash

# Apacheのポートを環境変数に応じて設定
sed -i -e "s/Listen 80/Listen ${PORT}/g" /etc/apache2/ports.conf && \
sed -i -e "s/<VirtualHost \*:80>/<VirtualHost \*:${PORT}>/g" /etc/apache2/sites-available/000-default.conf && \

# localhost:8000 でアクセスできるように設定
# CMD sed -i -e "s/Listen 80/Listen 8000/g" /etc/apache2/ports.conf && \
#     sed -i -e "s/<VirtualHost \*:80>/<VirtualHost \*:8000>/g" /etc/apache2/sites-available/000-default.conf 

# 権限を設定
chown -R www-data:www-data /var/www/html/public /var/www/html/public/storage /var/www/html/storage/app/public /var/www/html/storage/app/public/startPhotos /var/www/html/storage/app/public/endPhotos 
chmod -R 755 /var/www/html/public
chmod -R 755 /var/www/html/public/storage
chmod -R 755 /var/www/html/storage
chmod -R 755 /var/www/html/storage/app
chmod -R 755 /var/www/html/storage/app/public　
find /var/www/html/storage/app/public/startPhotos -type f -exec chmod 644 {} \;
find /var/www/html/storage/app/public/endPhotos -type f -exec chmod 644 {} \;

# 既存のシンボリックリンクやディレクトリを削除
rm -rf /var/www/html/public/storage

# 新しいシンボリックリンクを作成
ln -s /var/www/html/storage/app/public /var/www/html/public/storage


# PHP-FPM を起動
apache2-foreground

