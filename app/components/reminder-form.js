import Ember from 'ember';

export default Ember.Component.extend({
 actions: {
   deleteReminder(model) {
     model.deleteRecord();
     model.save();
   }
 }
});
