<template>
    <div id="step4">
        <div class="row">
            <div class="col-lg-12">
                <h2 lang="it">Selezione inserti</h2>
            </div>
        </div>
        <div class="row">
            <div id="container">
              <div id="box1" class="box">box1</div>
              <div id="box2" class="box">box2</div>
              <div id="box3" class="box">box3</div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-3" v-for="divider in $parent.dividers">
                <div class="checkbox">
                    <label><input type="checkbox" value="" :id="divider.id" @click="$parent.pushDivider( $event )">({{divider.width}} x {{divider.length}} x {{divider.depth}})</label>
                </div>

            </div>

            <div class="col-lg-12" >
                <a href="#step5" class="btn btn-danger inpagenav" lang="it">Avanti</a>
            </div>
        </div>
    </div>
</template>