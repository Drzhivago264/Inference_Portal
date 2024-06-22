import axios from 'axios';

export function check_login(setLoginState, setUserHashKey, setUserKeyName) {
    axios.all([
        axios.get('/frontend-api/check-login'),
    ])
        .then(axios.spread((login_object) => {
            if (login_object.status == '200') {
                setLoginState(true)
                setUserHashKey(login_object.data.detail)
                setUserKeyName(login_object.data.key_name)
            }

        }))
        .catch(error => {
            if (error.response.status == '401') {
                setLoginState(false)
            }
        });

}

export function redirect_anon_to_login(navigate, is_authenticated) {
        if (!is_authenticated) {
            axios.all([
                axios.get('/frontend-api/check-login'),
            ])
                .catch(error => {
                    if (error.response.status == '401') {
                        navigate("/frontend/login")
                    }
                });
        }
   
}

export function logout(setLoginState) {
    axios.get("/frontend-api/logout")
        .then((response) => {
            setLoginState(false)
        }).catch(error => {
            console.log(error)
        });

}