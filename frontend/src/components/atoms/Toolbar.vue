<template>
    <div class="container">
        <div class="back-button" @click="back">Back</div>
        <div class="parent-button" @click="goToParent" v-if="hasParent">View Parent</div>
        <div class="right-holder"></div>
    </div>
</template>

<script>
export default {
    name:'toolbar',
    props: ['hasParent'],
    methods: {
        back: function() {
            this.$router.go(-1)
        },
        goToParent: function() {
            this.$emit('parent')
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../styles/styles.scss';
$toolbar-height: 2em;
$darken-grey: darken($accent-grey, 5%);
$parent-border: 2px solid $darken-grey;
.container {
    z-index: 99999;
    background: $accent-grey;
    width: 100%;
    height: $toolbar-height;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .back-button {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        color: $font-color;
        width: 20%;
        text-align: center;
        font-size: .85rem;

        @include desktop {
            width: 10%;
        }

        &:hover {
            cursor: pointer;
            background-color: $darken-grey;
        }
    }

    .parent-button {
        display: flex;
        justify-content: center;
        align-items: center;
        color: $font-color;
        width: 60%;
        height: 100%;
        font-size: .85rem;
        border-right: $parent-border;
        border-left: $parent-border;

        @include desktop {
            border: none;
            width: 80%;
        }

        &:hover {
            cursor: pointer;
            background-color: $darken-grey;
        }
    }

    .right-holder {
        width: 20%;

        @include desktop {
            width: 10%;
        }
    }
}
</style>