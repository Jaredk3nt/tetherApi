<template>
    <div id="app">
        <post v-if="postOpen" :parent="parent"/>
        <div class="page-body">
            <keep-alive include="Home, story-view">
                <router-view/>
            </keep-alive>
        </div>
        <nav-bar/>
    </div>
</template>

<script>
import NavBar from '@/components/organisms/NavBar.vue';
import Post from '@/components/organisms/Post.vue';

export default {
    name: 'App',
    components: { NavBar, Post },
    computed: {
        postOpen: function() {
            return this.$store.getters.writing;
        },
        parent: function() {
            return this.$store.getters.currentParent;
        }
    },
    mounted: function() {
        console.log(process.env.NODE_ENV);
        this.$store.dispatch('checkLogin');
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

    @include desktop {
        grid-template-rows: $nav-height-desktop 1fr;
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
