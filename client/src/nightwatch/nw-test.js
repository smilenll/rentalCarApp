let today = new Date();
const dd = today.getDate() + 4;
const mm = today.getMonth() + 1;
const yyyy = today.getFullYear();
const returnCarDate = `${mm}-${dd}-${yyyy}`;

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
      .assert.not.elementPresent('[data-car="name"]')
      .click('[data-clear="clear-btn"]');
  },
    'step four: Search for golf': function (browser) {
    browser
      .clearValue('input[type=search]')
      .setValue('input[type=search]', 'golf')
      .assert.containsText('[data-car="name"]', 'VW Golf');
  },

  'step five: Go to golf': function (browser) {
    browser
      .click('[data-car="select"]')
      .assert.containsText('[data-car="name"]', 'VW Golf');
  },
  'step six: Fill the form and send it': function (browser) {
    browser
      .setValue('#firstName', 'Night')
      .setValue('#lastName', 'Watch')
      .clearValue('#age')
      .setValue('#age', '24')
      .clearValue('#dropOff')
      .setValue('#dropOff', returnCarDate)
      .click('#car-submit-btn');
  },
  'step seven: Search for golf': function (browser) {
    browser
      .click('[cars="goToAllCars"]')
      .setValue('input[type=search]', 'golf')
      .pause(1000)
      .assert.not.elementPresent('[data-car="name"]')
      .end();
  },
};
