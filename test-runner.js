process.env.IS_LOCAL = true;
process.env.TARGET_URL = 'https://howdy39.dev';
// @see https://script.google.com/d/1qC41Vn-VJ7YiEV9881xIYjm1RcOGy0hCL0dJuVh0-8r_df_0qQ8mrZub/edit?mid=ACjPJvHbTFx942csR5lQQeNGwJH6EH8olXR047RzSw9_CZOxd_r19uCdLIVOgzEktzXLKisvz6feFwE2dnBFDarjWvgXbKkFic24BHo_BCsybTHEHQyc9IW2X8vXcTZObz72tklxm6rSDR4&uiv=2
process.env.WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbyMw1wxBBGqYolnrTFTwGIx63DKBQSS-ZKvscZuJTgtthmN1CcI/exec';

const index = require('./index');
index.handler();
