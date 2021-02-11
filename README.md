# Pixiv API Client
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Promise based Pixiv API client for node.js and react native 


## Note
Since 8th Feb 2021, `login` api no longer working, pixiv now require authenticate with oauth 2.0. You will need to either use tool like wireshark/charles to sniff refresh token and auth with `refreshAccessToken` or follow oauth 2.0 flow which will only work on authorized url or app.


## Install

```
$ npm install pixiv-api-client --save 
```

## Usage

```js
const PixivApi = require('pixiv-api-client');
const pixiv = new PixivApi();

const word = 'ラブライブ';
pixiv.tokenRequest('code', 'codeVerfier').then(() => {
  return pixiv.searchIllust(word).then(json => {
	console.log(json);
	return pixiv.requestUrl(json.next_url);
  }).then(json => {
	console.log(json); //next results
  });
});
```

## API

### PixivApi(options)
- `options` - object (optional)
  - `headers`: custom headers for request

#### pixiv.tokenRequest(code, codeVerifier)
- `code` - Authorization code return by pixiv auth server through PKCE flow
- `codeVerifier` - Code verifier generated from PKCE challenge


#### [Deprecated] pixiv.login(username, password, rememberPassword)
Api client will try once to relogin again on error if rememberPassword is set to `true`

- `username` - Pixiv username
- `password` - Pixiv password
- `rememberPassword` - Boolean (default: `true`)

#### pixiv.logout()

#### pixiv.refreshAccessToken(refreshToken)
Refresh access token with refreshToken

- `refreshToken` - string (if not provided, will use refresh token that stored with api client after login)

#### [Deprecated] pixiv.createProvisionalAccount(nickName)

- `nickName` - string

#### pixiv.userState()
require auth

#### pixiv.editUserAccount(fields)
require auth

- `fields` - object
  - pixivId
  - email
  - currentPassword
  - newPassword

#### pixiv.sendAccountVerificationEmail()  
require auth

#### pixiv.searchIllust(word, options)
require auth

- `word` - word to search (required)
- `options` - object (optional)
  - `search_target`: `partial_match_for_tags` | `exact_match_for_tags` | `title_and_caption` (default: `partial_match_for_tags`)
  - `sort`: `date_desc` | `date_asc` | `popular_desc` (`popular_desc` only available for pixiv premium member) (default: `date_desc`)
  - `start_date`: Date
  - `end_date`: Date

#### pixiv.searchIllustPopularPreview(word, options)
require auth

- `word` - word to search (required)
- `options` - object (optional)
  - `search_target`: `partial_match_for_tags` | `exact_match_for_tags` | `title_and_caption` (default: `partial_match_for_tags`)
  - `sort`: `date_desc` | `date_asc` (default: `date_desc`)
  - `start_date`: Date
  - `end_date`: Date

#### pixiv.searchIllustBookmarkRanges(word, options)
require auth

- `word` - word to search (required)
- `options` - object (optional)
  - `search_target`: `partial_match_for_tags` | `exact_match_for_tags` | `title_and_caption` (default: `partial_match_for_tags`)
  - `start_date`: Date
  - `end_date`: Date

#### pixiv.searchUser(word)
require auth

- `word` - word to search (required)

#### pixiv.searchAutoComplete(word)
require auth

- `word` - word to search (required)

#### pixiv.searchAutoCompleteV2(word)
require auth 

- `word` - word to search (required)

#### pixiv.userDetail(userId, options)
- `userId` - Pixiv user id (required)
- `options` - object (optional)

#### pixiv.userIllusts(id, options) 
require auth

- `id` - Pixiv user id (required)
- `options` - object (optional)
  - `type` - one of `illust` | `manga`

#### pixiv.userBookmarksIllust(id, options)
require auth

- `id` - Pixiv user id (required)
- `options` - object (optional)
  - `restrict` - one of `public` | `private` (default: `public`)

#### pixiv.userBookmarkIllustTags(options)
require auth

- `options` - object (optional)
  - `restrict` - one of `public` | `private` (default: `public`)

#### pixiv.userNovels(id, options) 
require auth

