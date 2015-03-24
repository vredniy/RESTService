var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'restserviceserver'
    },
    port: 3000,
    db: 'mongodb://localhost/restserviceserver-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'restserviceserver'
    },
    port: 3000,
    db: 'mongodb://localhost/restserviceserver-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'restserviceserver'
    },
    port: 3000,
    db: 'mongodb://localhost/restserviceserver-production'
  }
};

module.exports = config[env];
