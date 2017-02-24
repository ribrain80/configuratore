<template>

    <div class="row" id="step2">

        <div class="col-lg-12">
            <h2 lang="it">Tipologia di cassetto</h2>
        </div>

        <div class="col-lg-12" v-if="$parent.choice">
            <div class="alert alert-warning alert-dismissible fade in"  lang="it">
                <button type="button" class="close" aria-label="Close" data-dismiss="alert"><span aria-hidden="true">×</span></button> <strong lang="it">Attenzione!</strong> è obbligatorio selezionare una tipologia di cassetto
            </div>
        </div>

        <div class="col-lg-12" v-if="$parent.hasError">
            <div class="alert alert-warning alert-dismissible fade in"  lang="it">
                <button type="button" class="close" aria-label="Close" data-dismiss="alert"><span aria-hidden="true">×</span></button> <strong lang="it">Attenzione!</strong> impossibile caricare le tipologie, si prega di riprovare più tardi
            </div>
        </div>        

        <div class="col-lg-3" v-for="type in $parent.types">
            <div class="panel panel-default " v-bind:class="{ 'bg-success': (type.id==$parent.selected) }">
                <div class="panel-body" @click="$parent.setType(type.id)" lang="it">{{type.description}}</div>
            </div>
        </div>

        <div class="col-lg-12" >
            <button class="btn btn-danger inpagenav" lang="it" @click.stop.prevent="$parent.check">Avanti</button>
        </div>
    </div>
    
</template>