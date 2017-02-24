<template>

    <div class="row" id="step2">

        <div class="col-lg-12">
            <h2 lang="it">Tipologia di cassetto</h2>
        </div>
        <!-- BLOCCO ALERTS -->
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
        <!-- FINE BLOCCO ALERTS -->
        <!--
        <div class="col-lg-3" v-for="type in $parent.types">
            <div class="panel panel-default " :class="{ 'bg-success': (type.id==$parent.selected) }">
                <div class="panel-body" @click="$parent.setType(type.id)" lang="it">{{type.description}}</div>
            </div>
        </div>
        -->

        <div class="col-lg-3" v-for="(type,category) in $parent.types">
            <div v-if="type.length==1">
                <div class="panel panel-default" :class="{ 'bg-success': (type[0].id==$parent.selected) }">
                    <div class="panel-body" @click="$parent.setType(type[0].id)" lang="it">{{type[0].description}}</div>
                </div>
            </div>
            <div v-if="type.length>1">
                <div class="panel panel-default">
                    <div class="panel-body" @click="$parent.openCategory(category)" lang="it">{{category}}</div>
                </div>
                <div class="drawerlist" :id="category" style="display: none">
                    <div class="col-lg-12" v-for="ctype in type">
                        <div class="panel panel-default " :class="{ 'bg-success': (ctype.id==$parent.selected) }">
                            <div class="panel-body" @click="$parent.setType(ctype.id)" lang="it">{{ctype.description}}</div>
                        </div>
                    </div>
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