import test from 'ava';
import isObject from 'lodash.isobject';
import PixivApi from './';

const userId = 67388;
const illustId = 56317718;
const ugoiraId = 44298524;
const novelId = 9545577;
const novelSeriesId = 941585;
const word = 'ラブライブ';
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

test.beforeEach('new PixivApi()', async t => {
  const pixiv = new PixivApi();
  t.context.pixiv = pixiv;
  const json = await t.context.pixiv.login(username, password);
  t.true(isObject(json));
});

// test('login', async (t) => {
//   const json = await t.context.pixiv.login(username, password);
//   t.true(isObject(json));
// });

test('expose a constructor', t => {
  t.true(typeof PixivApi === 'function');
});

test('auth', async t => {
  const json = await t.context.pixiv.authInfo();
  t.true(isObject(json));
});

test('refreshAccessToken', async t => {
  const json = await t.context.pixiv.refreshAccessToken();
  t.true(isObject(json));
});

test('userDetail', async t => {
  const json = await t.context.pixiv.userDetail(userId);
  t.true(isObject(json));
});

test('userIllusts', async t => {
  const json = await t.context.pixiv.userIllusts(userId);
  t.true(isObject(json));
});

test('userNovels', async t => {
  const json = await t.context.pixiv.userNovels(userId);
  t.true(isObject(json));
});

test('userBookmarksIllust', async t => {
  const json = await t.context.pixiv.userBookmarksIllust(userId);
  t.true(isObject(json));
});

test('userBookmarksNovel', async t => {
  const json = await t.context.pixiv.userBookmarksNovel(userId);
  t.true(isObject(json));
});

test('userBookmarkIllustTags', async t => {
  const json = await t.context.pixiv.userBookmarkIllustTags();
  t.true(isObject(json));
});

test('userBookmarkNovelTags', async t => {
  const json = await t.context.pixiv.userBookmarkNovelTags();
  t.true(isObject(json));
});

test('userFollowing', async t => {
  const json = await t.context.pixiv.userFollowing(userId);
  t.true(isObject(json));
});

test('illustComments', async t => {
  const json = await t.context.pixiv.illustComments(illustId);
  t.true(isObject(json));
});

test('illustCommentsV2', async t => {
  const json = await t.context.pixiv.illustCommentsV2(illustId);
  t.true(isObject(json));
});

test('novelComments', async t => {
  const json = await t.context.pixiv.novelComments(novelId);
  t.true(isObject(json));
});

test('novelCommentsV2', async t => {
  const json = await t.context.pixiv.novelCommentsV2(novelId);
  t.true(isObject(json));
});

test('illustRelated', async t => {
  const json = await t.context.pixiv.illustRelated(illustId);
  t.true(isObject(json));
});

test('illustDetail', async t => {
  const json = await t.context.pixiv.illustDetail(illustId);
  t.true(isObject(json));
});

test('novelDetail', async t => {
  const json = await t.context.pixiv.novelDetail(novelId);
  t.true(isObject(json));
});

test('novelText', async t => {
  const json = await t.context.pixiv.novelText(novelId);
  t.true(isObject(json));
});

test('illustFollow', async t => {
  const json = await t.context.pixiv.illustFollow();
  t.true(isObject(json));
});

test('novelFollow', async t => {
  const json = await t.context.pixiv.novelFollow();
  t.true(isObject(json));
});

test('illustRecommended', async t => {
  const json = await t.context.pixiv.illustRecommended();
  t.true(isObject(json));
});

test('illustRanking', async t => {
  const json = await t.context.pixiv.illustRanking();
  t.true(isObject(json));
});

test('novelRanking', async t => {
  const json = await t.context.pixiv.novelRanking();
  t.true(isObject(json));
});

test('illustNew', async t => {
  const json = await t.context.pixiv.illustNew();
  t.true(isObject(json));
});

test('illustMyPixiv', async t => {
  const json = await t.context.pixiv.illustMyPixiv();
  t.true(isObject(json));
});

test('novelMyPixiv', async t => {
  const json = await t.context.pixiv.novelMyPixiv();
  t.true(isObject(json));
});

test('trendingTagsIllust', async t => {
  const json = await t.context.pixiv.trendingTagsIllust();
  t.true(isObject(json));
});

test('trendingTagsNovel', async t => {
  const json = await t.context.pixiv.trendingTagsNovel();
  t.true(isObject(json));
});

test('searchIllust', async t => {
  const json = await t.context.pixiv.searchIllust(word);
  t.true(isObject(json));
});

test('searchIllustPopularPreview', async t => {
  const json = await t.context.pixiv.searchIllustPopularPreview(word);
  t.true(isObject(json));
});

test('searchIllustBookmarkRanges', async t => {
  const json = await t.context.pixiv.searchIllustBookmarkRanges(word);
  t.true(isObject(json));
});

test('searchNovel', async t => {
  const json = await t.context.pixiv.searchNovel(word);
  t.true(isObject(json));
});

test('searchNovelPopularPreview', async t => {
  const json = await t.context.pixiv.searchNovelPopularPreview(word);
  t.true(isObject(json));
});

test('searchNovelBookmarkRanges', async t => {
  const json = await t.context.pixiv.searchNovelBookmarkRanges(word);
  t.true(isObject(json));
});

test('searchUser', async t => {
  const json = await t.context.pixiv.searchUser(word);
  t.true(isObject(json));
});

