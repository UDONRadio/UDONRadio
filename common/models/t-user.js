'use strict';

var app = require('../../server/server');

module.exports = function(Tuser) {
  Tuser.afterRemote('create', function(context, modelInstance, next) {
    app.models.Audio.getContainers(function (err, array) {
      console.log(array);
    });
      next();
  });
};
