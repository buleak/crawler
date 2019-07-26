
# CSS预处理 SCSS
---
# CSS动画库 Animate.css
---
# ES6 & TypeScript
---
# Vue || React
---
# 代码质量 ESLint
---
# 版本控制 Git
1. 创建 本地 Git仓库: git init
2. 添加文件到本地仓库(暂存区): git add -A/-U/. 
    - -A: 添加所有变化
    - -U: 添加修改 & 删除文件
    - . : 添加修改 & 新增文件
3. 提交文件到本地仓库(当前分支): git commit -m "说明"
4. 关联已有仓库: git remote add origin https://github.com/buleak/XXX.git
5. 从远程仓库克隆: git clone https://github.com/buleak/XXX.git
6. 推送到远程仓库: git push (-u) origin master
7. 查看状态: git status
8. 查看历史命令: git reflog
9. 查看历史记录: git log --pretty=oneline
10. 查看工作区与版本库的区别: git diff HEAD -- 文件名
11. 撤销工作区修改(与暂存区一致): git checkout -- 文件名
12. 撤销暂存区修改(提交到暂存区的修改返回到工作区, 再进行 .11): git reset HEAD 文件名
13. 回退版本库版本: git reset
   - 回退上一版本: git reset --hard HEAR^
   - 回退上上版本: git reset --hard HEAD^^
   - 回退上 n版本: git reset --hard HEAD~n
   - 回退指定版本: git reset --hard 版本号
14. 删除文件: git rm 文件名 & git commit
15. 查看分支: git branch
16. 创建分支: git branch 分支名
17. 切换分支: git checkout 分支名
18. 删除分支: git branch -d 分支名
19. 创建 & 切换分支: git checkout -b 分支名
20. 合并分支(先进入主分支): git merge 分支名


- 报错`fatal: not a git repository (or any of the parent directories): .git`, 本地缺少 .git: git init 
- 报错`error: failed to push some refs to 'https://github.com/buleak/crawler.git'`, 本地缺少 README.md: git pull --rebase origin master

---
# HTTP请求 Axios
---
# 正则表达式
---
# Node框架 Koa2
1. koa-view: 路由
2. koa-view: 视图
3. koa-static: 静态资源
4. koa-session: session
5. koa-websocket: 即时通讯
6. koa-bodyparser: POST
7. koa-art-template: 模板引擎
8. mongoose: 数据库
---
# 热更新 nodemon
---
# 数据库 mongoDB
---
# 单元测试 Jest
```
"scripts": {
    "test": "jest --detectOpenHandles --coverage"
},
"jest": {
    "testEnvironment": "node"
},
npm test
```
1. expect()
---
# 集成测试
---
# 基准测试 [Benchmark.js](https://github.com/bestiejs/benchmark.js ) 
```
npm i -S benchmark
npm i -S microtime
const BenchMark = require('benchmark')
const suite = new BenchMark.Suite

let num = '100'
suite.add('+', () => {bm.init1(num)})
.add('parseInt', () => {bm.init2(num)})
.add('number', () => {bm.init3(num)})
.on('cycle', (e) => {console.log(String(e.target))})
.on('complete', function() {console.log(`Faster is ${this.filter('faster').map('name')}`)})
.run({'async': true})
```