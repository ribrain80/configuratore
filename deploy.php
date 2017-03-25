<?php
namespace Deployer;

require 'recipe/common.php';

set('keep_releases', 5);
set('ssh_type', 'native');
set('ssh_multiplexing', true);


server('mile2', 'splitconf.tk', 443)
    ->user('riccardo','riccardosfelab')
    ->stage('mile2')
    ->set('branch', 'master2')
    ->set('deploy_path', '/var/www/mile2');

set('repository', 'https://github.com/ribrain80/configuratore.git');

/**
 * Setup the environment file in the new release
 */
/*
task('environment', function () {
    run('cp /home/forge/yoursite.com/shared/.env {{release_path}}/.env');
})->desc('Environment setup');
 */

// Laravel writable dirs
set('writable_dirs', ['storage', 'vendor']);

/**
 * Main task
 */
task('deploy', [
    'deploy:prepare',
    'deploy:release',
    'deploy:update_code',
    'deploy:vendors',
    'deploy:symlink',
    'cleanup',

])->desc('Deploy your project');

after('deploy', 'success');