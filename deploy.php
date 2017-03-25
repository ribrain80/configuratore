<?php
namespace Deployer;

require 'recipe/common.php';


$deployPath="/var/www/mile2";


/**
 * Keep latest 5 releases
 */
set('keep_releases', 5);
/**
 * Use of the native ssh command
 */
set('ssh_type', 'native');
set('ssh_multiplexing', true);

/**
 * Define a server conf for the milestone2
 */
server('mile2', 'splitconf.tk', 443)
    ->user('riccardo')
    ->stage('mile2')
    ->set('branch', 'deployer')
    ->set('deploy_path', $deployPath);

/**
 * Set the repository
 */
set('repository', 'https://github.com/ribrain80/configuratore.git');

/**
 * Setup the environment file in the new release
 */

task('environment', function () use($deployPath) {
    run('cp ' . $deployPath. '/shared/.env {{release_path}}/.env');
})->desc('Environment setup');



// Laravel writable dirs
set('writable_dirs', ['storage', 'vendor','bootstrap']);

/**
 * Main task
 */
task('deploy', [
    'deploy:prepare',
    'deploy:release',
    'deploy:update_code',
    'environment',
    'deploy:vendors',
    'deploy:symlink',
    'cleanup',

])->desc('Deploy your project');

after('deploy', 'success');