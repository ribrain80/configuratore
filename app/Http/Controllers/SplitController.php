<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use Log;
use App\Models\Drawer;
use App\Models\Drawertype;

class SplitController extends Controller
{
    /**
     * Show the profile for the given user.
     *
     * @param  int  $id
     * @return Response
     */
    public function step1()
    {
        return view( 'split.step1' );
    }

    public function step2()
    {
        $drawerTypes = Drawertype::all();
        $drawer = new Drawer();
        $drawer->save();
        $drawerID = $drawer->id;

        Log::info('Step2 entry point');
        Log::info('DrawerID: ' . $drawerID );
        Log::info('Drawer types: ' . $drawerTypes );
        
        return view('split.step2', [ "drawerID" => $drawerID, "drawerTypes" => $drawerTypes ] );
    }

    public function step3( Request $request )
    {
        Log::info( $request ); 
        Log::info('Step3 entry point' );
        Log::info('Type chosen: ' . $request->input('typeID') );
        
        $drawer = Drawer::find( $request->input('drawerID') );
        $drawerType = DrawerType::find( $request->input('typeID') );
        $drawer->drawertype()->associate( $drawerType );
        $drawer->save();
        return view( 'split.step3', [ "locale" => $request->input('locale'), "drawerID" => $request->input('drawerID') ] );
    }  

    public function step4( Request $request ) {
         return view( 'split.step4' );
    }  

    public function step5( Request $request ) {
         return view( 'split.step5' );
    }      
}