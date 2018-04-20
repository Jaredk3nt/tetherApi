import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

//const debug = process.env.NODE_ENV !== 'production';
const api = process.env.NODE_ENV === 'production' ? '/api/' : 'https://tetheredapp.herokuapp.com/api/';

const state = {
    isLoggedIn: false,
    userid: "",
    username: "",
    writing: false,
    currentParent: ""
}

const getters = {
    isPendingLogin: state => {
        return state.pending;
    },
    isLoggedIn: state => {
        return state.isLoggedIn;
    },
    user: state => {
        return state.username;
    },
    userid: state => {
        return state.userid;
    },
    writing: state => {
        return state.writing;
    },
    currentParent: state => {
        return state.currentParent;
    }
}

const mutations = {
    LOGIN (state) {
        state.pending = true;
    },
    LOGIN_SUCCESS (state, creds) {
        state.isLoggedIn = true;
        state.pending = false;
        state.userid = creds.userid;
        state.username = creds.username;
    },
    PERSISTENT_LOGIN (state, user) {
        state.isLoggedIn = true;
        state.userid = user.userid;
        state.username = user.username;
    },
    LOGOUT (state) {
        state.isLoggedIn = false;
        state.userid = "";
        state.username = "";
    },
    start_writing (state, parent) {
        state.writing = true;
        if(parent) {
            console.log(parent);
            state.currentParent = parent;
        }
    },
    stop_writing (state) {
        state.writing = false;
        state.currentParent = ''
    }
}

const actions = {
    post ({ commit, getters }, story_obj) {
        // Send story to API
        // On completion
        return new Promise( (resolve, reject) => {
            Vue.http.post( api + 'stories', { body: story_obj.story, parent: story_obj.parent }).then( response => {
                console.log("posted: " + story_obj.story)
                commit('stop_writing');
                resolve();
            }, error => {
                //error
                reject();
            });
        });
        
    },
    login ({ commit }, creds) {
        commit('LOGIN'); // show spinner
        return new Promise( (resolve, reject) => {
            Vue.http.post( api + 'login', creds).then( response => {
                commit('LOGIN_SUCCESS', { userid: response.body._id, username: response.body.username });
                resolve();
            }, error => {
                //error
                console.log("on no error");
                reject();
            });
        });
    },
    logout ({ commit }) {
        commit('LOGOUT');
    },
    createUser ({ commit }, creds) {
        commit('LOGIN'); // show spinner
        return new Promise( (resolve, reject) => {
            Vue.http.post( api + 'users', creds).then( response => {
                commit('LOGIN_SUCCESS', {userid: response.body._id});
                resolve();
            }, error => {
                //error
                console.log("on no error");
                reject();
            });
        });
    },
    checkLogin ({ commit }) {
        Vue.http.get(api + 'login')
            .then( res => {
                console.log(res.body);
                commit('PERSISTENT_LOGIN', res.body);
            })
            .catch( err => {
                console.log(err);
            });
    }
}
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});