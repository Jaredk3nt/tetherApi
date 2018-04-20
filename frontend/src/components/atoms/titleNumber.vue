<template>
    <div class="container">
        <h3>{{value}}</h3>
        <p>{{title}}</p>
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
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    p {
        display: inline;
        font-size: .95rem;
        margin: 0em 0em 0em .5em;

        @include tinyphone {
            font-size: .85rem;
        }
    }
    h3 {
        display: inline;
        margin: 0px;
        font-size: 1rem;
        font-weight: 900;

        @include tinyphone {
            font-size: .95rem;
        }
    }
}
</style>