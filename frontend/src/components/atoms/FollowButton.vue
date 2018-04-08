<template>
    <div v-if="!isUser">
        <button class="follow-button" @click="followUser" v-if="!followed">Follow</button>
        <button class="follow-button followed" v-else>Following</button>
    </div>
</template>

<script>
export default {
    name:'follow-button',
    props: ['user'],
    computed: {
        isUser: function() {
            return this.$store.getters.userid === this.user._id;
        }, 
        followed: function() {
            for (let f of this.user.followers) {
                if (f.userid === this.$store.getters.userid) {
                    return true;
                }
            }
            return false;
        }
    },
    methods: {
        followUser: function() {
            this.$http.post( this.$api + 'follow/' + this.user._id )
                .then( response => {
                    this.$emit('followed');
                    //this.followed = true;
                })
                .catch( err => {

                });
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../styles/styles.scss';

.follow-button {
    border: 2px solid $accent-green;
    background-color: $white;
    color: $accent-green;
    padding: .5em 3em;
    border-radius: 25px;

    &:hover {
        cursor: pointer;
        background-color: $background;
        color: $white;
    }

    &.followed {
        background-color: $accent-green;
        color: $white;
    }
}
</style>