<template>
    <div class="row" id="step4">
        <div class="col-lg-12">
            <h2 lang="it">Selezione inserti</h2>
        </div>
        <div class="col-lg-3" v-for="divider in $parent.dividers">
            <div class="checkbox">
                <label><input type="checkbox" value="" @click="$parent.pushDivider(divider.id)">({{divider.width}} x {{divider.height}} x {{divider.lenght}})</label>
            </div>

        </div>
    </div>
</template>