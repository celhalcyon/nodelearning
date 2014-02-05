'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Todo list', function() {
	 var startUpcoming = 0;
	 var startDone = 0;
	
  beforeEach(function() {
    browser().navigateTo('/');
    sleep(1);
    startUpcoming = 2;
    startDone = 1;
  });

  it("should move todo to correct list when user toggles checkbox", function() {
    expect(repeater('.not-done').count()).toBe(startUpcoming);
    expect(repeater('.done').count()).toBe(startDone);

    element('.not-done:nth-child(1) input').click();
    sleep(0.1);
    expect(repeater('.not-done').count()).toBe(startUpcoming-1);
    expect(repeater('.done').count()).toBe(startDone+1);

    element('.done:nth-child(1) input').click();
    sleep(0.1);
    expect(repeater('.not-done').count()).toBe(startUpcoming);
    expect(repeater('.done').count()).toBe(startDone);
  });
});