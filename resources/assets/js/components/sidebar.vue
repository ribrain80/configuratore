<template>
    <div class="col-md-1 col-lg-2 sidebar">
        <div class="row">
            <div class="col-xs-12 logo orange sidebar-elem logo">
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 nuovaconf sidebar-elem">
                nuova
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 sidebar-elem navigator">
                <ul class="nav hidden-xs router-links" id="nav">
                    <li><router-link to="/split/step1" class="gino">1</router-link></li>
                    <li><router-link to="/split/step2">2</router-link></li>
                    <li><router-link to="/split/step3">3</router-link></li>
                    <li><router-link to="/split/stepponte">B</router-link></li>
                    <li><router-link to="/split/step4">4</router-link></li>
                    <li><router-link to="/split/step5">5</router-link></li>
                </ul>
            </div>
        </div>
    </div>
</template>