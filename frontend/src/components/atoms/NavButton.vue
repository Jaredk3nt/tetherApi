<template>
    <div>
        <div v-if="!route" class="nav-button" @click="$emit('clicked')">
            <div class="title">{{title}}</div>
        </div>
        <router-link v-else class="nav-button" :to="{name: route}">
            <div class="title">{{title}}</div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'nav-button',
    props: ['title', 'route'],
    methods: {
        dispatch: function() {
            this.$store.dispatch('test')
        }
    }
}
</script>

<style lang="scss">
@import '../../styles/styles.scss';
.nav-button {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;

    .title {
        color: $font-color;
        font-size: 1.1rem;
        font-weight: 600;

        &:hover {
            color: $font-hover-color;
            cursor: pointer;
        }
    }
}

</style>