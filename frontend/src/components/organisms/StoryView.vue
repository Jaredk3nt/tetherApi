<template>
    <div class="outer-container">
        <div class="inner-container">
            <div class="task-bar">
                <toolbar @parent="viewParent" :hasParent="hasParent"/>
            </div>
            <div class="story-card-container">
                <story :story="storyObj"/>
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
    props: ['username', 'story_id'],
    components: {Story, Toolbar},
    data: function() {
        return {
            story: undefined,
            children: []
        }
    },
    computed: {
        hasParent: function() {
            if (this.story !== undefined) {
                return this.story.parent.length > 0;
            }
            return false;
        },
        storyObj: function() {
            if (this.story !== undefined) {
                return this.story;
            }
            return {};
        }
    },
    mounted: function() {
        this.getStory(this.story_id, (res) => {
            this.story = res.body
        });
        this.getChildren(this.story_id);
    },
    beforeRouteUpdate (to, from, next) {
        console.log('update');
        this.children = [];
        this.getStory(to.params.story_id, (res) => {
            this.story = res.body;
            this.getChildren(to.params.story_id);
            next();
        });
        this.getChildren(to.params.story_id);
        next();
    },
    methods: {
        getStory: function(id, callback) {
            this.$http.get( this.$api + 'story/' + id).then( response => {
                callback(response);
            }, error => {
                console.log(error);
            });
        },
        getChildren: function(id) {
            this.$http.get( this.$api + 'children/' + id).then( response => {
                this.children = response.body;
            }, error => {
                console.log(error);
            });
        },
        viewParent: function() {
            if( this.story !== undefined ) {
                if (this.story.parent.length > 0) {
                    this.getStory(this.story.parent, (res) => {
                        this.$router.push({ name: 'Story', params: { story_id: this.story.parent, story: res.body, user: res.body.author }})
                    });
                }
            }
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
                width: 48%;
            }
        }
    }
}
</style>