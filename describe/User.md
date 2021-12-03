### /user

```js
// 获取用户列表
// methods: GET
/getUserList
```

```js
// 新增用户
// methods: POST
// param user_name - string - require
// param user_password - string - require
// param user_email - string
/createUser
```

```js
// 更新用户
// methods: POST
// param user_name - string - require
// param user_password - string - require
// param user_id - Number - require
// param email - string
/updateUser
```

```js
// 删除用户
// methods: POST
// param user_id - Number - require
/deleteUser
```

```js
// 登录
// methods: POST
// param user_name - string - require
// param user_password - string - require
/login
```

