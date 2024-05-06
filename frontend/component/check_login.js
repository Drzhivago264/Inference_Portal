import axios from 'axios';

export function check_login(setLoginState) {  
        axios.all([
            axios.get('/frontend-api/check-login'),
        ])
            .then(axios.spread((login_object) => {
                if (login_object.status == '200') {
                    setLoginState(true)
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