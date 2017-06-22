const fs = require('fs');
const path = require('path');

module.exports = (robot, scripts) => {
  const scriptsPath = path.resolve(__dirname, 'src');

  if (fs.existsSync(scriptsPath)) {
    const ref = fs.readdirSync(scriptsPath);
    const results = [];

    for (let i = 0, len = ref.length; i < len; i++) {
      const script = ref[i];

      if ((scripts != null) && indexOf.call(scripts, '*') < 0) {
        if (indexOf.call(scripts, script) >= 0) {
          results.push(robot.loadFile(scriptsPath, script));
        } else {
          results.push(void 0);
        }
      } else {
        results.push(robot.loadFile(scriptsPath, script));
      }
    }
    return results;
  }
};
