import axiosInstance from "../../axiosApi";


const loginUser = (payload) => ({ type: "LOGIN_USER", payload });

const logoutUser = () => ({ type: "LOGOUT" });

const loginError = (error) => ({ type: "ERROR", error });




export const registerUser = (userInfo) => async dispatch => {
    try{
        console.log('work')

        const res = await axiosInstance.post("/auth/user/create/", {
            username: userInfo.username,
            password: userInfo.password
        });
        if (res.status === 201){
            const res = await axiosInstance.post("auth/token/obtain/", {
                username: userInfo.username,
                password: userInfo.password
            });
            axiosInstance.defaults.headers['Authorization'] = 'JWT' + res.data.access
            localStorage.setItem("access_token", res.data.access);
            localStorage.setItem("refresh_token", res.data.refresh);
            dispatch(autoLogin())
            return res.data
        }
    } catch(error) {
        console.log("Ошибка регистрации ", error)
    }
}


export const autoLogin = () => async dispatch => {
    try{
        // { skipAuthRefresh: true } было передано как аргумент, попробуем без него
        const res = await axiosInstance.get("auth/get_user/")
        dispatch(loginUser(res.data))
    }catch(error){
        console.log('auloLogin ', error)
    }
}