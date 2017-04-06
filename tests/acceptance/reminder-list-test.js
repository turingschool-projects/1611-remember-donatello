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

test('adding a new reminder', function(assert) {
  server.createList('reminder', 5)

  visit('/reminders/new');
  fillIn('.title', 'boots');
  fillIn('.body', 'pants');
  fillIn('.date', '2017-01-01');
  click('.save');

  click('.reminder-item:last');
  andThen(function() {
    assert.equal(currentURL(), '/reminders/6');
    assert.equal(Ember.$('.reminder-item:last').text().trim(), Ember.$('.reminder-title').text().trim());
    assert.equal(Ember.$('.reminder-body').text().trim(), 'pants');
    assert.equal(Ember.$('.reminder-date').text().trim(), '2017-01-01');
    server.shutdown();
  });
});

test('instruction if no reminders present', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(Ember.$('.add-reminder').length, 1, 'see add reminder header');
    assert.equal(Ember.$('.add-btn').length, 1, 'see add reminder button');
  });
});

test('visit root and click add reminder button should take user to form', function(assert) {
  visit('/');
  click('.add-btn');

  andThen(function() {
    assert.equal(currentURL(), '/reminders/new');
  });
});

test('submit idea, click edit, and be able to change information and save changes to list', function(assert) {
  visit('/');
  click('.add-btn');
  fillIn('.title', 'boots');
  fillIn('.body', 'pants');
  fillIn('.date', '2017-01-01');
  click('.save');

  click('.reminder-item:first');
  click('.edit-reminder');
  fillIn('.title', 'boots!!!');
  fillIn('.body', 'pants!!!');
  click('.save');
  click('.reminder-item:first');
  andThen(function() {
    assert.equal(Ember.$('.reminder-item:first').text().trim(), Ember.$('.reminder-title').text().trim());
    assert.equal(Ember.$('.reminder-body').text().trim(), 'pants!!!');
  });
});

test('removes idea from reminder list', function(assert) {
  visit('/')
  click('.add-btn');
  fillIn('.title', 'boots');
  fillIn('.body', 'pants');
  fillIn('.date', '2017-01-01');
  click('.save');

  click('.reminder-item:first');
  click('.delete-btn');

  andThen(function() {
    assert.equal(currentURL(), '/reminders');
    assert.equal(Ember.$('.reminder-item').length, 0, 'see no reminders');
  });
});

test('removes idea from reminder list', function(assert) {
  visit('/')
  click('.add-btn');
  fillIn('.title', 'boots');
  fillIn('.body', 'pants');
  fillIn('.date', '2017-01-01');
  click('.save');

  click('.reminder-item:first');
  click('.edit-reminder');
  click('.delete-btn');

  andThen(function() {
    assert.equal(currentURL(), '/reminders');
    assert.equal(Ember.$('.reminder-item').length, 0, 'see no reminders');
  });
});
