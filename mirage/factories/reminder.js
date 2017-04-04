import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  title: () => faker.lorem.words().capitalize(),
  date: () => faker.date.recent(3),
  body: () => faker.lorem.paragraph(),
});
