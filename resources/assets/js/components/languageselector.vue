<template>
    <ul class="nav navbar-nav navbar-right">
        <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
               aria-expanded="false">{{ $parent.activeLanguage }} <span class="caret"></span></a>

            <ul class="dropdown-menu">
                <li v-for="language in $parent.languages">
                    <a :class="{ active: (language.code==$parent.activeLanguage) }" class="langlink" href="#_"
                       @click="$parent.changeLanguage(language.code)"> {{ language.label }} </a>
                </li>
            </ul>
        </li>
    </ul>
</template>


