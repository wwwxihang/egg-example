'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
	const { router, controller } = app;

	// curl
	router.get('/curl/index', controller.curl.index);
	router.get('/curl/get', controller.curl.get);
	router.post('/curl/post', controller.curl.post);
	router.put('/curl/put', controller.curl.put);
	router.del('/curl/del', controller.curl.del);
	router.post('/curl/submit', controller.curl.submit);
	router.post('/curl/upload', controller.curl.upload);

	//user
	router.get('/user/list', 'user.list');
	router.get('/user/info/:id', 'user.info');
	router.get('/user/add', 'user.add');
	router.get('/user/update', 'user.update');
};
