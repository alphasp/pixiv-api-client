/* eslint strict:0 */

'use strict';

const axios = require('axios');
const qs = require('qs');

const BASE_URL = 'https://app-api.pixiv.net';
const CLIENT_ID = 'KzEZED7aC0vird8jWyHM38mXjNTY';
const CLIENT_SECRET = 'W9JZoJe00qPvJsiyCGT3CCtC6ZUtdpKpzMbNlUGP';
const filter = 'for_ios';

function callApi(url, options) {
  const finalUrl = /\b(http|https)/.test(url) ? url : BASE_URL + url;
  return axios(finalUrl, options).then(res => res.data).catch(err => {
    if (err.response) {
      throw err.response.data;
    } else {
      throw err.message;
    }
  });
}

class PixivApi {
  login(username, password, rememberPassword) {
    if (!username) {
      return Promise.reject(new Error('username required'));
    }
    if (!password) {
      return Promise.reject(new Error('password required'));
    }
    const data = qs.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      get_secure_url: 1,
      grant_type: 'password',
      username,
      password,
      device_token: 'pixiv',
    });
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };
    return axios('https://oauth.secure.pixiv.net/auth/token', options)
      .then(res => {
        this.auth = res.data.response;
        // eslint-disable-next-line no-unneeded-ternary
        this.rememberPassword = rememberPassword === false ? false : true;
        if (rememberPassword) {
          this.username = username;
          this.password = password;
        }
        return res.data.response;
      })
      .catch(err => {
        if (err.response) {
          throw err.response.data;
        } else {
          throw err.message;
        }
      });
  }

  logout() {
    this.auth = null;
    this.username = null;
    this.password = null;
    return Promise.resolve();
  }

  authInfo() {
    return this.auth;
  }

  refreshAccessToken(refreshToken) {
    if ((!this.auth || !this.auth.refresh_token) && !refreshToken) {
      return Promise.reject(new Error('refresh_token required'));
    }
    const data = qs.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      get_secure_url: 1,
      grant_type: 'refresh_token',
      refresh_token: refreshToken || this.auth.refresh_token,
    });
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };
    return axios('https://oauth.secure.pixiv.net/auth/token', options)
      .then(res => {
        this.auth = res.data.response;
        return res.data.response;
      })
      .catch(err => {
        if (err.response) {
          throw err.response.data;
        } else {
          throw err.message;
        }
      });
  }

  searchIllust(word, options) {
    if (!word) {
      return Promise.reject(new Error('word required'));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          word,
          search_target: 'partial_match_for_tags',
          sort: 'date_desc',
          filter,
        },
        options
      )
    );
    return this.requestUrl(`/v1/search/illust?${queryString}`);
  }

  searchNovel(word, options) {
    if (!word) {
      return Promise.reject(new Error('word required'));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          word,
          search_target: 'partial_match_for_tags',
          sort: 'date_desc',
          filter,
        },
        options
      )
    );
    return this.requestUrl(`/v1/search/novel?${queryString}`);
  }

  searchUser(word) {
    if (!word) {
      return Promise.reject(new Error('word required'));
    }
    const queryString = qs.stringify(
      Object.assign({
        word,
        filter,
      })
    );
    return this.requestUrl(`/v1/search/user?${queryString}`);
  }

  searchAutoComplete(word) {
    if (!word) {
      return Promise.reject('word required');
    }
    const queryString = qs.stringify(
      Object.assign({
        word,
      })
    );
    return this.requestUrl(`/v1/search/autocomplete?${queryString}`);
  }

  userDetail(id, options) {
    if (!id) {
      return Promise.reject(new Error('user_id required'));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          user_id: id,
          filter,
        },
        options
      )
    );
    return this.requestUrl(`/v1/user/detail?${queryString}`);
  }

  userIllusts(id, options) {
    if (!id) {
      return Promise.reject(new Error('user_id required'));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          user_id: id,
          filter,
        },
        options
      )
    );
    return this.requestUrl(`/v1/user/illusts?${queryString}`);
  }

  userBookmarksIllust(id, options) {
    if (!id) {
      return Promise.reject(new Error('user_id required'));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          user_id: id,
          restrict: 'public',
          filter,
        },
        options
      )
    );
    return this.requestUrl(`/v1/user/bookmarks/illust?${queryString}`);
  }

  // require auth
  userBookmarkIllustTags(options) {
    const queryString = qs.stringify(
      Object.assign(
        {
          restrict: 'public',
        },
        options
      )
    );
    return this.requestUrl(`/v1/user/bookmark-tags/illust?${queryString}`);
  }

  // require auth
  illustBookmarkDetail(id, options) {
    if (!id) {
      return Promise.reject(new Error('illust_id required'));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          illust_id: id,
        },
        options
      )
    );
    return this.requestUrl(`/v2/illust/bookmark/detail?${queryString}`);
  }

  illustComments(id, options) {
    if (!id) {
      return Promise.reject(new Error('illust_id required'));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          illust_id: id,
          include_total_comments: true,
        },
        options
      )
    );
    return this.requestUrl(`/v1/illust/comments?${queryString}`);
  }

  illustRelated(id, options) {
    if (!id) {
      return Promise.reject(new Error('illust_id required'));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          illust_id: id,
          filter,
        },
        options
      )
    );
    return this.requestUrl(`/v2/illust/related?${queryString}`);
  }

  illustDetail(id, options) {
    if (!id) {
      return Promise.reject(new Error('illust_id required'));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          illust_id: id,
          filter,
        },
        options
      )
    );
    return this.requestUrl(`/v1/illust/detail?${queryString}`);
  }

  illustNew(options) {
    const queryString = qs.stringify(
      Object.assign(
        {
          content_type: 'illust',
          filter,
        },
        options
      )
    );
    return this.requestUrl(`/v1/illust/new?${queryString}`);
  }

  // require auth
  illustFollow(options) {
    const queryString = qs.stringify(
      Object.assign(
        {
          restrict: 'all',
        },
        options
      )
    );
    return this.requestUrl(`/v2/illust/follow?${queryString}`);
  }

  // require auth
  illustRecommended(options) {
    const queryString = qs.stringify(
      Object.assign(
        {
          include_ranking_illusts: true,
          filter,
        },
        options
      )
    );
    return this.requestUrl(`/v1/illust/recommended?${queryString}`);
  }

  illustRecommendedPublic(options) {
    const queryString = qs.stringify(
      Object.assign(
        {
          include_ranking_illusts: true,
          filter,
        },
        options
      )
    );
    return this.requestUrl(`/v1/illust/recommended-nologin?${queryString}`);
  }

  illustRanking(options) {
    const queryString = qs.stringify(
      Object.assign(
        {
          mode: 'day',
          filter,
        },
        options
      )
    );
    return this.requestUrl(`/v1/illust/ranking?${queryString}`);
  }

  // require auth
  illustMyPixiv() {
    return this.requestUrl('/v2/illust/mypixiv');
  }

  // require auth
  illustAddComment(id, comment) {
    if (!id) {
      return Promise.reject(new Error('illust_id required'));
    }
    if (!comment) {
      return Promise.reject(new Error('comment required'));
    }
    const data = qs.stringify({
      illust_id: id,
      comment,
    });
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };
    return this.requestUrl(`/v1/illust/comment/add`, options);
  }

  trendingTagsIllust(options) {
    const queryString = qs.stringify(
      Object.assign(
        {
          filter,
        },
        options
      )
    );
    return this.requestUrl(`/v1/trending-tags/illust?${queryString}`);
  }

  // POST
  bookmarkIllust(id, restrict, tags) {
    if (!id) {
      return Promise.reject(new Error('illust_id required'));
    }
    if (restrict && ['public', 'private'].indexOf(restrict) === -1) {
      return Promise.reject(new Error('invalid restrict value'));
    }
    if (tags && !Array.isArray(tags)) {
      return Promise.reject(new Error('invalid tags value'));
    }
    const data = qs.stringify({
      illust_id: id,
      restrict: restrict || 'public',
      tags: tags && tags.length ? tags : undefined,
    });
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };
    return this.requestUrl('/v2/illust/bookmark/add', options);
  }

  // POST
  unbookmarkIllust(id) {
    if (!id) {
      return Promise.reject(new Error('illust_id required'));
    }
    const data = qs.stringify({
      illust_id: id,
    });
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };
    return this.requestUrl('/v1/illust/bookmark/delete', options);
  }

  // POST
  followUser(id, restrict) {
    if (!id) {
      return Promise.reject(new Error('user_id required'));
    }
    if (restrict && ['public', 'private'].indexOf(restrict) === -1) {
      return Promise.reject(new Error('invalid restrict value'));
    }
    const data = qs.stringify({
      user_id: id,
      restrict: restrict || 'public',
    });
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };
    return this.requestUrl('/v1/user/follow/add', options);
  }

  // POST
  unfollowUser(id) {
    if (!id) {
      return Promise.reject(new Error('user_id required'));
    }
    const data = qs.stringify({
      user_id: id,
      restrict: 'public',
    });
    //
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };
    return this.requestUrl('/v1/user/follow/delete', options);
  }

  mangaRecommended(options) {
    const queryString = qs.stringify(
      Object.assign(
        {
          include_ranking_label: true,
          filter,
        },
        options
      )
    );
    return this.requestUrl(`/v1/manga/recommended?${queryString}`);
  }

  mangaNew(options) {
    const queryString = qs.stringify(
      Object.assign(
        {
          content_type: 'manga',
          filter,
        },
        options
      )
    );
    return this.requestUrl(`/v1/illust/new?${queryString}`);
  }

  // require auth
  novelRecommended(options) {
    const queryString = qs.stringify(
      Object.assign(
        {
          include_ranking_novels: true,
          filter,
        },
        options
      )
    );
    return this.requestUrl(`/v1/novel/recommended?${queryString}`);
  }

  novelRecommendedPublic(options) {
    const queryString = qs.stringify(
      Object.assign(
        {
          include_ranking_novels: true,
          filter,
        },
        options
      )
    );
    return this.requestUrl(`/v1/novel/recommended-nologin?${queryString}`);
  }

  novelNew(options) {
    const queryString = qs.stringify(options);
    return this.requestUrl(`/v1/novel/new?${queryString}`);
  }

  userRecommended(options) {
    const queryString = qs.stringify(
      Object.assign(
        {
          filter,
        },
        options
      )
    );
    return this.requestUrl(`/v1/user/recommended?${queryString}`);
  }

  userFollowing(id, options) {
    if (!id) {
      return Promise.reject('user_id required');
    }
    const queryString = qs.stringify(
      Object.assign(
        {
          user_id: id,
          restrict: 'public',
        },
        options
      )
    );
    return this.requestUrl(`/v1/user/following?${queryString}`);
  }

  userFollowDetail(id) {
    if (!id) {
      return Promise.reject('user_id required');
    }
    const queryString = qs.stringify({ user_id: id });
    return this.requestUrl(`/v1/user/follow/detail?${queryString}`);
  }

  userFollower(id, options) {
    if (!id) {
      return Promise.reject('user_id required');
    }
    const queryString = qs.stringify(
      Object.assign(
        {
          user_id: id,
          filter,
        },
        options
      )
    );
    return this.requestUrl(`/v1/user/follower?${queryString}`);
  }

  // require auth
  userMyPixiv(id) {
    if (!id) {
      return Promise.reject('user_id required');
    }
    const queryString = qs.stringify({ user_id: id });
    return this.requestUrl(`/v1/user/mypixiv?${queryString}`);
  }

  requestUrl(url, options) {
    if (!url) {
      return Promise.reject('Url cannot be empty');
    }
    options = options || {};
    options.headers = Object.assign(
      {
        'App-OS': 'ios',
        // 'Accept-Language': 'en-us',
        // 'Accept-Language': 'ja-jp',
        'App-OS-Version': '9.3.3',
        'App-Version': '6.1.2',
        'User-Agent': 'PixivIOSApp/6.1.2 (iOS 9.0; iPhone8,2)',
      },
      options.headers || {}
    );
    if (this.auth && this.auth.access_token) {
      options.headers.Authorization = `Bearer ${this.auth.access_token}`;
    }
    return callApi(url, options).then(json => json).catch(err => {
      if (this.rememberPassword) {
        if (this.username && this.password) {
          return this.login(this.username, this.password).then(() => {
            options.headers.Authorization = `Bearer ${this.auth.access_token}`;
            return callApi(url, options);
          });
        }
      }
      throw err;
    });
  }
}

module.exports = PixivApi;
