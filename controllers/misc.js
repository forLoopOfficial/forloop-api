const _ = require('lodash');
const config = require('config');
const Twitter = require('twitter');
const axios = require('axios');

const response = require('../services').response;
const logger = require('../services').logger;

module.exports = {
  getTwitterHandleProfile(req, res) {
    const handle = req.params.handle;
    const client = new Twitter({
      consumer_key: config.get('TWITTER_API_KEY'),
      consumer_secret: config.get('TWITTER_API_SECRET'),
      access_token_key: config.get('TWITTER_ACCESS_KEY'),
      access_token_secret: config.get('TWITTER_ACCESS_SECRET')
    });
    return client
      .get('users/show', { screen_name: handle })
      .then(profile => response.sendSuccess(req, res, { data: profile }))
      .catch(err => response.sendError(req, res, { error: err, status: 400 }));
  },

  subscribeMailChimp(req, res) {
    const email = req.body.email;
    const apiKey = config.get('MAILCHIMP_API_KEY');
    const apiUrl = config.get('MAILCHIMP_URL');
    const list = config.get('SUBSCRIBER_LIST');
    const url = `${apiUrl}/lists/${list}/members`;
    const body = {
      email_address: email,
      status: 'subscribed'
    };
    const configObj = {
      auth: {
        username: 'hello',
        password: apiKey
      }
    };
    logger.info('body', body);
    return axios
      .post(url, body, configObj)
      .then(data => response.sendSuccess(req, res, { data: data.data }))
      .catch(err => response.sendError(req, res, { error: err, status: 400 }));
  }
};
