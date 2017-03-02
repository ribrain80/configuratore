<template>

    <div class="row" id="step-ponte">

        <div class="col-lg-12">
            <h2 lang="it">Scelta del ponte</h2>
        </div>
        <!-- BLOCCO ALERTS -->
        <div class="col-lg-12" v-if="$parent.choice">
            <div class="alert alert-warning alert-dismissible fade in"  lang="it">
                <button type="button" class="close" aria-label="Close" data-dismiss="alert"><span aria-hidden="true">×</span></button> <strong lang="it">Attenzione!</strong> è obbligatorio ....
            </div>
        </div>

        <div class="col-lg-12">
            <div class="row">
                <div class="col-lg-4">
                    <h4 class="">Orientamento Ponti</h4>

                    <div class="form-group" style="display: none">
                        <select v-model="$parent.bridge_orientation">
                            <option lang="it"  value="H" >Orizzontale</option>
                            <option lang="it" value="V">Veriticale</option>
                        </select>
                    </div>

                    <div class="row">
                        <div class="col-lg-6">
                            <div class="panel panel-default" >
                                <div class="panel-body"  lang="it">Orizzontale</div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="panel panel-default" >
                                <div class="panel-body"  lang="it">Verticale</div>
                            </div>
                        </div>
                    </div>

                    <h4 class="">Tipologie Ponti</h4>
                    <div class="row" v-for="bridge in $parent.bridges">
                        <div class="panel panel-default" >
                            <div class="panel-body"  lang="it">{{bridge.sku}} w:{{bridge.width}} mm d:{{bridge.depth}} mm</div>
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