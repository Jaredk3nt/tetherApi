<template>
    <div class="card-container">
        <div class="story-container" @click="goToStory">
            <div class="author"><p @click.stop="authorProfile">{{story.author ? story.author : ' '}}</p></div>
            <p>{{story.body ? story.body : ' '}}</p>
        </div>
        <div class="story-actions">
            <div class="action fav" :class="{ liked: liked }" @click="likeStory">
                <icon :className="heartColor" width="15" height="15" glyph="heart"></icon>
                <p>{{story.likes}}</p>
            </div>
            <div class="action tether" @click="spawnChild">
                <icon width="15" height="15" glyph="link-intact"></icon>
                <p>{{story.children.length}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from '../atoms/Icon.vue';
import Heart from '../../assets/heart.svg';
import Link from '../../assets/link-intact.svg';

export default {
    name:'story',
    props: [ 'story' ],
    components: { Icon },
    computed: {
        liked: function() {
            if(this.story !== undefined) {
                let index = this.story.likeUsers.indexOf(this.$store.getters.userid);
                if(index > -1) {
                    return true;
                }
                return false;
            }
        },
        heartColor: function() {
            if(this.liked) {
                return "red";
            }else {
                return "light-grey";
            }
            
        }
    },
    mounted: function() { 
    },
    methods: {
        goToStory: function() {
            this.$router.push({ name: 'Story', params: { user: this.story.author, story_id: this.story._id, story: this.story}})
        },
        spawnChild: function() {
            this.$store.commit('start_writing', this.story._id)
        },
        likeStory: function() {
            this.$http.post(this.$api + 'like/' + this.story._id)
                .then( res => {
                    if (this.liked === true) {
                        let i = this.story.likeUsers.indexOf(this.$store.getters.userid)
                        if (i > -1) {
                            this.story.likeUsers.splice(i, 1)
                        }
                    } else {
                        this.story.likeUsers.push(this.$store.getters.userid);
                    }
                    this.story.likes = res.body.likes
                })
                .catch( err => {
                    console.log(err);
                })
        },
        authorProfile: function() {
            this.$router.push({name: 'Profile', params: { username: this.story.author }})
        }
    }
}
</script>

<style lang="scss" scoped> 
@import '../../styles/styles.scss';

$card-margin: 1em;
$card-side-padding: 1em;
$card-side-padding-desktop: 2em;

.card-container {
    margin: $card-margin 0em;
}
.story-container {
    background: $white;
    padding: 1em $card-side-padding .5em;
    width: 100%;
    box-sizing: border-box;

    &:hover {
        cursor: pointer;
    }

    @include desktop {
        padding: 1.5em $card-side-padding-desktop 1em;
    }

    .author {

        @include desktop {
            &:hover {
                cursor: pointer;
            }
        }

        p {
            display: inline;
            font-size: .85rem;
            color: $light-font;
            font-weight: 600;
            font-family: $sans-serif;

            &:hover {
                text-decoration: underline;
            }
        }
    }
    

    p {
        font-size: $story-text-size;
        color: $story-text-color;
        font-family: $serif;
        font-weight: 500;
        margin: .4em 0em;
        padding: .5em .5em .5em 0em;

        @include desktop {
            font-size: $story-text-size-desktop;
            padding: 0em;
        }
    }
}

.story-actions {
    width: 100%;
    padding: .75em $card-side-padding;
    display: grid;
    grid-template-columns: 3fr 1fr 1fr;
    border-top: 1px solid $accent-grey;
    box-sizing: border-box;
    background: $white;

    @include desktop {
        padding: .5em $card-side-padding-desktop;
        grid-template-columns: 6fr 1fr 1fr;
    }

    .action {
        display: flex;
        flex-direction: row;
        align-items: center;

        &:hover {
            cursor: pointer;
        }

        p {
            margin: 0px 15px 0px 15px;
            font-weight: 500;
            font-size: .85em;

            @include desktop {
                font-size: .9em;
            }
        }
    }

    .fav {
        grid-column-start: 2;

        &.liked {
            color: red;
        }
    }

    .tether {
        grid-column-start: 3;
    }

    .heart.icon {
        color: #000;
        position: relative;
        margin-top: 6px;
        margin-left: 5px;
        width: 9px;
        height: 9px;
        border-left: solid 1px currentColor;
        border-bottom: solid 1px currentColor;
        -webkit-transform: rotate(-45deg);
                transform: rotate(-45deg);
    }
    .heart.icon:before {
        content: '';
        position: absolute;
        top: -5px;
        left: -1px;
        width: 8px;
        height: 5px;
        border-radius: 5px 5px 0 0;
        border-top: solid 1px currentColor;
        border-left: solid 1px currentColor;
        border-right: solid 1px currentColor;
    }
    .heart.icon:after {
        content: '';
        position: absolute;
        top: 0px;
        left: 8px;
        width: 5px;
        height: 8px;
        border-radius: 0 5px 5px 0;
        border-top: solid 1px currentColor;
        border-right: solid 1px currentColor;
        border-bottom: solid 1px currentColor;
    }

    .link.icon {
        color: #000;
        position: relative;
        margin-left: 8px;
        margin-top: 10px;
        width: 7px;
        height: 1px;
        background-color: currentColor;
        -webkit-transform: rotate(-45deg);
                transform: rotate(-45deg);
    }
    .link.icon:before {
        content: '';
        position: absolute;
        top: -3px;
        left: -7px;
        width: 8px;
        height: 5px;
        border-radius: 2px;
        border: solid 1px currentColor;
    }
    .link.icon:after {
        content: '';
        position: absolute;
        top: -3px;
        right: -7px;
        width: 8px;
        height: 5px;
        border-radius: 2px;
        border: solid 1px currentColor;
    }
}

</style>