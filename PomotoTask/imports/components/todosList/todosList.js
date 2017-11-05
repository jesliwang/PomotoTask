import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';

import {Tasks} from '../../api/tasks.js';
import {Tomatos} from '../../api/tomatos.js';
//import {Users} from '../../api/users.js';

import template from './todosList.html';


class TodosListCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.helpers({
      tasks(){
        this.tomato = Tomatos.findOne({
          owner:{
            $eq:Meteor.userId()
          }
        });
        this.onPomoto = (this.tomato != null);

        const selector = {
        }

        selector.owner = {
          $eq:Meteor.userId()
        };

        return Tasks.find(selector, {
          sort: {
            createdAt: -1
          }
        });

      },

      currentUser(){
        return Meteor.user();
      },

      showtomato(){
        return this.onPomoto;
      }
    })
  }

  addTask(newTask){
    Meteor.call("task.insert", newTask, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){

      }
    });

    this.newTask = '';
  }

  setChecked(task){
    Meteor.call("tasks.setChecked", task._id, !task.checked);
  }

  removeTask(task){
    Meteor.call("task.remove", task._id);
  }

  tomatoTick(){
    if(this.onPomoto){
      this.tomatoLeft = 25
    }
  }

  startpomoto(task){
    if(this.onPomoto){

    }
    else {
      Meteor.call("tomatos.add", task._id);

      this.tomato = Tomatos.findOne({
        owner:{
          $eq:Meteor.userId()
        }
      });

      this.onPomoto = this.tomato != null;
    }

  }

}

export default angular.module('todosList', [
  angularMeteor
]).component('todosList', {
    templateUrl: 'imports/components/todosList/todosList.html',
    controller: ['$scope', TodosListCtrl]
  });
