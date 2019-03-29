'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
	const { router, controller } = app;

	// app.router.get('/home/index', app.controller.home.index);
	// app.router.redirect('/', '/home/index', 302);

	router.get('/home', controller.home.index);
	router.get('/user/fetch/:id', controller.user.fetch);
	router.get('/user', 'user.index');
	router.get('/search', controller.search.index);
	router.get('/user/:id', controller.user.info);

	router.post('createPost', '/create', controller.post.create);
	router.get('/listPostsGet', controller.post.listPostsGet);
	router.post('/listPostsPost', controller.post.listPostsPost);


	// curl
	router.get('/curl/index', controller.curl.index);
	router.get('/curl/get', controller.curl.get);
	router.post('/curl/post', controller.curl.post);
	router.put('/curl/put', controller.curl.put);
	router.del('/curl/del', controller.curl.del);
	router.post('/curl/submit', controller.curl.submit);
	router.post('/curl/upload', controller.curl.upload);
};
