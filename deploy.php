<?php
// # Namespace
namespace Deployer;

// # importing needed libs
require_once 'vendor/autoload.php';
require_once 'recipe/common.php';
require_once __DIR__ . '/deploy/laravel.php';
require_once __DIR__ . '/deploy/assets.php';

// # Keep latest 5 releases
set( 'keep_releases', 3 );

// # Use of the native ssh command
set( 'ssh_type', 'native' );
set( 'ssh_multiplexing', true );

// # Define a server conf for the milestone2
server('mile2', 'splitconf.tk', 443)
    ->user('riccardo')
    ->password('riccardosfelab')    // Not a great idea but usefull (dont use for production)
    ->stage('mile2')
    ->set('branch', 'group_a')
    ->set('deploy_path', "/var/www/mile2");

server('production', 'split.salice.com', 443)
    ->user('giuseppe')
   // ->password('riccardosfelab')    // Not a great idea but usefull (dont use for production)
    ->stage('production')
    ->set('branch', 'master')
    ->set('deploy_path', "/var/www/split.salice.com");

// # Set the repository
set('repository', 'https://github.com/ribrain80/configuratore.git');

// # Laravel shared dirs
set('shared_dirs', [
    'storage/app',
    'storage/framework/cache',
    'storage/framework/sessions',
    'storage/framework/views',
    'storage/logs',
]);

// # Laravel writable dirs
set('writable_dirs', ['storage', 'vendor','bootstrap','bootstrap/cache']);

/**
 * Main task
 */
task('deploy', [
    'deploy:prepare',
    'deploy:release',
    'deploy:update_code',
    'deploy:shared',
    'env:link',
    'deploy:vendors',
    'deploy:symlink',
    'artisan:migrate',
    'artisan:cache:clear',
    'npm:install',
    'bower:install',
    'assets:generate',
    'cleanup',

])->desc('Deploy your project');

after('deploy', 'success');
