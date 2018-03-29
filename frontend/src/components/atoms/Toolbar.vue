<template>
    <div class="container">
        <div class="back-button" @click="back">Back</div>
    </div>
</template>

<script>
export default {
    name:'toolbar',
    methods: {
        back: function(){
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../styles/styles.scss';
$toolbar-height: 2em;
.container {
    z-index: 99999;
    background: $accent-grey;
    width: 100%;
    height: $toolbar-height;
    display: flex;
    align-items: center;

    .back-button {
        color: $font-color;
        margin-left: 1em;
        font-size: .85rem;

        &:hover {
            cursor: pointer;
        }
    }
}
</style>