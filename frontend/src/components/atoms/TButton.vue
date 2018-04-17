<template>
    <div>
        <button class="t-button" @click="click">{{ text }}</button>
    </div>
</template>

<script>
export default {
    name:'t-button',
    props: [ 'clickAction', 'text' ],
    methods: {
        click: function() {
            
            this.$emit(this.clickAction);
            console.log(this.clickAction);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../styles/styles.scss';
$standard: #5f5f5f;

.t-button {
    width: 100%;
    border: 2px solid $standard;
    background-color: $white;
    color: darken($standard, 10%);
    padding: .5em;
    border-radius: 10px;
    font-size: .85rem;
    font-weight: 700;

    &:hover {
        cursor: pointer;
        background-color: $standard;
        color: $white;
    }
}
</style>