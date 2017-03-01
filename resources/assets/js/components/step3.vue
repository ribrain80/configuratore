<template>
    <div class="row" id="step3">
        <div class="col-lg-12">
            <h2 lang="it">Dimensioni cassetto</h2>
        </div>
        <div class="col-lg-12">
            <div class="alert alert-warning alert-dismissible fade in"  lang="it">
                <!--<button type="button" class="close" aria-label="Close" data-dismiss="alert"><span aria-hidden="true">×</span></button> --><strong lang="it">Attenzione!</strong> tutti i campi sono obbligatori ed espressi in millimetri, la larghezza deve essere compresa tra {{ $parent.config.rect_width_lower_limit}} e {{ $parent.config.rect_width_upper_limit}}, la lunghezza tra {{ $parent.config.rect_height_lower_limit }} e {{ $parent.config.rect_height_upper_limit }}, l'altezza sponda tra {{ $parent.config.shoulder_height_lower_limit }} e {{ $parent.config.shoulder_height_upper_limit }}. <br /> Larghezze superiori a {{ $parent.config.maxSuitableWidth4Bridge }} impediranno il posizionamento dell'elemento ponte orizzontale.
            </div>
        </div>
        <div class="col-lg-12" v-if="$parent.showAlert">
            <div class="alert alert-danger alert-dismissible fade in" id="alert" lang="it">
                <button type="button" class="close" aria-label="Close" data-dismiss="alert"><span aria-hidden="true">×</span></button> <strong>Attenzione!</strong> {{ $parent.alert_message }}
            </div>
        </div>
        <div class="col-lg-4">

            <div class="form-horizontal">
              <div class="form-group">
                <label for="inputEmail3" class="col-sm-7 control-label" lang="it">Larghezza interna cassetto</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control" id="length" aria-describedby="basic-addon1" v-model="$parent.width" @keyup="$parent.updateDrawer" autocomplete="off" v-bind:class="{ 'has_error': $parent.widthOOR, 'ok': !$parent.widthOOR }">
                  <span id="helpBlock" class="help-block" v-bind:class="{ 'has_error': $parent.widthOOR, 'ok': !$parent.widthOOR }">min {{ $parent.config.rect_width_lower_limit}} max {{ $parent.config.rect_width_upper_limit}}</span>
                </div>
              </div>
              <div class="form-group">
                <label for="inputPassword3" class="col-sm-7 control-label" lang="it">Profondità interna cassetto</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control" id="width" aria-describedby="basic-addon2" v-model="$parent.length" @keyup="$parent.updateDrawer" autocomplete="off" v-bind:class="{ 'has_error': $parent.lengthOOR, 'ok': !$parent.lengthOOR }">
                  <span id="helpBlock" class="help-block" v-bind:class="{ 'has_error': $parent.lengthOOR, 'ok': !$parent.lengthOOR }">min {{ $parent.config.rect_height_lower_limit }}  max {{ $parent.config.rect_height_upper_limit }}</span>
                </div>
              </div>

              <div class="form-group" v-if="$parent.lineabox === false">
                <label for="inputPassword3" class="col-sm-7 control-label" lang="it">Altezza interna sponda</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control" id="depth" aria-describedby="basic-addon3" v-model="$parent.depth" @keyup="$parent.updateDrawer" autocomplete="off"  v-bind:class="{ 'has_error': $parent.depthOOR, 'ok': !$parent.depthOOR }">
                  <span id="helpBlock" class="help-block" v-bind:class="{ 'has_error': $parent.depthOOR, 'ok': !$parent.depthOOR }">min {{ $parent.config.shoulder_height_lower_limit }} max {{ $parent.config.shoulder_height_upper_limit }}</span>
                </div>
              </div>

              <div class="form-group" v-else>
                <label for="inputPassword3" class="col-sm-7 control-label" lang="it">Altezza interna sponda</label>
                <div class="col-sm-5" id="depth">
                    <select v-model="$parent.depth" @change="$parent.updateDrawer" v-bind:class="{ 'has_error': $parent.depthOOR, 'ok': !$parent.depthOOR }">
                        <option v-for="option in $parent.config.lineabox_shoulders_height" v-bind:value="option.value">{{option.text}}</option>
                    </select>
                    <span id="helpBlock" class="help-block" v-bind:class="{ 'has_error': $parent.depthOOR, 'ok': !$parent.depthOOR }">Per il cassetto lineabox sono disponibili 3 altezze predefinite per la sponda</span>
                </div>
              </div>


            </div>

        </div>


        <div class="col-lg-7" >
            <div class="col-lg-12" id="animation"></div>
        </div>
        <div class="col-lg-12" >
            <button class="btn btn-danger inpagenav" lang="it" @click.stop.prevent="$parent.check">Avanti</a>
        </div>
    </div>
</template>