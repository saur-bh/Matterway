var Jasmine = require('jasmine');
var HtmlReporter = require('jasmine-pretty-html-reporter').Reporter;
var path = require('path');
var jasmine = new Jasmine();




jasmine.loadConfigFile('./spec/support/jasmine.json');

// Option for HTML reports
jasmine.addReporter(new HtmlReporter({
  path: path.join(__dirname,'results')
}));

jasmine.execute();



