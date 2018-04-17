<template>
    <div class="profile-container" v-if="user">
        <div class="profile-card-container">
            <div class="profile-info-container">
                <div class="profile-img">
                    <div class="img"></div>
                </div><div class="profile-header">
                    <h1>{{user.username}}</h1>
                    <div class="follower-num">
                        <div class="title-num-wrapper">
                            <title-number title="Following" :value="102"/>
                        </div><div class="title-num-wrapper">
                            <title-number title="Followers" :value="98"/>
                        </div>
                    </div>
                    
                    <follow-button :user="user" @followed="followedUser"></follow-button>
                    <div class="user-buttons" v-if="isUser">
                        <div class="edit"><t-button clickAction="toggle-edit" text="Edit profile" @toggle-edit="toggleEdit"></t-button></div><div class="settings"><t-button clickAction="toggle-settings" text="V" @toggle-settings="toggleSettings"></t-button></div>
                    </div>
                    
                </div>
            </div>
            <user-controls v-if="isUser && settingsOpen"/> 
        </div>       

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
import TButton from './atoms/TButton.vue';

export default {
    name:'profile',
    props: ['username'],
    components: { titleNumber, Story, FollowButton, UserControls, TButton },
    data: function() {
        return {
            user: '',
            settingsOpen: false
        }
    },
    beforeRouteUpdate: function(to, from, next) {
        this.username = to.params.username;
        this.user = '';
        this.getUserData();
        next();
    },
    mounted: function() {
        this.getUserData();
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
        toggleSettings: function(toggle) {
            this.settingsOpen = !this.settingsOpen;
            console.log(toggle);
        },
        toggleEdit: function() {
            console.log(this.settingsOpen);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../styles/styles.scss';

* {
    box-sizing: border-box;
}
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
        width: 100%;
        box-sizing: border-box;
        margin-bottom: .5em;

        @include desktop {
            width: 20%;
            margin-right: 1em;
            margin-top: 1em;
        }

        .profile-info-container {
            width: 100%;
            padding: 1em 3em 1.5em;

            @include desktop {
                padding: 1.5em 3em 2em;
            }

            .profile-img {
                display: inline-block;
                width: 0%;
                height: 100%;
                box-sizing: border-box;
                justify-content: center;
                align-items: center;

                .img {
                    border-radius: 50%;
                    background-color: $light-grey;
                }

                @include desktop {
                    display: block;
                    width: 100%;
                }
            }

            .profile-header{
                width: 100%;
                display: inline-block;
                box-sizing: border-box;
                vertical-align: top;
                text-align: center;

                @include desktop {
                    display: block;
                    width: 100%;
                }

                h1 {
                    margin-top: 0em;
                    margin-bottom: 0em;
                    color: #1f1f1f;
                    font-size: 2.25rem;

                    @include tinyphone {
                        font-size: 2rem;
                    }
                }

                .follower-num {
                    margin-bottom: .5em;
                    width: 100%;

                    .title-num-wrapper {
                        display: inline-flex;
                        width: 50%;
                        justify-content: center;
                    }
                }

                .user-buttons {
                    width: 100%;
                    box-sizing: border-box;
                    display: grid;
                    grid-template-columns: 1fr 3em;
                    grid-column-gap: .5em;
                    .edit {
                        box-sizing: border-box;
                    }
                    .settings {
                        box-sizing: border-box;
                    }
                }
            }
        }

        
    }
    .story-list {
        width: 95%;

        @include desktop {
            width: 40%;
            height: 100%;
            padding-right: 1.5em;
        }
    }
}
</style>