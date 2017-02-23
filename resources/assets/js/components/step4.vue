<template>
    <div class="row" id="step4">
        <div class="col-lg-12">
            <h2 lang="it">Selezione inserti</h2>
        </div>
        <div class="col-lg-12" style="min-height: 300px">
            AREA RISERVATA AL 2D
        </div>
        <div class="col-lg-12">
            <ul class="nav nav-tabs">
                <li  :class="{active: !index}" v-for="(cat,index) in $parent.dividers.dividersCategories">
                    <a data-toggle="tab" :href="$parent.genHref(cat)"> Elem h-{{cat}}</a>
                </li>
            </ul>
            <div class="tab-content">
                <div :class="{active: !index}" :id="'elem'+cat" class="tab-pane fade in" v-for="(cat,index) in $parent.dividers.dividersCategories">
                    <div class="checkbox" v-for="divider in $parent.getDividerByCat(cat)">
                        <label><input type="checkbox" value="" :id="divider.id" @click="$parent.pushDivider( $event )">({{divider.width}} x {{divider.length}})</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-12" >
            <a href="#step5" class="btn btn-danger inpagenav" lang="it">Avanti</a>
        </div>
    </div>
</template>
