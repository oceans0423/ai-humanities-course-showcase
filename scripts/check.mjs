import {readFile,readdir,access} from 'node:fs/promises';
import {projects,site} from '../src/data.js';
const expected={
  'TEAM-01':['詹庭睿','賴謙亮'],'TEAM-02':['陳姵璇','陳詠紋'],'TEAM-03':['廖予迎'],'TEAM-04':['周郁耘'],'TEAM-05':['葉羽茹','林佳玟'],'TEAM-06':['吳翔恩','李綵舒'],'TEAM-07':['洪晟倍','田祈文'],'TEAM-08':['許建笙','任永承'],'TEAM-09':['鄭宇成','洪新佑'],'TEAM-10':['蔡宜辰']};
const errors=[];
if(site.title!=='AI輔助人文應用開發'||site.instructor!=='申惠豐')errors.push('課名或講師錯誤');
if(projects.length!==10)errors.push(`專案數量為 ${projects.length}，應為 10`);
for(const p of projects){if(JSON.stringify(p.members)!==JSON.stringify(expected[p.team]))errors.push(`${p.team} 組員不符`);if(!p.features?.length||!p.acceptance||!p.prototype)errors.push(`${p.team} 內容不完整`);for(const path of [`dist/projects/${p.id}/index.html`,`dist/teams/${p.id}/index.html`])try{await access(path)}catch{errors.push(`缺少 ${path}`)}}
for(const slug of ['','instructor','course','grading','showcase','teams','resources'])try{await access(`dist/${slug?slug+'/':''}index.html`)}catch{errors.push(`缺少 ${slug||'首頁'}`)}
const files=await readdir('dist/assets');if(!files.includes('styles.css')||!files.includes('app.js')||!files.includes('prototypes.js'))errors.push('缺少靜態資源');
const data=await readFile('src/data.js','utf8');if((data.match(/TEAM-\d\d/g)||[]).length!==10)errors.push('TEAM 定義不是 10 筆');
if(errors.length){console.error(errors.join('\n'));process.exit(1)}console.log('Checks passed: 10 teams, 27 pages, member mapping, prototypes, documents and assets.');