- `id` - Pixiv user id (required)
- `options` - object (optional)
 
#### pixiv.userBookmarksNovel(id, options)
require auth

- `id` - Pixiv user id
- `options` - object (optional)
  - `restrict` - one of `public` | `private` (default: `public`)

#### pixiv.userBookmarkNovelTags(options)
require auth

- `options` - object (optional)
  - `restrict` - one of `public` | `private` (default: `public`)

#### pixiv.illustBookmarkDetail(id, options)
require auth

- `id` - Pixiv illust id (required)
- `options` - object (optional)

#### pixiv.novelBookmarkDetail(id, options)
require auth

- `id` - Pixiv novel id (required)
- `options` - object (optional)

#### pixiv.illustComments(id, options)
require auth

- `id` - Pixiv illust id (required)
- `options` - object (optional)

#### pixiv.illustCommentsV2(id, options)
require auth

- `id` - Pixiv illust id (required)
- `options` - object (optional)

#### pixiv.illustCommentReplies(id, options)
require auth

- `id` - Pixiv illust comment id (required)
- `options` - object (optional)

#### pixiv.novelComments(id, options)
require auth

- `id` - Pixiv novel id (required)
- `options` - object (optional)

#### pixiv.novelCommentsV2(id, options)
require auth

- `id` - Pixiv novel id (required)
- `options` - object (optional)

#### pixiv.novelCommentReplies(id, options)
require auth

- `id` - Pixiv novel comment id (required)
- `options` - object (optional)

#### pixiv.illustRelated(id, options)
require auth

- `id` - Pixiv illust id (required)
- `options` - object (optional)

#### pixiv.illustDetail(id, options)
require auth

- `id` - Pixiv illust id (required)
- `options` - object (optional)

#### pixiv.novelDetail(id, options)
require auth

- `id` - Pixiv novel id (required)
- `options` - object (optional)

#### pixiv.novelText(id, options)
require auth

- `id` - Pixiv novel id (required)
- `options` - object (optional)

#### pixiv.novelSeries(id, options)
require auth

- `id` - Pixiv novel series id (required)
- `options` - object (optional)

#### pixiv.illustNew(options)
require auth

- `options` - object (optional)
 
#### pixiv.illustFollow(options)
require auth

- `options` - object (optional)
  - `restrict` - one of `all` | `public` | `private`  (default: `all`)

#### pixiv.novelFollow(options)
require auth

- `options` - object (optional)
  - `restrict` - one of `all` | `public` | `private`  (default: `all`)

#### pixiv.illustRecommended(options)
require auth

- `options` - object (optional)

#### pixiv.illustRanking(options)
require auth

- `options` - object
  - `date`: Date
  - `mode`: `day` | `week` | `month` | `day_male` | `day_female` | `week_original` | `week_rookie` | `day_r18` | `day_male_r18` | `day_female_r18` | `week_r18` | `week_r18g`| `day_manga` | `week_manga` | `month_manga` | `week_rookie_manga` | `day_r18_manga` | `week_r18_manga` | `week_r18g_manga` (default: `day`)

#### pixiv.novelRanking(options)
require auth

- `options` - object
  - `date`: Date
  - `mode`: `day` | `week` | `month` | `day_male` | `day_female` | `week_original` | `week_rookie` | `day_r18` | `day_male_r18` | `day_female_r18` | `week_r18` | `week_r18g`| `day_manga` | `week_manga` | `month_manga` | `week_rookie_manga` | `day_r18_manga` | `week_r18_manga` | `week_r18g_manga` (default: `day`)
 
#### pixiv.illustMyPixiv()
require auth

#### pixiv.novelMyPixiv()
require auth

#### pixiv.illustAddComment(id, comment, parentCommentId)
require auth

