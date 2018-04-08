<template>
    <div>
        <router-view/>
        <div class="homepage">
            <div class="story-list">
                <story v-for="story in stories" v-bind:key="story._id" :story="story"/>
                <div class="load-button-wrapper" v-if="showButton"><button class="load-button" @click="nextPage" >Load More</button></div>
            </div>
        </div>
    </div>
</template>

<script>
import Story from '@/components/molecules/Story.vue';

export default {
    name: 'Home',
    data () {
        return {
            stories: [],
            currentPage: 0
        }
    },
    methods: {
        fetchStories: function() {
            this.$emit('loading', true)
            this.$http.get( this.$api + 'stories', {params: {page: this.currentPage}})
                .then( response => {
                    this.$emit('loading', false)
                    this.stories = this.stories.concat(response.body);
                }, error => {
                    console.log("on no error");
                });
        },
        nextPage: function() {
            this.currentPage++;
            this.fetchStories();
        }
    },
    computed: {
        showButton: function(){
            if (this.stories.length > 50) {
                return true;
            }
            return false;
        }
    },
    mounted() {
        this.fetchStories();
    },
    components: {Story}
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
            
            .load-button-wrapper {
                width: 100%;
                text-align: center;

                .load-button {
                    background-color: $white;
                    color: $accent-green;
                    border: none;
                    padding: 1em 2em;
                    font-weight: 700;
                    margin: 2em 0em 4em;
                }
            }
        }
    }
</style>
