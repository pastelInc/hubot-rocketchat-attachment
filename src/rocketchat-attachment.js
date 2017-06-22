// Description:
//   Enable again the 'rocketchat-attachment' event
//
// Environment:
//   HUBOT_ROCKETCHAT_INCOMING_WEBHOOK
//
// Dependencies:
//   None
//
// Commands:
//   None
//
// Author:
//   pastelInc

module.exports = (robot) => {
  const options = {
    webhook: process.env.HUBOT_ROCKETCHAT_INCOMING_WEBHOOK || null
  };

  if (options.webhook == null) {
    return robot.logger.error('Missing configuration HUBOT_ROCKETCHAT_INCOMING_WEBHOOK');
  }

  const getChannel = (msg) => {
    if (msg.room.match(/^[#@]/)) {
      return msg.room;
    } else if (msg.user && msg.room === msg.user.name) {
      return '@' + msg.room;
    } else {
      return '#' + msg.room;
    }
  };
  const getUsername = (data) => {
    return data.username || robot.name;
  };
  const attachment = (data) => {
    const payload = data.content;

    payload.channel = data.channel || getChannel(data.message);
    payload.username = getUsername(data);
    if (data.icon_url != null) {
      payload.icon_url = data.icon_url;
    } else if (data.icon_emoji != null) {
      payload.icon_emoji = data.icon_emoji;
    }
    const reqbody = JSON.stringify(payload);

    return robot.http(options.webhook).header('Content-Type', 'application/json').post(reqbody)((err, res, body) => {
      if (res.statusCode === 200) {
        return;
      }
      return robot.logger.error('Error!', res.statusCode, body);
    });
  };
  robot.on('rocketchat-attachment', (data) => {
    robot.logger.warning(`Using deprecated event 'rocketchat-attachment'`);
    return attachment(data);
  });
  return robot.on('rocketchat.attachment', (data) => {
    return attachment(data);
  });
};
