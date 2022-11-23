// window.onload = () => {
//     if(!sessionStorage.users){
//         location.replace('/login.html');
//     }
// }

const placeOrderBtn = document.querySelector('.place-order-btn');
placeOrderBtn.addEventListener('click', () => {
    let address = getAddress();

    if(address){
        fetch('/order', {
            method: 'post',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                order: JSON.parse(localStorage.cart),
                email: JSON.parse(sessionStorage.user).email,
                add: address,
            })
        }).then(res => res.json())
        .then(data => {
            if(data.alert == 'your order is placed'){
                delete localStorage.cart;
                alert(data.alert, 'success');
            } else{
                alert(data.alert);
            }
        })
    }
})

const getAddress = () => {
    // validation
    let address = document.querySelector('#address').value;
    let street = document.querySelector('#street').value;
    let city = document.querySelector('#city').value;
    let state = document.querySelector('#state').value;
    let pincode = document.querySelector('#pincode').value;
    let landmark = document.querySelector('#landmark').value;

    if(!address.length || !street.length || !city.length || !state.length || !pincode.length ||  !landmark.length){
        return alert('fill all the inputs first');
    } else{
        return { address, street, city, state, pincode, landmark };
    }
}