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


        <!-- PULSANTE DI INVIO -->
        <div class="col-lg-12" >
            <button class="btn btn-danger inpagenav" lang="it" @click.stop.prevent="$parent.check">Avanti</button>
        </div>
        <!-- FINE PULSANTE DI INVIO -->
    </div>
    
</template>