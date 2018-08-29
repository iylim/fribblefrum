require('dotenv').config();
require('./config/database');
var Question = require('./models/Question');

Question.remove({}).then(() => {
    Question.create([
      {question: 'What three words would passengers never want to hear a pilot say?'},
      {question: 'You would never go on a carnival ride called BLANK'},
      {question: 'The secret to a happy life...'},
      {question: 'Name a candle scent designed specifically for Nicki Minaj'},
      {question: 'You should never give alcohol to BLANK'},
      {question: 'Everyone knows that monkeys hate BLANK'},
      {question: 'The worst thing about living in Hell'},
      {question: 'The worst thing for an evil witch to turn you into'},
      {question: 'The best pet ever would be...'}
      
    ]).then(() => {
      process.exit();
    });
  })