test('searchAutoComplete', async t => {
  const json = await t.context.pixiv.searchAutoComplete(word);
  t.true(isObject(json));
});

test('illustBookmarkDetail', async t => {
  const json = await t.context.pixiv.illustBookmarkDetail(illustId);
  t.true(isObject(json));
});

test('novelBookmarkDetail', async t => {
  const json = await t.context.pixiv.novelBookmarkDetail(novelId);
  t.true(isObject(json));
});

test('mangaNew', async t => {
  const json = await t.context.pixiv.mangaNew();
  t.true(isObject(json));
});

test('mangaRecommended', async t => {
  const json = await t.context.pixiv.mangaRecommended();
  t.true(isObject(json));
});

test('novelNew', async t => {
  const json = await t.context.pixiv.novelNew();
  t.true(isObject(json));
});

test('novelRecommended', async t => {
  const json = await t.context.pixiv.novelRecommended();
  t.true(isObject(json));
});

test('userRecommended', async t => {
  const json = await t.context.pixiv.userRecommended();
  t.true(isObject(json));
});

test('ugoiraMetaData', async t => {
  const json = await t.context.pixiv.ugoiraMetaData(ugoiraId);
  t.true(isObject(json));
});

test('novelSeries', async t => {
  const json = await t.context.pixiv.novelSeries(novelSeriesId);
  t.true(isObject(json));
});

test.serial('followUser', async t => {
  const json = await t.context.pixiv.followUser(userId);
  t.true(isObject(json));
});

test.serial('userFollowDetail', async t => {
  const json = await t.context.pixiv.userFollowDetail(userId);
  t.true(isObject(json));
});

test.serial('userFollower', async t => {
  const json = await t.context.pixiv.userFollower(userId);
  t.true(isObject(json));
});

test.serial('unfollowUser', async t => {
  const json = await t.context.pixiv.unfollowUser(userId);
  t.true(isObject(json));
});

test.serial('userMyPixiv', async t => {
  const json = await t.context.pixiv.userMyPixiv(userId);
  t.true(isObject(json));
});

test.serial('logout', async t => {
  await t.context.pixiv.logout();
  t.true(t.context.pixiv.authInfo() === null);
});

test('error if params missing', async t => {
  await t.throws(t.context.pixiv.login(), /username required/);
  await t.throws(t.context.pixiv.login(username), /password required/);
  await t.throws(t.context.pixiv.userDetail(), /user_id required/);
  await t.throws(t.context.pixiv.userIllusts(), /user_id required/);
  await t.throws(t.context.pixiv.userNovels(), /user_id required/);
  await t.throws(t.context.pixiv.userBookmarksIllust(), /user_id required/);
  await t.throws(t.context.pixiv.userBookmarksNovel(), /user_id required/);
  await t.throws(t.context.pixiv.userFollowing(), /user_id required/);
  await t.throws(t.context.pixiv.userFollowDetail(), /user_id required/);
  await t.throws(t.context.pixiv.userFollower(), /user_id required/);
  await t.throws(t.context.pixiv.userMyPixiv(), /user_id required/);

  await t.throws(t.context.pixiv.illustBookmarkDetail(), /illust_id required/);
  await t.throws(t.context.pixiv.illustComments(), /illust_id required/);
  await t.throws(t.context.pixiv.illustCommentsV2(), /illust_id required/);
  await t.throws(t.context.pixiv.illustRelated(), /illust_id required/);
  await t.throws(t.context.pixiv.illustDetail(), /illust_id required/);
  await t.throws(t.context.pixiv.illustAddComment(), /illust_id required/);
  await t.throws(
    t.context.pixiv.illustAddComment(illustId),
    /comment required/
  );

  await t.throws(t.context.pixiv.novelBookmarkDetail(), /novel_id required/);
  await t.throws(t.context.pixiv.novelComments(), /novel_id required/);
  await t.throws(t.context.pixiv.novelCommentsV2(), /novel_id required/);
  await t.throws(t.context.pixiv.novelDetail(), /novel_id required/);
  await t.throws(t.context.pixiv.novelSeries(), /series_id required/);
  await t.throws(t.context.pixiv.novelText(), /novel_id required/);
  await t.throws(t.context.pixiv.novelAddComment(), /novel_id required/);

  await t.throws(t.context.pixiv.ugoiraMetaData(), /illust_id required/);

  await t.throws(t.context.pixiv.bookmarkIllust(), /illust_id required/);
  await t.throws(t.context.pixiv.unbookmarkIllust(), /illust_id required/);

  await t.throws(t.context.pixiv.followUser(), /user_id required/);
  await t.throws(t.context.pixiv.unfollowUser(), /user_id required/);

  await t.throws(t.context.pixiv.searchIllust(), /word required/);
  await t.throws(t.context.pixiv.searchIllustPopularPreview(), /word required/);
  await t.throws(t.context.pixiv.searchIllustBookmarkRanges(), /word required/);
  await t.throws(t.context.pixiv.searchNovel(), /word required/);
  await t.throws(t.context.pixiv.searchNovelPopularPreview(), /word required/);
  await t.throws(t.context.pixiv.searchNovelBookmarkRanges(), /word required/);
  await t.throws(t.context.pixiv.searchUser(), /word required/);
  await t.throws(t.context.pixiv.searchAutoComplete(), /word required/);
});
