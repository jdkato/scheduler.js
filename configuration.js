var nconf = require('nconf')
var path = require('path')

var scheConf = new nconf.Provider()
var mainConf = new nconf.Provider()
var optConf = new nconf.Provider()
var name2Conf = {'sche': scheConf, 'main': mainConf, 'opt': optConf}

scheConf.file({file: path.join(__dirname, '/app/schedules.json')})
mainConf.file({file: path.join(__dirname, '/app/schools.json')})
optConf.file({file: path.join(__dirname, '/app/options.json')})

function saveSettings (settingKey, settingValue, file) {
  var conf = name2Conf[file]
  conf.set(settingKey, settingValue)
  conf.save()
}

function readSettings (settingKey, file) {
  var conf = name2Conf[file]
  conf.load()
  return conf.get(settingKey)
}

function getSettings (file) {
  var conf = name2Conf[file]
  conf.load()
  return conf.get()
}

function clearSetting (key, file) {
  var conf = name2Conf[file]
  conf.load()
  conf.clear(key)
  conf.save()
}

module.exports = {
  saveSettings: saveSettings,
  readSettings: readSettings,
  getSettings: getSettings,
  clearSetting: clearSetting
}
