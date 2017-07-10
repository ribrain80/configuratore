<?php

namespace App\Http\ViewCreators;

use Illuminate\View\View;
use App\Repositories\UserRepository;
use Jenssegers\Agent\Agent;
use Log;

/**
 * Detects the user's device is a phone or not
 */
class DeviceDetectorCreator
{

	/**
	 * Agent instance
	 * @var Jenssegers\Agent\Agent
	 */
	protected $agent;

    /**
     * Create a new detector creator.
     *
     * @param  Agent $agent
     * @return void
     */
    public function __construct( Agent $agent ) {
        $this->agent = $agent;
    }

    /**
     * Bind data to the view.
     *
     * @param  View  $view
     * @return void
     */
    public function create( View $view ) {
		$view->with( 'isPhone', intval( !empty( $this->agent->isPhone() ) ) );        
    }
}