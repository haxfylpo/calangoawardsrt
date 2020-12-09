require('dotenv').config()
const Twit = require('twit');

/*
 * - Insert each Twitter credential inside it's equivalent quote.
 */
const config = {
  consumer_key: 'AsqdQJvmXJWCOmL3caILYuHir',
  consumer_secret: 'dWVCOy4eEiziTfzfSyWEOQ7CC2fq01i6ODaNSahQZohM8eo0jN',
  access_token: '1336311407663525888-1PnYD3eHYVKM6DNSOjsAWIZcJXbEZR',
  access_token_secret: 'ddtibEf9G8kloMzrYaWFCBlD5oit35lhWpQg3k26oIhwe',
};

/*
 * - Replace "ex1, ex2" with the words you want to retweet.
 * - Separate words with commas.
 * - Keep words inside quotes.
 * - DO NOT repeat the same word with caps on and off (example: "word,Word,WORD").
 * - If "example" is between the selected words, the bot will retweet any variation of the word:
 *   example,Example,EXAMPLE,ExAmPlE...
 */
const words = '#calangoawards';

/*
 * - Change 'mybot' with your bot account '@'.
 * - Example: if your account '@' is '@twitter_bot', you should write only 'twitter_bot'
 */
const screenName = 'clangoawardsbot';

/*
 * If you are a not a programmer, avoid changing anything on the next lines
 */

const twit = new Twit(config);
const stream = twit.stream('statuses/filter', { track: words.split(',').map(w => w.trim()) });

console.log('Bot is starting!');
try {
  stream.on('tweet', tweet => {
    if (tweet.user.screen_name === screenName) return;

    if (!tweet.retweeted_status) {
      twit.post('statuses/retweet/:id', { id: tweet.id_str }, (err, data) => {
        if (err || !data.text) {
          return console.log(`Error retweeting user "@${tweet.user.screen_name}"`);
        }
        console.log(`Retweeted user "@${tweet.user.screen_name}":\n"${tweet.text}"\n`);
      });
    }
  });
} catch (_) {
  console.log('An error ocurred.');
  process.exit();
}
