<template>
    <div class="profile-container" v-if="user">
        <div class="profile-card-container">
            <button class="controls-toggle" @click="toggleControls" v-if="isUser">v</button>
            <div class="profile-header">
                <h1>{{user.username}}</h1>
                <follow-button :user="user" @followed="followedUser"></follow-button>
            </div>
            <div class="profile-stats">
                <title-number title="Followers" :value="0"/>
                <title-number title="Stories" :value="user.stories.length"/>
                <title-number title="Likes" :value="likes"/>
            </div>
        </div>
        <user-controls v-if="isUser && controlsOpen"/>
        <div class="story-list" v-if="user !== undefined && user !== ''">
            <story v-for="story in user.stories" v-bind:key="story._id" :story="story"/>
        </div>
    </div>
</template>

<script>
import titleNumber from './atoms/titleNumber.vue';
import Story from './molecules/Story.vue';
import FollowButton from './atoms/FollowButton.vue';
import UserControls from './molecules/UserControls.vue';

export default {
    name:'profile',
    props: ['username'],
    data: function() {
        return {
            user: '',
            controlsOpen: false
        }
    },
    mounted: function() {
        this.getUserData()
    },
    computed: {
        likes: function() {
            if(this.user !== undefined) {
                console.log(this.user.stories)
                let likes = 0
                for(let story of this.user.stories) {
                    likes += story.likes;
                }
                return likes;
            }
            return -1;
        },
        isUser: function() {
            return this.$store.getters.userid === this.user._id;
        }
    },
    methods : {
        getUserData: function() {
            this.$emit('loading', true);
            this.$http.get(this.$api + 'username/' + this.username)
                .then( res => {
                    this.$emit('loading', false);
                    this.user = res.body;
                })
                .catch( err => {
                    console.log(err);
                })
        },
        followedUser: function(id) {
            this.user.followers.push({ username: this.$store.getters.user, userid: this.$store.getters.userid});
        },
        toggleControls: function() {
            this.controlsOpen = !this.controlsOpen;
        }
    },
    components: { titleNumber, Story, FollowButton, UserControls }
}
</script>

<style lang="scss" scoped>
@import '../styles/styles.scss';
.profile-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: scroll;
    box-sizing: border-box;

    @include desktop {
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
    }

    .profile-card-container {
        background-color: $white;
        width: 95%;
        margin-bottom: .5em;
        margin-top: .5em;

        @include desktop {
            width: 25%;
            margin-right: 2em;
            margin-top: 1em;
        }

        .controls-toggle {
            border: none;
            position: absolute;
            float: right;
            padding: 1em;
            background-color: $white;
            right: 1.5em;

            &:hover {
                cursor: pointer;
            }

            &:focus {
                outline: none;
            }
        }

        .profile-header{
            text-align: center;
            margin: 1.25em 0em 1em;

            h1 {
                margin-top: 0em;
                margin-bottom: .25em;
            }
        }

        .profile-stats {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            text-align: center;
            padding: 0em 1em;

            @include desktop {
                padding: 0em 3em;
            }
        }
    }
    .story-list {
        width: 95%;

        @include desktop {
            width: 35%;
            height: 100%;
            padding-right: 1.5em;
        }
    }
}
</style>