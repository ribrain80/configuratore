<template>

    <div class="row" id="step-ponte">

        <div class="col-lg-12">
            <h2 lang="it">Scelta del ponte</h2>
        </div>

        <!-- BLOCCO ALERTS -->
        <div class="col-lg-12" v-if="$parent.showAlert">
            <div class="alert alert-danger alert-dismissible fade in" id="alert" lang="it">
                <button type="button" class="close" aria-label="Close" data-dismiss="alert"><span aria-hidden="true">×</span></button> <strong>Attenzione!</strong> {{ $parent.alert_message }}
            </div>
        </div>

        <div class="col-lg-12">

            <div class="row">
               <span class="help-block">Vuoi inserire elementi ponte? orizzontali o verticali?</span>
            </div>

            <h4 class="">Orientamento Ponti</h4>

            <div class="row">
                <div class="col-lg-6" v-show="!$parent.width_not_suitable_4bridge">
                    <div class="panel panel-default" :class="{ 'bg-success': ('H'==$parent.bridge_orientation)}">
                        <div class="panel-body" @click="$parent.setOrientation('H')" lang="it">Orizzontale</div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="panel panel-default" :class="{ 'bg-success': ('V'==$parent.bridge_orientation)}" >
                        <div class="panel-body" @click="$parent.setOrientation('V')" lang="it">Verticale</div>
                    </div>
                </div>
            </div>

        </div>

        <div class="col-lg-12"> 

            <div class="row">
                
                <div class="col-lg-5" v-show="$parent.bridge_orientation">   
                    <div class="row">
                       <span class="help-block" >A che altezza vuoi mettere i ponti?</span>
                    </div> 
                    <h4 class="">Altezza di posizionamento</h4>

                    <div class="row" v-for="bridge_support in $parent.bridge_supports">
                        <div class="col-lg-5" v-show="$parent.checkSupportCompatibility( bridge_support )">
                            <div class="panel panel-default">
                                <div class="panel-body" lang="it" :class="{ 'bg-success': bridge_support.id == $parent.bridge_supportID }" @click="$parent.selectBridgeSupportHeight( bridge_support )" >{{bridge_support.id}} h:{{bridge_support.height}} mm</div>
                            </div>
                        </div>
                    </div>

                </div>  

                <div class="col-lg-5" v-show="$parent.bridge_orientation">   

                    <div class="row">
                       <span class="help-block">seleziona l’altezza del ponte da inserire</span>
                    </div> 

                    <h4 class="">Tipologie di ponte</h4>

                    <div v-if="$parent.bridge_orientation.length">

                        <div class="row" v-for="bridge in $parent.bridges_types">
                            <div class="col-lg-6" v-show="$parent.checkBridgeCompatibility( bridge )">
                                <div class="panel panel-default">
                                    <div class="panel-body"  lang="it" :class="{ 'bg-success': bridge.id == $parent.bridge_ID }" @click="$parent.selectBridgeType( bridge )">{{bridge.sku}} w:{{bridge.width}} mm d:{{bridge.depth}} mm</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>              

            </div>
        </div>

        <!-- PULSANTE DI INVIO -->
        <div class="row">
            <div class="col-lg-12" >
                <button class="btn btn-danger inpagenav" lang="it" @click.stop.prevent="$parent.check">Avanti</button>
            </div>
        </div>
        <!-- FINE PULSANTE DI INVIO -->
    </div>
    
</template>