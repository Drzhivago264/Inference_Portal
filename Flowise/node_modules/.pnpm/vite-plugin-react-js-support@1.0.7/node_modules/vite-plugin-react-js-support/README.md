# vite-plugin-react-js-support
vite对jsx语法只认tsx和jsx后缀的文件，可是项目中有很多js类型的文件也是jsx；

# 安装
```

npm install --save-dev vite-plugin-react-js-support
or
yarn add vite-plugin-react-js-support


```
# 使用
```
import vitePlugin from 'vite-plugin-react-js-support';
export default {
    plugins: [
        vitePlugin([], { jsxInject: true }),
    ]
}

```
# 备注
```
// 对于vite预构建会报错的问题，需要把配置改下
export default ({command, mode}) => {
  const rollupOptions = {};
  if(command === 'serve') {
    rollupOptions.input = []
  }
  return {
    build: {
      rollupOptions: rollupOptions
    },
    optimizeDeps: {
      entries: false,
    },
  }
}
```

# 参数
```
// 之所以支持这个配置，是因为cra4版本以后在子文件中不会引入react；
// 如果你的子文件已经引入了react，可以把这项设置为false;
// 而且vite本身的jsxInject只对x(jsx|tsx)结尾的文件类型提供支持;
// 默认会根据react大于等于17的版本，自动注入
jsxInject: true, // 是否为js文件注入 import React from 'react';默认为true
```

还支持传入其他babel的plugin，数组类型。