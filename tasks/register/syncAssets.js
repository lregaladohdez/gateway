/**
 * `tasks/register/syncAssets.js`
 *
 * ---------------------------------------------------------------
 *
 * For more information see:
 *   https://sailsjs.com/anatomy/tasks/register/sync-assets.js
 *
 */
module.exports = function f(grunt) {
  grunt.registerTask('syncAssets', [
    'less:dev',
    'sync:dev',
  ]);
};
