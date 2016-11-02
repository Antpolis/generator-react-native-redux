const { spawnSync, execSync } = require('child_process');
const semver = require('semver');
const generator = require('yeoman-generator');
const _s = require('underscore.string');
const rimraf = require('rimraf');

function getYarnVersionIfAvailable() {
  let yarnVersion;
  try {
    // execSync returns a Buffer -> convert to string
    if (process.platform === 'win32') {
      yarnVersion = (execSync('yarn --version').toString() || '').trim();
    } else {
      yarnVersion = (execSync('yarn --version 2>/dev/null').toString() || '').trim();
    }
  } catch (error) {
    return null;
  }
  // yarn < 0.16 has a 'missing manifest' bug
  try {
    if (semver.gte(yarnVersion, '0.16.0')) {
      return yarnVersion;
    }
    return null;
  } catch (error) {
    console.error('Cannot parse yarn version: ' + yarnVersion);
    return null;
  }
}

module.exports = generator.Base.extend({
  init() {
    const cb = this.async();

    this.option('npm', {
      desc: 'Use the npm client, even if yarn is available.',
      type: Boolean,
      defaults: false,
    });

    this.prompt([{
      name: 'appName',
      message: 'What do you want to name your app?',
      default: this.appname.replace(/\s/g, '-'),
    }]).then(props => {
      this.appName = _s.camelize(props.appName);
      this.appname = this.appName.toLowerCase();
      this.name = this.user.git.name();
      this.email = this.user.git.email();

      this.template('watchmanconfig', '.watchmanconfig');
      this.template('flowconfig', '.flowconfig');
      this.template('buckconfig', '.buckconfig');
      this.template('gitignore', '.gitignore');
      this.template('eslintrc', '.eslintrc');
      this.template('_package.json', 'package.json');
      this.template('README.md');
      this.template('babelrc', '.babelrc');
      this.template('index.android.js');
      this.template('index.ios.js');
      this.template('yarn.lock');

      this.directory('src', 'src');
      this.directory('test', 'test');

      // ios
      this.template(
        'ios/RNBoilerplate.xcodeproj/project.pbxproj',
        `ios/${this.appName}.xcodeproj/project.pbxproj`
      );
      this.template(
        'ios/RNBoilerplate.xcodeproj/xcshareddata/xcschemes/RNBoilerplate.xcscheme',
        `ios/${this.appName}.xcodeproj/xcshareddata/xcschemes/${this.appName}.xcscheme`
      );
      this.directory('ios/RNBoilerplate', 'ios/' + this.appName);
      this.template(
        'ios/RNBoilerplateTests/RNBoilerplateTests.m',
        'ios/' + this.appName + 'Tests/' + this.appName + 'Tests.m'
      );
      this.template(
        'ios/RNBoilerplateTests/Info.plist',
        'ios/' + this.appName + 'Tests/Info.plist'
      );

      // android
      this.directory(
        'android/app/src/main/java/com/rnboilerplate',
        `android/app/src/main/java/com/${this.appname}`
      );
      this.directory('android');

      cb();
    });
  },
  end() {
    const cb = this.async();
    rimraf(
      this.destinationPath('android/app/src/main/java/com/rnboilerplate'),
      cb
    );
  },
  install() {
    const yarnVersion = !this.options.npm && getYarnVersionIfAvailable();

    if (yarnVersion && process.env.NODE_ENV !== 'test') {
      spawnSync('yarn', { shell: true, stdio: 'inherit' });
    } else {
      this.installDependencies({ bower: false });
    }
  },
});
