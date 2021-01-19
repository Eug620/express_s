### Interface :

`BaseUrl`

```js
http://XX.XX.XXX.XXX
```

`Port`

```js
3000
```

`/`

```js
// 获取接口详情列表
// methods: GET
/getInterfaceDetail
```

```js
// 新增接口详情
// methods: POST
// param belong - string - require
// param name - string - require
/addInterfaceDetail
```

```js
// 更新接口详情
// methods: POST
// param belong - string - require
// param name - string - require
// param id - number - require
/updateInterfaceDetail
```

```js
// 删除接口详情
// methods: POST
// param id - number - require
/deleteInterfaceDetail
```

```js
// 获取接口日志详情列表
// methods: GET
/getInterfaceLog
```

`/user`

```js
// 获取用户列表
// methods: GET
/getUserList
```

```js
// 新增用户
// methods: POST
// param userName - string - require
// param password - string - require
// param email - string
/createUser
```

```js
// 更新用户
// methods: POST
// param userName - string - require
// param password - string - require
// param id - Number - require
// param email - string
/updateUser
```

```js
// 删除用户
// methods: POST
// param id - Number - require
/deleteUser
```

`/image`

```js
// 获取图片列表
// methods: GET
/getImageList
```

```js
// 新增图片
// methods: POST
// param image_url - string - require
/addImage
```

```js
// 更新图片
// methods: POST
// param image_url - string - require
// param image_id - Number - require
/updateImage
```

```js
// 删除图片
// methods: POST
// param image_id - Number - require
/deleteImage
```

`/city`

```js
// 省级（省份、直辖市、自治区）列表
// methods: get
/provinces
```

```js
// 地级（城市）列表
// methods: get
// query provinceCode - String - require
/cities
```

```js
// 县级（区县) 列表
// methods: get
// query provinceCode - String - require
// query cityCode - String - require
/areas
```

```js
// 乡级（乡镇、街道）列表
// methods: get
// query provinceCode - String - require
// query cityCode - String - require
// query areaCode - String - require
/streets
```

```js
// 村级（村委会、居委会）列表 (TODO)
// methods: get
// query provinceCode - String - require
// query cityCode - String - require
// query areaCode - String - require
// query streetCode - String - require
/villages
```