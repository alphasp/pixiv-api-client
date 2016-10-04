'use strict'

const fetchPonyfill = require('fetch-ponyfill')();
const fetch = fetchPonyfill.fetch;
const qs = require('qs');
const BASE_URL = 'https://app-api.pixiv.net';
const filter = 'for_ios';

function fetchApi(url, options) {
  const finalUrl = BASE_URL + url;
  //console.log(finalUrl);
  return fetch(finalUrl, options).then(res => {
    if (res.status === 200) {
      return res.json();
    }
    else {
      return res.json().then(err => {
        var error = new Error(err.error || err);
        error.status = res.status;
        throw error;  
      })
    }
  });
}

function serialize(obj) {
  return Object.keys(obj).reduce(function(a,k){a.push(k+'='+encodeURIComponent(obj[k]));return a},[]).join('&')
}

class PixivApi {
  constructor(username, password) {
    //this.baseUrl = 'https://app-api.pixiv.net';
    this.username = username;
    this.password = password;
  }
  login() {
    const body = {
      client_id: 'bYGKuGVw91e0NMfPGp44euvGt59s',
      client_secret: 'HP3RmkgAmEGro0gn1x9ioawQE8WMfvLXDz3ZqxpK',
      get_secure_url: 1,
      grant_type: 'password',
      username: this.username,
      password: this.password,
      device_token: 'pixiv'
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: serialize(body)
    }
    return fetch('https://oauth.secure.pixiv.net/auth/token', options).then(res => {
      if (res.status === 200) {
        return res.json();
      }
      else {
        return res.json().then(err => {
          let error; 
          if (err && err.errors && err.errors.system && err.errors.system.message) {
            error = new Error(err.errors.system.message);
          }
          else {
            error = new Error(err);
          }

          error.status = res.status;
          throw error;  
        })
      }
    }).then(json => {
      this.auth = json.response;
      return json;
    });
  }

  authInfo() {
    return this.auth;
  }

  searchIllust(word, query) {
    if (!word) {
      return Promise.reject(new Error('word required'));
    }

    query = qs.stringify(Object.assign({
      word,
      search_target: 'partial_match_for_tags',
      sort: 'date_desc',
      filter: 'for_ios'
    }, query));
    return this.fetchUrl(`/v1/search/illust?${query}`);
  }

  userDetail(id, query) {
    if (!id) {
      return Promise.reject(new Error('user_id required'));
    }

    query = qs.stringify(Object.assign({
      user_id: id,
      filter
    }, query));
    return this.fetchUrl(`/v1/user/detail?${query}`);
  }

  userIllusts(id, query) {
    if (!id) {
      return Promise.reject(new Error('user_id required'));
    }

    query = qs.stringify(Object.assign({
      user_id: id,
      type: 'illust',
      filter
    }, query));
    return this.fetchUrl(`/v1/user/illusts?${query}`);
  }

  userBookmarksIllust(id, query) {
    if (!id) {
      return Promise.reject(new Error('user_id required'));
    }

    query = qs.stringify(Object.assign({
      user_id: id,
      restrict: 'public',
      filter
    }, query));
    return this.fetchUrl(`/v1/user/bookmarks/illust?${query}`);
  }

  //require auth
  illustBookmarkDetail(id, query) {
    if (!id) {
      return Promise.reject(new Error('illust_id required'));
    }

    query = qs.stringify(Object.assign({
      illust_id: id
    }, query));
    return this.fetchUrl(`/v2/illust/bookmark/detail?${query}`);
  }

  illustComments(id, query) {
    if (!id) {
      return Promise.reject(new Error('illust_id required'));
    }

    query = qs.stringify(Object.assign({
      illust_id: id,
      include_total_comments: 'true'
    }, query));
    return this.fetchUrl(`/v1/illust/comments?${query}`);
  }

  illustRelated(id, query) {
    if (!id) {
      return Promise.reject(new Error('illust_id required'));
    }

    query = qs.stringify(Object.assign({
      illust_id: id,
      filter
    }, query));
    return this.fetchUrl(`/v1/illust/related?${query}`);
  }

  illustDetail(id, query) {
    if (!id) {
      return Promise.reject(new Error('illust_id required'));
    }

    query = qs.stringify(Object.assign({
      illust_id: id,
      filter
    }, query));
    return this.fetchUrl(`/v1/illust/detail?${query}`);
  }

  //require auth
  illustFollow(query) {
    query = qs.stringify(Object.assign({
      restrict: 'public'
    }, query));
    return this.fetchUrl(`/v2/illust/follow?${query}`);
  }

  illustRecommended(query) {
    query = qs.stringify(Object.assign({
      //content_type: 'illust',
      include_ranking_label: 'true',
      filter
    }, query));
    return this.fetchUrl(`/v1/illust/recommended?${query}`);
  }

  illustRanking(query) {
    query = qs.stringify(Object.assign({
      mode: 'day', //day_male, day_female, week_original, week_rookie, week, month
      filter
    }, query));
    return this.fetchUrl(`/v1/illust/ranking?${query}`);
  }

  trendingTagsIllust(query) {
    query = qs.stringify(Object.assign({
      filter
    }, query));
    return this.fetchUrl(`/v1/trending-tags/illust?${query}`);
  }

  //POST
  bookmarkIllust(id) {
    if (!id) {
      return Promise.reject(new Error('illust_id required'));
    }
    const body = {
      illust_id: id,
      restrict: 'public'
    };
    //
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: serialize(body)
    }
    return this.fetchUrl('/v1/illust/bookmark/add', options);
  }

  //POST  
  unbookmarkIllust(id) {
    if (!id) {
      return Promise.reject(new Error('illust_id required'));
    }
    const body = {
      illust_id: id,
    };
    //
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': serialize(body).length
      },
      body: serialize(body)
    }
    return this.fetchUrl('/v1/illust/bookmark/delete', options);
  }

  mangaRecommended(query) {
    query = qs.stringify(Object.assign({
      include_ranking_label: 'true',
      filter
    }, query));
    return this.fetchUrl(`/v1/manga/recommended?${query}`);
  }

  //require auth
  novelRecommended(query) {
    query = qs.stringify(Object.assign({
      include_ranking_label: 'true',
      filter
    }, query));
    return this.fetchUrl(`/v1/novel/recommended?${query}`);
  }

  fetchUrl(url, options) {
    if (!url) {
      return Promise.reject("Url cannot be empty");
    }
    options = options || {};
    options.headers = Object.assign({
      'App-OS': 'ios',
      'Accept-Language': 'en-us',
      'App-OS-Version': '9.3.3',
      'App-Version': '6.1.2',
      'User-Agent': 'PixivIOSApp/6.1.2 (iOS 9.0; iPhone8,2)',
    }, options.headers || {});
    if (this.auth && this.auth.access_token) {
      options.headers['Authorization'] = `Bearer ${this.auth.access_token}`;
    }
    return fetchApi(url, options).then(json => {
      return json;
    }).catch(err => {
      //login again in case token expired
      return this.login().then(auth => {
        return fetchApi(url, options);
      });
    });
  }

}

module.exports = PixivApi;
