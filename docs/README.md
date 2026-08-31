# docs フォルダ

このフォルダに PDF などのファイルを入れてください。

## 使い方

1. PDF ファイルをこのフォルダ（`docs/`）にコピーする
2. `data/content.js` の `url` に `"docs/ファイル名.pdf"` と記述する

## 例

```js
{
  title: "年間指導計画 2026年度",
  url: "docs/年間指導計画2026.pdf",   // ← このフォルダに置いたファイル名
  ...
}
```

## Google ドライブのリンクを使う場合

Google ドライブで「リンクを知っている全員が閲覧可能」に設定した上で、
共有リンクを `url` に貼り付けてください。

```js
{
  title: "年間指導計画 2026年度",
  url: "https://drive.google.com/file/d/XXXXXXXX/view",
  ...
}
```
