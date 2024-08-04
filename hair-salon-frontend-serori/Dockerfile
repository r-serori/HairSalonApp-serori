# フロントエンド用のステージ
FROM node:22.5.1-alpine AS frontend

# 環境変数の設定
ENV NEXT_PUBLIC_BACKEND_URL=https://hairsalon-api.seroriman.com
ENV NEXT_PUBLIC_BACKEND_IMG_URL=https://hairsalon-api.seroriman.com/storage

WORKDIR /app

# client ディレクトリ内の package.json と package-lock.json をコピー
COPY package*.json ./
RUN npm install

# client ディレクトリ内の残りのファイルをコピー
COPY . ./
RUN npm run build

EXPOSE 3000

# Next.js アプリケーションを起動
CMD ["npm", "start"]
