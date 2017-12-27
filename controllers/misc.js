const _ = require('lodash');
const config = require('config');
const Twitter = require('twitter');

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
    return Page.find()
      .then(pages => response.sendSuccess(req, res, { data: pages }))
      .catch(err => response.sendError(req, res, { error: err, status: 400 }));
  }
};
