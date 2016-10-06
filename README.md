# Pixiv API Client
[![Build Status](https://travis-ci.org/alphasp/pixiv-api-client.svg?branch=master)](https://travis-ci.org/alphasp/pixiv-api-client)

Promise based Pixiv API client for node.js and react native 


## Install

```
$ npm install pixiv-api-client --save 
```

## Usage

```js
const PixivApi = require('pixiv-api-client');
const pixiv = new PixivApi();

const word = 'ラブライブ';
//login and call api that require login
pixiv.login('username', 'password').then(() => {
  pixiv.illustFollow().then(json => {
	console.log(json);
	return json;
  });
});

//search illusts
pixiv.searchIllust(word).then(json => {
  console.log(json);
  return json;
});
```

## API

### PixivApi()
<hr>

#### pixiv.login(username, password)
- `username` - Pixiv username
- `password` - Pixiv password

#### pixiv.logout()

#### pixiv.searchIllust(word, query)
- `word` - word to search (required)
- `query` - object (optional)
  - `search_target`: `partial_match_for_tags` | `exact_match_for_tags` | `title_and_caption`
  - `sort`: `date_desc` | `date_asc` (default: `date_desc`)
  - `duration`: `within_last_day` | `within_last_week` | `within_last_month`

#### pixiv.userDetail(userId, query)
- `userId` - Pixiv user id
- `query` - object (optional)

#### pixiv.userIllusts(id, query) 
- `id` - Pixiv illust id
- `query` - object (optional)

#### pixiv.userBookmarksIllust(id, query)
- `id` - Pixiv illust id
- `query` - object (optional)
  - `restrict` - one of `public` | `private`

#### pixiv.illustBookmarkDetail(id, query)
require auth

- `id` - Pixiv illust id
- `query` - object (optional)

#### pixiv.illustComments(id, query)
- `id` - Pixiv illust id
- `query` - object (optional)

#### pixiv.illustRelated(id, query)
- `id` - Pixiv illust id
- `query` - object (optional)

#### pixiv.illustDetail(id, query)
- `id` - Pixiv illust id
- `query` - object (optional)

#### pixiv.illustFollow(query)
require auth

- `query` - object (optional)
  - `restrict` - one of `public` | `private`

#### pixiv.illustRecommended(query)
- `query` - object (optional)


#### pixiv.illustRanking(query)
mode `day_r18` | `day_male_r18` | `day_female_r18` | `week_r18` | `week_r18g` require auth

- `query` - object
  - `restrict`: one of `public` | `private`
  - `date`: `2016-08-15`
  - `mode`: `day` | `week` | `month` | `day_male` | `day_female` | `week_original` | `week_rookie` | `day_mang` | `day_r18` | `day_male_r18` | `day_female_r18` | `week_r18` | `week_r18g` (default: `day`)

#### pixiv.illustRanking(query)
- `query` - object (optional)

#### pixiv.trendingTagsIllust(query)
- `query` - object (optional)

#### pixiv.bookmarkIllust(id)
require auth

- `id` - Pixiv illust id

#### pixiv.unbookmarkIllust(id)
require auth

- `id` - Pixiv illust id

#### pixiv.mangaRecommended(query)
- `query` - object (optional)

#### pixiv.novelRecommended(query)
require auth

- `query` - object (optional)

## Tests

Export pixiv username and password before running Tests.

```
$ export USERNAME=Pixiv username
$ export PASSWORD=Pixiv password
$ npm test
```

## License

MIT