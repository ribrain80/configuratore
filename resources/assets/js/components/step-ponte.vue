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
                <div class="col-lg-4">
                    <h4 class="">Orientamento Ponti</h4>

                    <div class="row">
                        <div class="col-lg-6" v-show="!$parent.widthNotSuitable4Bridge">
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
                    
                    <div v-if="$parent.bridge_orientation.length">
                        <h4 class="">Tipologie Ponti</h4>

                        <div class="row" v-for="bridge in $parent.bridges_types">
                            <div class="col-lg-12">
                                <div class="panel panel-default" :class="{ 'bg-success': ('H'==$parent.bridge_orientation)}">
                                    <div class="panel-body"  lang="it" @click="$parent.selectBridgeType( bridge )">{{bridge.sku}} w:{{bridge.width}} mm d:{{bridge.depth}} mm</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="col-lg-8">
                    <h4 class="">Ponti Selezionati</h4>
                </div>
            </div>
        </div>

        <!-- PULSANTE DI INVIO -->
        <div class="col-lg-12" >
            <button class="btn btn-danger inpagenav" lang="it" @click.stop.prevent="$parent.check">Avanti</button>
        </div>
        <!-- FINE PULSANTE DI INVIO -->
    </div>
    
</template>