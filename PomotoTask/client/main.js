import angular from 'angular'
import angularMeteor from 'angular-meteor'
import todosList from '../imports/components/todosList/todosList'

angular.module('PomotoTask', [
  angularMeteor,
  todosList.name
]);
