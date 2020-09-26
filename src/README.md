## 开发思路

1. 利用 commander 插件, 获取项目名称`projectName`和`--template`
2. 创建`projectName`文件夹
    - 如果`projectName`为空,终止进程
    - 如果`projectName`已存在, 终止进程
    - 如果`projectName`校验通过, 创建新文件夹
3. 解析`--template`, 使用`download-git-repo`拉取远端不同的模板代码
4. 使用`inquirer`, 交互式输入内容, 替换模板`package.json`占位符

## Commander

> [Github 中文文档](https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md)
