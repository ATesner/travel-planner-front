
const base_url = 'http://localhost:3008/api';

function get(url) {

    return fetch(base_url + url, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('token')
        }
    }).then( res => {
        // console.log('[GET] RESULT :', res.json())
        return res.json()
    });
}

function post(url, obj) {

    return fetch(base_url + url, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('token')
        },
        body: JSON.stringify(obj)
    }).then( res => {
        // console.log('[POST] RESULT :', res.json())
        return res.json()
    });
}

function remove(url, id) {

    return fetch(base_url + url, {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('token')
        },
        body: JSON.stringify({
            id: id
        })
    }).then( res =>{
        console.log('[DELETE] RESULT :', res)
        return res.json()
    });
}

module.exports = {
    HttpHelper : {
        get: get,
        post: post,
        delete: remove
    }
}