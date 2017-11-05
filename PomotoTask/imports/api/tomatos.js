import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tomatos = new Mongo.Collection("tomatos");

Meteor.methods({
  'tomatos.add' (taskId){
    check(taskId, String);

    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Tomatos.insert({
      owner:Meteor.userId(),
      createdAt: new Date(),
      task:taskId
    });

  }
});
