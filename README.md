# HairSalonApp

## 概要

HairSalonApp は、ヘアサロン経営のための勤怠、顧客、予約、在庫管理ができるアプリケーションです。ペーパーレス化を推進し、効率的な業務運用を支援します。

## デモ

[デプロイされたアプリケーション](https://hairsalon.seroriman.com)

## 機能

- 顧客情報管理
- 予約管理
- 在庫管理
- 勤怠管理
- 売上管理

## 技術スタック

- フロントエンド: Next.js
- バックエンド: Laravel
- データベース: MySQL
- デプロイ: Heroku, Docker

## インストール手順

1. **リポジトリのクローン**

   ```bash
   git clone https://github.com/r-serori/HairSalonApp-serori.git
   cd HairSalonApp-serori
   ```

2. **フロントエンドのセットアップ**

   ```bash
   cd client
   npm install
   npm run dev
   ```

3. **バックエンドのセットアップ**

   ```bash
   cd ../server
   composer install
   php artisan migrate
   php artisan serve
   ```

## CI/CD パイプライン

このプロジェクトでは CircleCI を使用して CI/CD パイプラインを構築しています。ビルド、テスト、デプロイの自動化が行われ、コードの変更が迅速に反映されます。

- **CI ツール**: CircleCI を使用して、コードのビルド、テスト、デプロイを自動化しています。
- **CD ツール**: Heroku による自動デプロイメント。

## 開発

開発中の課題や改善点は [Issues](https://github.com/r-serori/HairSalonApp-serori/issues) で管理しています。
