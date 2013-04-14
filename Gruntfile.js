module.exports = function (grunt) {
  "use strict";

  grunt.initConfig({
      "watch": {
          "all": {
              "files": [ "./**.less", "./**.jade", "./lib/**.js" ]
            , "tasks": [ "jade:dev", "less:dev", "pakmanager:browser" ]
          }
      }
    , "develop": {
          "server": {
              "file": "bin/server.js"
          }
      }
    , "jade": {
          "dev": {
              "files": {
                  "public/index.html": "./index.jade"
              }
          }
      }
    , "less": {
          "dev": {
              "files": {
                  "public/main.css": "./main.less"
                , "public/screen.css": "./screen.less"
                , "public/print.css": "./print.less"
              }
          }
      }
    , "pakmanager": {
          "browser": {
              "files": {
                  "public/pakmanaged.js": "./"
              }
          }
        , "node": {
              "files": {
                  "server.dist.js": "server.js"
              }
          }
      }
  });
  // uglify
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.loadNpmTasks('grunt-develop');
  grunt.loadNpmTasks('grunt-pakmanager');
  //grunt.loadTasks('grunt-tasks/');
  grunt.registerTask('make', ["jade:dist", "less:dist", "pakmanager:browser"]);
  grunt.registerTask('build', ["jade:dev", "less:dev", "pakmanager:browser"]);
  grunt.registerTask('default', ['build', /*'develop',*/ 'watch']);
};
