const _ = require('lodash');
const Joi = require('joi');
const moment = require('moment');
const promise = require('bluebird');

const response = require('../services').response;
const logger = require('../services').logger;

const Event = require('../models/event');

module.exports = {
  getDashboardStat(req, res) {
    const monthStart = moment().startOf('month').toDate();
    const monthEnd = moment().endOf('month').toDate();
    const totalEvents = Event.count({ published: true });
    const currentMonthEvents = Event.count({
      published: true,
      created_at: {
        $gte: monthStart,
        $lte: monthEnd
      }
    });
    const highestAttendance = Event.aggregate(
      { $match: { published: true } },
      {
        $project: {
          attendeesCount: {
            $size: '$attendees'
          }
        }
      },
      {
        $sort: {
          attendeesCount: -1
        }
      },
      { $limit: 1 }
    );
    return promise
      .all([totalEvents, currentMonthEvents, highestAttendance])
      .spread(
        (totalEventCount, currentMonthEventsCount, highestAttendanceCount) => {
          const stats = {
            totalEventCount,
            currentMonthEventsCount,
            highestAttendanceCount: highestAttendanceCount[0].attendeesCount
          };
          return response.sendSuccess(req, res, {
            data: stats,
            message: 'Statistics retreived successfully successfully'
          });
        }
      )
      .catch(err => response.sendError(req, res, { error: err, status: 400 }));
  }
};
