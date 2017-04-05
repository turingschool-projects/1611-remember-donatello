import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    addReminder(model) {
      model.save().then(() => {
        this.transitionToRoute('reminders');
      })
    }
  }
});
