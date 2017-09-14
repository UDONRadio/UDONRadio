'use strict';

module.exports = function(app) {
  /*
   * The `app` object provides access to a variety of LoopBack resources such as
   * models (e.g. `app.models.YourModelName`) or data sources (e.g.
   * `app.datasources.YourDataSource`). See
   * http://docs.strongloop.com/display/public/LB/Working+with+LoopBack+objects
   * for more info.
   */
   app.models.Audio.createContainer({"name": "podcasts"}, function (err, container) {

     if (err.code != 'EEXIST')
        throw err;
   });
   app.models.Audio.createContainer({"name": "songs"}, function (err, container) {

     if (err.code != 'EEXIST')
        throw err;
   });
};
