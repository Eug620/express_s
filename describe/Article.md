### /article

```js
// 获取文章列表All
// methods: GET
/getArticleList
```

```js
// 获取热门文章列表
// methods: GET
/getHotArticle
```

```js
// 文章列表index
// methods: GET
// param size - number
// param page - number
/getArticle
```

```js
// 新增文章
// methods: POST
// param article_title - string - require
// param article_describe - string - require
// param article_content - string - require
// param author - string - require
/createArticle
```

```js
// 删除文章
// methods: POST
// param article_id - Number - require
/deleteArticle
```

```js
// 文章详情
// methods: POST
// param article_id - string - require
/detailArticle
```