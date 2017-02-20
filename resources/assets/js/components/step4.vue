<template>
    <div class="row" id="step4">
        <div class="col-lg-12">
            <h2 lang="it">Selezione inserti</h2>
        </div>
        <div class="col-lg-3" v-for="divider in $parent.dividers">
            <div class="checkbox">
                <label><input type="checkbox" value="" :id="divider.id" @click="$parent.pushDivider( $event )">({{divider.width}} x {{divider.length}} x {{divider.depth}})</label>
            </div>

        </div>

        <div class="col-lg-12" >
            <a href="#step5" class="btn btn-danger" lang="it">Avanti</a>
        </div>
    </div>
</template>