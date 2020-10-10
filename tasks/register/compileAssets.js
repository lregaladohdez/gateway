/**
 * `tasks/register/compileAssets.js`
 *
 * ---------------------------------------------------------------
 *
 * For more information see:
 *   https://sailsjs.com/anatomy/tasks/register/compile-assets.js
 *
 */
module.exports = function f(grunt) {
  grunt.registerTask('compileAssets', [
    'clean:dev',
    'less:dev',
    'copy:dev',
  ]);
};
