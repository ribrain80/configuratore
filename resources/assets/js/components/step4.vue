<template>
    <div class="row" id="step4">
        <div class="col-lg-12">
            <h2 lang="it">Selezione inserti</h2>
        </div>
        <div class="col-lg-12">

        <!--    <div id="container">
              <div id="box1" class="box">box1</div>
              <div id="box2" class="box">box2</div>
              <div id="box3" class="box">box3</div>
            </div>

            -->

        </div>
        <div class="col-lg-12" id="elementmenu">
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
            <button class="btn btn-danger inpagenav" lang="it" @click.stop.prevent="$parent.check">Avanti</a>
        </div>
    </div>
</template>
