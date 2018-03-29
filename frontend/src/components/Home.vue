<template>
<div class="">
    <router-view/>
    <div class="homepage">
        <div class="story-list">
            <story v-for="story in stories" v-bind:key="story._id" :story="story"/>
        </div>
    </div>
</div>
</template>

<script>
import Story from '@/components/molecules/Story.vue';
import NavBar from '@/components/organisms/NavBar.vue';

export default {
    name: 'Home',
    data () {
        return {
            stories: []
        }
    },
    methods: {
        fetchStories: function() {
            this.$http.get( this.$api + 'stories')
                .then( response => {
                    this.stories = response.body;
                }, error => {
                    //error
                    console.log("on no error");
                });
        }
    },
    mounted() {
        this.fetchStories();
    },
    components: {Story, NavBar}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/styles.scss';
.homepage {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;

        .story-list {
            box-sizing: border-box;
            width: $mobile-card-width;

            @include desktop {
                width: $desktop-card-width;
            }
            
        }
    }
</style>
