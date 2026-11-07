import {mkdir,rm,cp,writeFile} from 'node:fs/promises';
import {projects} from '../src/data.js';
const out=new URL('../dist/',import.meta.url);
await rm(out,{recursive:true,force:true});await mkdir(out,{recursive:true});await cp(new URL('../src/',import.meta.url),new URL('./assets/',out),{recursive:true});
const html=({page='home',depth=0,project='',title='AI輔助人文應用開發'})=>`<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="AI輔助人文應用開發課程與學生專案展示網站"><meta name="theme-color" content="#172522"><title>${title}</title><link rel="stylesheet" href="${'../'.repeat(depth)}assets/styles.css"></head><body data-page="${page}" data-depth="${depth}" ${project?`data-project="${project}"`:''}><div id="app"></div><noscript>本網站需要 JavaScript 才能顯示互動內容。</noscript><script type="module" src="${'../'.repeat(depth)}assets/app.js"></script></body></html>`;
async function page(path,opts){const dir=new URL(path,out);await mkdir(dir,{recursive:true});await writeFile(new URL('index.html',dir),html(opts),'utf8')}
await page('./',{page:'home',depth:0});
for(const [slug,title] of [['instructor','講師'],['course','課程內容'],['grading','課程說明與評分標準'],['showcase','期末成果發表'],['teams','分組名單'],['resources','開發工具與資源']])await page(`./${slug}/`,{page:slug,depth:1,title:`${title}｜AI輔助人文應用開發`});
for(const p of projects){await page(`./projects/${p.id}/`,{page:'project',depth:2,project:p.id,title:`${p.name}｜AI輔助人文應用開發`});await page(`./teams/${p.id}/`,{page:'docs',depth:2,project:p.id,title:`${p.team} 小組檔案｜AI輔助人文應用開發`})}
await writeFile(new URL('.nojekyll',out),'','utf8');
await writeFile(new URL('404.html',out),html({page:'404',depth:0,title:'找不到頁面｜AI輔助人文應用開發'}),'utf8');
console.log(`Built ${7+projects.length*2} pages in dist/`);
