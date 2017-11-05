import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection("tasks");

Meteor.methods({
  'tasks.insert' (text){
    check(text, String);

    if (!Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }

    Tasks.Collection.insert({
      text: newTask,
      createdAt: new Date(),
      owner: Meteor.userId(),
      checked: false
    });

  },

  'tasks.remove' (taskId){
    check(taskId, String);

    Tasks.remove(taskId);

  },

  'tasks.setChecked' (taskId, setChecked){
    check(taskId, String);
    check(setChecked, Boolean);

    Tasks.update(taskId, {$set:{
      checked:setChecked
    }});

  }
});
