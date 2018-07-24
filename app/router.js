'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/list', controller.home.index);
  router.get('/export', controller.excel.index);
  router.post('/user/create',controller.user.create);
  app.all('/user/token', app.oAuth2Server.token());
  app.get('/user/authenticate', app.oAuth2Server.authenticate(), 'user.authenticate');
};
