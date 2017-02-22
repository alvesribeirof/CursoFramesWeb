//importando o modulo gulp responsável pelo build (fazedor de tarefas)
const gulp = require('gulp');

//importando o modulo gulp-util
const util = require('gulp-util');

//importando as gulpTasks criadas no modulo (arquivo) deps.js
require('./gulpTasks/app');
require('./gulpTasks/deps');
require('./gulpTasks/server');

//declaração da task padrão sempre que for executado o comando gulp no console
gulp.task('default', function () {
  if(util.env.production) { //se a chamada do gulp conter a flag production
    gulp.start('deps', 'app');//chama duas tasks: deps e app
  } else { //se for chamada para o desenvolvimento
    gulp.start('deps', 'app', 'server'); //iniciar as tres tasks: deps, app e server
  }
});
