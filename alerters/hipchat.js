/**
 * this module can send message to a hipchat room once enough anomalies
 * were detected, to enable it, add this module to `alerter.modules` in
 * configs.toml
 */

var util = require('util');
var request = require('request');


var log;
var configs;


var pattern = 'trending %s, ' +
  '<a href="%s/?pattern=%s&limit=1">%s</a> ' +
  '(%d anomalies)';

var apiPattern = 'http://api.hipchat.com/v1/rooms/message?' +
  'format=json&auth_token=%s';


function notify(name, count, trend) {
  log.info('Notify hipchat.., %s %d %d',name, count, trend);
  var trend_ = trend > 0 ? '↑' : '↓';
  var weburl = configs.alerter.hipchat.weburl;
  var message = util.format(pattern, trend_, weburl, name, name, count);
  var roomId = configs.alerter.hipchat.roomId;
  var notify_ = configs.alerter.hipchat.notify;
  var data = {'room_id': roomId, from: 'Bell Alerter', message: message,
    notify: +notify_};

  var api = util.format(apiPattern, configs.alerter.hipchat.token);

  request.post(api).form(data).on('error', function(err) {
    log.error('Hipchat request error: %s', err);
  });
}


var stats = {};

function alert(event) {
  var datapoint = event[0];
  var trend = event[1];
  var name = datapoint[0];
  var time = datapoint[1][0];
  var mult = datapoint[1][2];

  var step = configs.interval;
  var thre = configs.alerter.hipchat.threshold;

  var stat = stats[name] = stats[name] || {};

  if (stat.time > time - 2 * step) {
    stat.count = stat.count || 0;
    stat.count += 1;

    if (stat.count >= thre) {
      notify(name, stat.count, trend);
    }
  }

  stat.time = time;
}



exports.init = function(configs_, alerter, log_) {
  configs = configs_;
  log = log_;
  alerter.on('anomaly detected', alert);
};
