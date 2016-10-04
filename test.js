import test from 'ava';
import isObject from 'lodash.isobject';
import PixivApi from './';

const userId = 67388;
const illustId = 56317718;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

test.beforeEach('new PixivApi()', async t => {
  const pixiv = new PixivApi(username, password);
  t.context.pixiv = pixiv;
  const json = await t.context.pixiv.login();
  t.true(isObject(json));
});

test('login', async t => {
  const json = await t.context.pixiv.login();
  t.true(isObject(json));
})

test('expose a constructor', t => {
  t.true(typeof PixivApi === 'function');
});

test('auth', async t => {
  const json = await t.context.pixiv.authInfo();
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

test('userBookmarksIllust', async t => {
  const json = await t.context.pixiv.userBookmarksIllust(userId);
  t.true(isObject(json));
});

test('illustComments', async t => {
  const json = await t.context.pixiv.illustComments(illustId);
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

test('illustFollow', async t => {
  const json = await t.context.pixiv.illustFollow(userId);
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

test('trendingTagsIllust', async t => {
  const json = await t.context.pixiv.trendingTagsIllust();
  t.true(isObject(json));
});

test('searchIllust', async t => {
  const json = await t.context.pixiv.searchIllust('レム');
  t.true(isObject(json));
});

test('illustBookmarkDetail', async t => {
  const json = await t.context.pixiv.illustBookmarkDetail(illustId);
  t.true(isObject(json));
});

test.serial('bookmarkIllust', async t => {
  const json = await t.context.pixiv.bookmarkIllust(illustId);
  t.true(isObject(json));
});

test.serial('unbookmarkIllust', async t => {
  const json = await t.context.pixiv.unbookmarkIllust(illustId);
  t.true(isObject(json));
});

test('mangaRecommended', async t => {
  const json = await t.context.pixiv.mangaRecommended();
  t.true(isObject(json));
});

test('novelRecommended', async t => {
  const json = await t.context.pixiv.novelRecommended();
  t.true(isObject(json));
});

test('error if params missing', async t => {
  await t.throws(t.context.pixiv.userDetail(), /user_id required/);
  await t.throws(t.context.pixiv.userIllusts(), /user_id required/);
  await t.throws(t.context.pixiv.userBookmarksIllust(), /user_id required/);

  await t.throws(t.context.pixiv.illustBookmarkDetail(), /illust_id required/);
  await t.throws(t.context.pixiv.illustComments(), /illust_id required/);
  await t.throws(t.context.pixiv.illustRelated(), /illust_id required/);
  await t.throws(t.context.pixiv.illustDetail(), /illust_id required/);

  await t.throws(t.context.pixiv.bookmarkIllust(), /illust_id required/);
  await t.throws(t.context.pixiv.unbookmarkIllust(), /illust_id required/);


  await t.throws(t.context.pixiv.searchIllust(), /word required/);

  await t.throws(t.context.pixiv.illustBookmarkDetail(), /illust_id required/);
});