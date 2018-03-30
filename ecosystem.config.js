const App = require('./package.json')
module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name      : App.name,
      script    : "server.js",
      cwd: "./",
      env: {
        NODE_PATH: "/usr/local/lib/node_modules"
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  // deploy : {
  //   pro: {
  //     user: 'root',
  //     host: ['121.40.230.178', '120.55.113.215'],
  //     ref: 'origin/master',
  //     repo: `git@git.jufandev.com:fe/${App.name}.git`,
  //     path: `/var/www/${App.name}`,
  //     'pre-deploy': 'git pull',
  //     env: {
  //       NODE_ENV: 'production'
  //     }
  //   },
  //   dev : {
  //     user : "root",
  //     host : "192.168.21.30",
  //     ref  : "origin/master",
  //     repo : "git@git.jufandev.com:fe/Collection.git",
  //     path : "/var/www/Collection",
  //     "post-deploy" : "source /var/www/start.sh",
  //     env  : {
  //       NODE_ENV: "dev"
  //     }
  //   }
  // }
}
