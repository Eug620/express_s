### /city

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
// 村级（村委会、居委会）列表
// methods: get
// query provinceCode - String - require
// query cityCode - String - require
// query areaCode - String - require
// query streetCode - String - require
/villages
```

