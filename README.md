# AI輔助人文應用開發｜課程與學生專案展示網站

講師：申惠豐

這是一個可部署至 GitHub Pages 的多頁靜態網站，包含 7 個課程頁、10 個專案頁、10 個小組檔案頁與 10 種可操作前端原型。不需資料庫、API、帳號或金鑰。

> 課程進度、評分方式、專案提案、研究、測試、開發過程與成果均為展示用模擬內容，不代表所列學生的實際作品或發言。

## 本機預覽

需要 Node.js 20 以上版本。

```bash
npm run build
npm run check
npm run preview
```

瀏覽器開啟 <http://localhost:4173>。`dist/` 是完整部署產物；所有資源使用相對路徑，因此網站放在 GitHub Pages 的儲存庫子路徑也能運作。

## 部署 GitHub Pages

1. 建立 Git 儲存庫並提交檔案，推送至 GitHub 的 `main` 分支。
2. 在 GitHub 儲存庫的 **Settings → Pages → Build and deployment**，將 Source 選為 **GitHub Actions**。
3. 推送後，`.github/workflows/pages.yml` 會建置、驗收並部署 `dist/`。

本專案目前不會自行發布或推送遠端。

## 修改內容

- 課程名稱、講師、導覽、18 週進度、外部資源：`src/data.js`
- 組員、專案內容、標籤、色彩、PRD 與 PLAN：`src/data.js` 的 `projects`
- 各組互動原型：`src/prototypes.js`
- 版型與頁面內容：`src/app.js`
- 視覺與響應式規則：`src/styles.css`
- 部署流程：`.github/workflows/pages.yml`

修改後重新執行 `npm run build && npm run check`。小組檔案由集中資料自動產生，未來若要替換為 Google Drive，可在 `src/app.js` 的 `dHref` 或集中資料欄位改為經查證的外部網址；外部連結須使用新分頁與 `rel="noopener noreferrer"`。
