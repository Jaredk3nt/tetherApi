<template>
    <div class="outer-container">
        <div class="inner-container">
            <div class="task-bar">
                <toolbar/>
            </div>
            <div class="story-card-container">
                <keep-alive>
                    <story :story="this.story"/>
                </keep-alive>
            </div>
            <div class="children-container">
                <story v-for="child in children" v-bind:key="child._id" :story="child"/>
            </div>
        </div>
    </div>
</template>

<script>
import Story from '../molecules/Story.vue';
import Toolbar from '../atoms/Toolbar.vue';

export default {
    name:'story-view',
    props: ['username', 'story_id', 'story'],
    components: {Story, Toolbar},
    data: function() {
        return {
            children: []
        }
    },
    mounted: function() {
        if(this.story === undefined) {
            this.getStory(this.story_id);
        }
        this.getChildren(this.story_id);
    },
    beforeRouteUpdate (to, from, next) {
        this.children = [];
        // if(to.params.story === undefined) {
        //     this.getStory(to.params.story_id);
        // }
        //this.children = this.story.children.map( x => {})
        this.getChildren(to.params.story_id);
        next();
    },
    methods: {
        getStory: function(id) {
            this.$http.get( this.$api + 'story/' + id).then( response => {
                //this.story = response.body
            }, error => {
                //error
                console.log(error);
            });
        },
        getChildren: function(id) {
            this.$http.get( this.$api + 'children/' + id).then( response => {
                this.children = response.body;
            }, error => {
                //error
                console.log(error);
            });
        }
    }

}
</script>

<style lang="scss">
@import '../../styles/styles.scss';

.outer-container {
    height: 100%;
    width: 100%;

    .inner-container {
        height: 100%;
        width: 100%;
        background: $background;
        display: flex;
        flex-direction: column;
        align-items: center;

        @include desktop {
            margin-top: 1em;
        }

        .task-bar {
            height: 2em;
            width: 100%;
            background-color: $accent-grey;

            @include desktop {
                width: 50%;
            }
        }
        .story-card-container {
            width: 100%;

            @include desktop {
                width: 50%;
            }
            .card-container {
                margin: 0em;
            }
            // width: $mobile-card-width;
            // @include desktop {
            //     width: $desktop-card-width;
            // }
        }
        .children-container {
            width: $mobile-card-width;
            @include desktop {
                width: $desktop-card-width;
            }
        }
    }
}
</style>