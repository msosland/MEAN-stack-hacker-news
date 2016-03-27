'use strict';

angular.module('newsApp')
.factory('posts', ['$http', function($http) {
  var o = {
    posts: [
      // {title: 'post 1', upvotes: 5, comments: []},
      // {title: 'post 2', upvotes: 2, comments: []},
      // {title: 'post 3', upvotes: 15, comments: []},
      // {title: 'post 4', upvotes: 9, comments: []},
      // {title: 'post 5', upvotes: 4, comments: []}
    ]
  };

  o.getAll = function() {
    return $http.get('/posts').success(function(data){
      angular.copy(data, o.posts);
    });
  };

  o.get = function(id) {
    return $http.get('/posts/' + id).then(function(res){
      return res.data;
    });
  };

  o.create = function(post) {
    return $http.post('/posts', post).success(function(data){
      o.posts.push(data);
    });
  };

  o.upvote = function(post) {
    return $http.put('/posts/' + post._id + '/upvote').success(function(data){
      post.upvotes += 1;
    });
  };

  o.addComment = function(id, comment) {
    return $http.post('/posts/' + id + '/comments', comment);
  };

  o.upvoteComment = function(post, comment) {
    return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote')
      .success(function(data){
        comment.upvotes += 1;
      });
  };

  return o;
}]);