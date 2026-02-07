# Brief Vault

Markdown レポートを「気持ちよく読む」ための軽量ダッシュボードです。

- `reports/` に `.md` を置くだけ
- 左で一覧・検索、右で本文を快適に閲覧
- ローカル運用前提（Raspberry Pi / 自宅サーバ / VPS など）

## 画面イメージ（言葉で）
- しっとりしたダークテーマ
- 左サイドバー：検索 + レポート一覧
- 右ペイン：Markdown を読みやすい組版で表示

## セットアップ

### 1) インストール

```bash
git clone https://github.com/miki-826/brief-vault.git
cd brief-vault
npm --prefix web install
npm --prefix server install
```

### 2) レポートを置く

```bash
mkdir -p reports
cp reports/2026-02-06.md reports/2026-02-07.md
```

- ファイル名が `YYYY-MM-DD*.md` の場合、日付を自動抽出して一覧に表示します
- タイトルは Markdown の最初の `# 見出し` を拾います

### 3) ビルドして起動

```bash
npm run build
npm run start
```

起動後：
- `http://localhost:4177`

## 開発

### 開発サーバ（web + server）を同時に起動

```bash
npm run dev
```

- web (Vite) と server (Express) を `concurrently` で同時起動します
- `web` は `/api/*` を Vite proxy で server に転送します

#### API 先を変えたい場合

```bash
VITE_API_TARGET=http://localhost:4177 npm run dev
```

## セキュリティ注意

- 本プロジェクトは「手元で閲覧」用途を想定しています
- `/api/reports/:name` はパストラバーサル対策として、ファイル名を厳格に制限しています

## ライセンス

MIT
