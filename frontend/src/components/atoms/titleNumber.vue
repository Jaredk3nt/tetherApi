<template>
    <div class="container">
        <p>{{title}}</p>
        <h3>{{value}}</h3>
    </div>
</template>

<script>
export default {
    name:'title-number',
    props: ['title', 'value']
}
</script>

<style lang="scss" scoped>
@import '../../styles/styles.scss';
.container {
    p {
        margin: .5em 0em 0em 0em;
        font-size: .75rem;
    }
    h3 {
        margin: .5em 0em 1em 0em;
    }
}
</style>