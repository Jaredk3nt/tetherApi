<template>
    <div>
        <button class="t-button" @click="click" :class="{off: off}">
            <slot></slot>
        </button>
    </div>
</template>

<script>
export default {
    name:'t-button',
    props: [ 'clickAction', 'off'],
    methods: {
        click: function() {
            this.$emit(this.clickAction);
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

    &.off {
        color: darken($accent-grey, 5%);
        background-color: $accent-grey;
        border: 2px solid darken($accent-grey, 5%);

        &:hover {
            cursor: default;
            background-color: $accent-grey;
            color: darken($accent-grey, 5%);
        }
    }
    &:hover {
        cursor: pointer;
        background-color: $standard;
        color: $white;

        .cog {
            fill: $white;
        }
    }

    .cog {
        fill: darken(#5f5f5f, 10%);
    }
}
</style>