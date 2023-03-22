



export const getRecentView = () => {


    let recent = window.sessionStorage.getItem('view')
    recent = JSON.parse(recent);

    return recent;
};


export const setRecentView = (product) => {

    if(!product) return;

    let recent = window.sessionStorage.getItem('view');

    if(recent) { //recent 변수는 배열이므로
        recent = JSON.parse(recent);
        let flag = false;
        recent.forEach(item => {
            if(item.title === product.title) {
                flag = true;
            }
        });
        if(flag) return;
        const newarray = [...recent, product];
        window.sessionStorage.setItem('view',JSON.stringify(newarray));
    }
    else {
        const newarray = [product];
        window.sessionStorage.setItem('view', JSON.stringify(newarray));
    }
}