# storageCache方法使用说明

### 基础用法：

以 `localStorage` 为例，`sesstionStorage` 用法相同：
```js
import {createLocalStorage, createSessionStorage} from "@/utils/cache";

const ls = createLocalStorage()
const ss = createSessionStorage()

ls.set('KEY_NAME', {a: 1})

ls.get('KEY_NAME')

ls.remove('KEY_NAME')

ls.clear()
```


### 配置过期时间：

expire: 过期时间，单位 s，非必传 

```js
ss.set('KEY_NAME', {a: 1, b: 2}, 60 * 60 * 24)
```


