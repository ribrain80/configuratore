<?php
/**
 * Assets related tasks
 */
namespace Deployer;

require_once 'vendor/autoload.php';
require_once 'recipe/common.php';

/**
 * Set the right version of npm
 */
set('bin/npm', function () {
    return run('which npm')->toString();
});

/**
 * Install the npm packages
 */
task('npm:install', function () {
    $npm_folder_exists = run('if [ ! -L {{deploy_path}}/shared/node_modules ] && [ -d {{deploy_path}}/shared/node_modules ]; then echo true; fi')->toBool();
    if(!$npm_folder_exists) {
        run('cd {{deploy_path}}/current; {{bin/npm}} install');
        run('mv {{deploy_path}}/current/node_modules  {{deploy_path}}/shared');
    }
    run('ln -s {{deploy_path}}/shared/node_modules {{deploy_path}}/current');
})->desc('Execute npm install');


/**
 * Setup the environment file in the new release
 */

task('env:link', function () {
    run('cp {{deploy_path}}/shared/.env {{release_path}}/.env');
})->desc('Environment setup');


/**
 * Install the bower packages
 */
task('bower:install', function () {
    run('cd {{release_path}} && bower install');
})->desc('Execute npm install');

/**
 * Compile and webpack the assets
 * @todo: Handle dev/prod enviroenment
 */
task('assets:generate', function () {
    run('cd {{deploy_path}}/current; gulp');
})->desc('Generating assets');


