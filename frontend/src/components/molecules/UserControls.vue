<template>
    <div class="controls-modal">
        <ul>
            <li class="controls-item" @click="logout">
                <button>Log Out</button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name:'user-controls',
    methods: {
        logout: function() {
            console.log('logout')
            this.$http.post(this.$api + 'logout')
                .then( (res) => {
                    this.$store.dispatch('logout');
                    this.$router.push('/');
                })
                .catch( (err) => {
                    console.log('error logging out');
                });
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../styles/styles.scss';

.controls-modal {
    background-color: $white;
    width: 100%;
    box-sizing: border-box;
    border-top: 2px solid $accent-grey;

    ul {
        list-style: none;
        padding: 0px;
        display: flex;
        justify-content: center;
        margin: 0px;

        .controls-item {
            width: 90%;
            padding: 1em 0em 1em 1em;
            border-bottom: 2px solid $light-grey;

            &:last-child {
                border-bottom: none;
            }

            &:hover {
                cursor: pointer;
            }

            button {
                font-size: 1rem;
                font-weight: 700;
                border: none;
                background-color: $white;
                
                &:hover {
                    cursor: pointer;

                }

                &:focus {
                    outline: none;
                    color: $light-grey;
                }
            }
        }
    }
}

</style>