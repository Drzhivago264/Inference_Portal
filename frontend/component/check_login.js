import axios from 'axios';

export function check_login(setLoginState, setUserHashKey) {  
        axios.all([
            axios.get('/frontend-api/check-login'),
        ])
            .then(axios.spread((login_object) => {
                if (login_object.status == '200') {
                    setLoginState(true)
                    setUserHashKey(login_object.data.detail)
                }

            }))
            .catch(error => {
                if (error.response.status == '401') {
                    setLoginState(false)
                }
            });

}

export function logout(setLoginState) {  
    axios.get("/frontend-api/logout")
    .then((response) => {
        setLoginState(false)
    }).catch(error => {
        console.log(error)
    });

}