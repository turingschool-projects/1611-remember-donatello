/* globals server */

import { test } from 'qunit';
import moduleForAcceptance from 'remember/tests/helpers/module-for-acceptance';

import Ember from 'ember';

moduleForAcceptance('Acceptance | reminders list');

test('viewing the homepage', function(assert) {
  server.createList('reminder', 5);

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/reminders');
    assert.equal(Ember.$('.reminder-item').length, 5, 'see all reminders');
    server.shutdown();

  });
});

test('clicking on an individual item', function(assert) {
  server.createList('reminder', 5);

  visit('/reminders');
  click('.reminder-item:first');

  andThen(function() {
    assert.equal(currentURL(), '/reminders/1');
    assert.equal(Ember.$('.reminder-item:first').text().trim(), Ember.$('.reminder-title').text().trim());
    server.shutdown();

  });
});

test('adding a new reminder', function(assert) {
  server.createList('reminder', 5)
  
  visit('/reminders/new');
  fillIn('.title', 'boots');
  fillIn('.body', 'pants');
  fillIn('.date', '2017-01-01');
  click('.save');
  
  andThen(function() {
    assert.equal(currentURL(), '/reminders');
    assert.equal(Ember.$('.reminder-item').length, 6, 'see all reminders');
    assert.equal(Ember.$('.reminder-item:last').text().trim(), 'boots');
    server.shutdown();

  });
});
