const CronJob = require('cron').CronJob;
const logger = require('./logger');

const jobs = {
  fetchUsers: {
    cronTime: '00 50/10 * * * *',
    onTick() {
      logger.info('cron', new Date());
    },
    start: true,
    timeZone: 'Africa/Lagos'
  }
};

Object.keys(jobs).forEach(
  key =>
    new CronJob({
      cronTime: jobs[key].cronTime,
      onTick: jobs[key].onTick,
      start: jobs[key].start,
      timeZone: 'Africa/Lagos'
    })
);
