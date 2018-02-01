'use strict';

function getter(endpoint) {
    fetch(endpoint)
        .then(response => {
            if(response.ok) {
                return response;
            }
            throw new Error('');
        })
        .then( response => {
            return response;
        })
        .catch( error => {
            console.log(error);
        });
}

function poster(endpoint, obj) {
    fetch(endpoint, obj)
        .then(response => {
            if(response.ok) {
                return response;
            }
            throw new Error('');
        })
        .then( response => {
            return response;
        })
        .catch( error => {
            console.log(error);
        });
}

console.log(getter('http://localhost:3000/stories'));