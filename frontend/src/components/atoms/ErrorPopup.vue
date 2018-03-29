<template>
    <div class="error-container" v-if="message" @click="closeError">
        <p>{{message}}</p>
    </div>
</template>

<script>
export default {
    name:'error-popup',
    props: ['message'],
    methods: {
        closeError: function() {
            this.message = ""
        }
    }
}
</script>

<style lang="scss">
@import '../../styles/styles.scss';
.error-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: rgba(200, 0, 0, .9);
    color: $white;
    z-index: 9999999;
    text-align: center;
}
</style>