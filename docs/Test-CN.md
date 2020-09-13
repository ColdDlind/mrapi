# jest 单元测试文档

## jest 依赖

1. `npm install`
   使用`npm install --save-dev jest`进行安装
2. `jest --init`
   基于您的项目，Jest 将向您提出几个问题，并将创建一个基本的配置文件，每个选项都有一个简短的说明.
   - Choose the test environment that will be used for testing ? 代码是运行在 Node 环境还是 Web 环境下？
   - Do you want Jest to add coverage reports ? 是否生成测试覆盖率文件？
   - Automatically clear mock calls and instrances between every test?是否需要在测试之后清楚模拟调用的一些东西？
     执行以上命令之后会生成 jest.config.js 文件
3. `代码覆盖率`
   - 首先在`jest.config.js`中添加`coverageDirectory : "coverage"打开快照功能
   - 执行`npx jest --coverage`
4. 其他支持
   - 支持 babel
     `npm install --dev babel-jest @babel/core @babel/preset-env`
   - 支持 ts
     `npm install --dev @babel/preset-typescript`
   - 添加 babel.config.js