- `id` - Pixiv illust id (required)
- `comment` - string (required)
- `parentCommentId` - Pixiv comment id (optional, to reply to comment`

#### pixiv.novelAddComment(id, comment, parentCommentId)
require auth

- `id` - Pixiv novel id (required)
- `comment` - string (required)
- `parentCommentId` - Pixiv comment id (optional, to reply to comment`

#### pixiv.ugoiraMetaData(id)
require auth

- `id` - Pixiv illust(ugoira) id (required)

#### pixiv.trendingTagsIllust(options)
require auth

- `options` - object (optional)

#### pixiv.trendingTagsNovel(options)
require auth

- `options` - object (optional)

#### pixiv.bookmarkIllust(id, restrict, tags)
require auth

- `id` - Pixiv illust id (required)
- `restrict` - one of `public` | `private` (default: `public`)
- `tags` - array of string (optional)

#### pixiv.unbookmarkIllust(id)
require auth

- `id` - Pixiv illust id (required)

#### pixiv.bookmarkNovel(id, restrict, tags)
require auth

- `id` - Pixiv novel id (required)
- `restrict` - one of `public` | `private` (default: `public`)
- `tags` - array of string (optional)

#### pixiv.unbookmarkNovel(id)
require auth

- `id` - Pixiv novel id (required)

#### pixiv.mangaRecommended(options)
require auth

- `options` - object (optional)

#### pixiv.mangaNew(options)
require auth

- `options` - object (optional)

#### pixiv.searchNovel(word, options)
require auth

- `word` - word to search (required)
- `options` - object (optional)
  - `search_target`: `partial_match_for_tags` | `text` | `keyword` (default: `partial_match_for_tags`)
  - `sort`: `date_desc` | `date_asc` | `popular_desc` (`popular_desc` only available for pixiv premium member) (default: `date_desc`)
  - `start_date`: Date
  - `end_date`: Date

#### pixiv.searchNovelPopularPreview(word, options)
require auth

- `word` - word to search (required)
- `options` - object (optional)
  - `search_target`: `partial_match_for_tags` | `text` | `keyword` (default: `partial_match_for_tags`)
  - `sort`: `date_desc` | `date_asc` | `popular_desc` (`popular_desc` only available for pixiv premium member) (default: `date_desc`)
  - `start_date`: Date
  - `end_date`: Date

#### pixiv.searchNovelBookmarkRanges(word, options)
require auth

- `word` - word to search (required)
- `options` - object (optional)
  - `search_target`: `partial_match_for_tags` | `text` | `keyword` (default: `partial_match_for_tags`)
  - `start_date`: Date
  - `end_date`: Date
   
#### pixiv.novelRecommended(options)
require auth

- `options` - object (optional)

#### pixiv.novelNew(options)
require auth

- `options` - object (optional)

#### pixiv.novelRanking(options)
require auth

- `options` - object
  - `date`: Date
  - `mode`: `day` | `week` | `day_male` | `day_female` | `week_rookie` | `day_r18` | `day_male_r18` | `day_female_r18` | `week_r18` | `week_r18g` (default: `day`)

#### pixiv.userRecommended(options)
require auth

- `options` - object (optional)

#### pixiv.userFollowing(id, options)
require auth

- `id` - Pixiv user id (required)
- `options` - object (optional)
  - `restrict`: `public` | `private` (default: `public`)

#### pixiv.userFollower(id, options)
require auth

- `id` - Pixiv user id (required)
- `options` - object (optional)

#### pixiv.userMyPixiv(id)
require auth

- `id` - Pixiv user id (required)

#### pixiv.followUser(id, restrict)
require auth

- `id` - Pixiv user id (required)
- `restrict` - one of `public` | `private` (default: `public`)

#### pixiv.unfollowUser(id)
require auth

- `id` - Pixiv user id (required)

#### pixiv.setLanguage(lang)
set HTTP header Accept-Language for pixiv api request
 
- `lang` - HTTP header Accept-Language

#### pixiv.requestUrl(url, options)
can be use to request pixiv endpoint or use for traversing results by passing next_url from result of other api such as `pixiv.searchIllust`

- `options` - object (optional)


## Tests

Export pixiv username and password before running Tests.

```
$ export USER_NAME=Pixiv username
$ export PASSWORD=Pixiv password
$ npm test
```

## Related projects
[PxView](https://github.com/alphasp/pxview) - Android/iOS client for Pixiv built in react-native

## License

MIT