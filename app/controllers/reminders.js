import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    addReminder: function() {
      let reminderTitle = this.get('reminderTitle');
      let reminderBody = this.get('reminderBody');
      let reminderDate = this.get('reminderDate');
    }
  }
});
