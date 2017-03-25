<?php
namespace Deployer;

require_once 'vendor/autoload.php';
require_once 'recipe/common.php';
require_once __DIR__ . '/deploy/laravel.php';
require_once __DIR__ . '/deploy/assets.php';


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

// Laravel shared dirs
set('shared_dirs', [
    'storage/app',
    'storage/framework/cache',
    'storage/framework/sessions',
    'storage/framework/views',
    'storage/logs',
]);

/**
 * Setup the environment file in the new release
 */

task('environment', function () use($deployPath) {
    run('cp ' . $deployPath. '/shared/.env {{release_path}}/.env');
})->desc('Environment setup');



desc('Install bower packages');
task('bower:install', function () {
    run('cd {{release_path}} && bower install');
});






// Laravel writable dirs
set('writable_dirs', ['storage', 'vendor','bootstrap','bootstrap/cache']);

/**
 * Main task
 */
task('deploy', [
    'deploy:prepare',
    'deploy:release',
    'deploy:update_code',
    'deploy:shared',
    'environment',
    'deploy:vendors',
    'deploy:writable',
    'deploy:symlink',
    'artisan:migrate',
    'artisan:cache:clear',
    'npm:install',
    'bower:install',
    'assets:generate',
    'cleanup',

])->desc('Deploy your project');

after('deploy', 'success');
