<template>
    <div class="row" id="step4">
        <div class="col-lg-12">
            <h2 lang="it">Selezione inserti</h2>
        </div>
        <div class="col-lg-12" style="min-height: 300px">
            AREA RISERVATA AL 2D
        </div>
        <!--
        <div class="col-lg-3" v-for="divider in $parent.dividers">
            <div class="checkbox">
                <label><input type="checkbox" value="" :id="divider.id" @click="$parent.pushDivider( $event )">({{divider.width}} x {{divider.length}} x {{divider.depth}})</label>
            </div>
        </div>
        -->
        <div class="col-lg-12">
            <ul class="nav nav-tabs">
                <li  :class="{active: !index}" v-for="(cat,index) in $parent.dividers.dividersCategories">
                    <a data-toggle="tab" :href="$parent.genHref(cat)"> Elem h-{{cat}}</a>
                </li>
            </ul>
            <div class="tab-content">
                <div id="elem445" class="tab-pane fade in active">
                    <div class="col-lg-3" v-for="divider in $parent.dividers.dividers">
                        <div class="checkbox">
                            <label><input type="checkbox" value="" :id="divider.id" @click="$parent.pushDivider( $event )">({{divider.width}} x {{divider.length}} x {{divider.depth}})</label>
                        </div>
                    </div>
                </div>

                <div id="elem705" class="tab-pane fade in ">
                    <div class="col-lg-3" v-for="divider in $parent.dividers">
                        <div class="checkbox">
                            <label><input type="checkbox" value="" :id="divider.id" @click="$parent.pushDivider( $event )">({{divider.width}} x {{divider.length}} x {{divider.depth}})</label>
                        </div>
                    </div>
                </div>

            </div>
        </div>



        <div class="col-lg-12" >
            <a href="#step5" class="btn btn-danger inpagenav" lang="it">Avanti</a>
        </div>
    </div>
</template>