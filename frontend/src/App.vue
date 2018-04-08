<template>
    <div id="app" :class="{'nav-hidden': !showNav}">
        <post v-if="postOpen" :parent="parent"/>
        <div class="page-body">
            <loader v-if="loading"></loader>
            <keep-alive include="Home, story-view">
                <router-view @loading="loaderState"/>
            </keep-alive>
        </div>
        <nav-bar v-if="showNav"/>
    </div>
</template>

<script>
import NavBar from '@/components/organisms/NavBar.vue';
import Post from '@/components/organisms/Post.vue';
import Loader from '@/components/atoms/Loader.vue';

export default {
    name: 'App',
    components: { NavBar, Post, Loader },
    data: function() {
        return {
            loading: false
        }
    },
    computed: {
        postOpen: function() {
            return this.$store.getters.writing;
        },
        parent: function() {
            return this.$store.getters.currentParent;
        },
        showNav: function() {
            if(this.$route.path === '/login') {
                return false;
            }
            return true;
        }
    },
    mounted: function() {
        console.log(process.env.NODE_ENV);
        this.$store.dispatch('checkLogin');
    },
    methods: {
        loaderState: function(state) {
            console.log("Loading: " + state);
            this.loading = state;
        }
    }
}
</script>

<style lang="scss">
@import './styles/styles.scss';

body {
    height: 100%;
    width: 100%;
}

#app {
    font-family: $sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100vh;
    box-sizing: border-box;
    display: grid;
    grid-template-rows: 1fr $nav-height; 
    box-sizing: border-box;

    &.nav-hidden {
        grid-template-rows: 1fr;
    }

    @include desktop {
        grid-template-rows: $nav-height-desktop 1fr;

        &.nav-hidden {
            .page-body {
                grid-row-start: 1;
            }
        }
    }

    .page-body {
        grid-row-start: 1;
        overflow: scroll;

        @include desktop {
            grid-row-start: 2;
        }
    }
}
</style>
