import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    addReminder: function(model) {
      model.save().then(() => {
        this.transitionToRoute('reminders');
      })
    },
  }
});
