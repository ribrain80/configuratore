<template>
    <ul class="languageselector">
        <li v-for="language in $parent.languages">
            <a v-bind:class="{ active: (language.code==$parent.activeLanguage) }" class="langlink" href="#_" @click="$parent.changeLanguage(language.code)"> {{ language.label }} </a>
        </li>
    </ul>
</template>