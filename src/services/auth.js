const ehAutenticado = () => {
    if(sessionStorage.getItem('sessionid')){
        return true
    }else{
        return false
    }
}

export default ehAutenticado;