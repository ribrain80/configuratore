<template>
    <div class="row" id="step3">
        <div class="col-lg-12">
            <h2 lang="it">Dimensioni cassetto</h2>
        </div>
        <div class="col-lg-12">
            <div class="alert alert-warning alert-dismissible fade in"  lang="it">
                <button type="button" class="close" aria-label="Close" data-dismiss="alert"><span aria-hidden="true">×</span></button> <strong lang="it">Attenzione!</strong> tutti i campi sono obbligatori ed espressi in millimetri, la larghezza deve essere compresa tra {{ $parent.config.rect_width_lower_limit}} e {{ $parent.config.rect_width_upper_limit}}, la lunghezza tra {{ $parent.config.rect_height_lower_limit }} e {{ $parent.config.rect_height_upper_limit }}, l'altezza sponda tra {{ $parent.config.shoulder_height_lower_limit }} e {{ $parent.config.shoulder_height_upper_limit }}
            </div>
        </div>
        <div class="col-lg-12" v-if="$parent.showAlert">
            <div class="alert alert-danger alert-dismissible fade in" id="alert" lang="it">
                <button type="button" class="close" aria-label="Close" data-dismiss="alert"><span aria-hidden="true">×</span></button> <strong>Attenzione!</strong> {{ $parent.alert_message }}
            </div>
        </div>
        <div class="col-lg-4">
            <div class="input-group input-group-md col-lg-12" v-bind:class="{ '$parent.has-error': $parent.widthOOR }">
                <span class="input-group-addon" id="basic-addon1" lang="it">Larghezza interna cassetto</span>
                <input type="text" class="form-control" id="length" aria-describedby="basic-addon1" v-model="$parent.width" @keyup="$parent.updateDrawer" autocomplete="off">
            </div>
            <div class="input-group input-group-md col-lg-12" v-bind:class="{ '$parent.has-error': $parent.lengthOOR }">
                <span class="input-group-addon" id="basic-addon2" lang="it">Profondità interna cassetto</span>
                <input type="text" class="form-control" id="width" aria-describedby="basic-addon2" v-model="$parent.length" @keyup="$parent.updateDrawer" autocomplete="off">
            </div>
            <div class="input-group input-group-md col-lg-12" v-bind:class="{ '$parent.has-error': $parent.depthOOR }">
                <span class="input-group-addon" id="basic-addon3" lang="it">Altezza interna sponda</span>
                <input type="text" class="form-control" id="depth" aria-describedby="basic-addon3" v-model="$parent.depth" @keyup="$parent.updateDrawer" autocomplete="off">
            </div>
        </div>
        <div class="col-lg-7" >
            <div class="col-lg-12" id="animation"></div>
        </div>
        <div class="col-lg-12" >
            <a href="#step4" class="btn btn-danger inpagenav" lang="it">Avanti</a>
        </div>
    </div>
</template>