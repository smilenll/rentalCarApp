const rentDate = new Date(new Date()
  .setMonth(new Date()
    .getMonth() + 1))
  .toISOString()
  .slice(0, 16);

module.exports = {
  'step one: navigate to Dashboard': function (browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('[scope="col"]');
  },
  'step two: navigate to Cars': function (browser) {
    browser
      .click('[cars="goToAllCars"]');
  },
  'step three: Search for Lada': function (browser) {
    browser
      .setValue('input[type=search]', 'Lada')
      .click('button[type="submit"]')
      .waitForElementVisible('[data-name=notFound]')
      .assert.containsText('[data-name=notFound]', 'No result')
      .clearValue('input[type=search]');
  },
  'step four: Search for golf': function (browser) {
    browser
      .setValue('input[type=search]', 'golf')
      .click('button[type="submit"]')
      .assert.containsText('[class="card-title"]', 'golf');
  },
  'step five: Go to golf': function (browser) {
    browser
      .click('[data-car="select"]')
      .assert.containsText('[class="card-title"]', 'golf');
  },
  'step six: Fill the form and send it': function (browser) {
    browser
      .setValue('#firstName', 'Night')
      .setValue('#lastName', 'Watch')
      .clearValue('#age')
      .setValue('#age', '25')
      .clearValue('#dropOff')
      .setValue('#dropOff', rentDate)
      .click('#car-submit-btn');
  },
  'step seven: Search for golf': function (browser) {
    browser
      .click('[cars="goToAllCars"]')
      .setValue('input[type=search]', 'golf')
      .click('button[type="submit"]')
      .assert.not.containsText('[class="card-title"]', 'golf')
      .end();
  },

  // 'step eight: return car': function (browser) {
  //   browser
  //     .assert.containsText('[class="contract-user-name"]', 'Night Watch')
  //     .click('[class="btn btn-outline-primary btn-block"]')
  //     .end();
  // },

};
