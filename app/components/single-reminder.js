import Ember from 'ember';

export default Ember.Component.extend({
  model(params) {
    return this.store.findRecord('reminder', params.id);
  }
});
