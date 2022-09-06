function validate(item, erro) {
    var flag = true;
    if (password.value.trim() == "") {
        // alert('blank password')
        item.style.border = "dotted red"
        item.style.outline = "none";
        flag = false
    } else if (item.value.trim() != "") {
        item.style.border = ""
    }
    // alert(flag);
    return flag // to maintain state of flag

}






// Displying all parcels order created.
const loopTrougthparcels = (parcelOrders) => {
    for (i = 0; i < parcelOrders.length; i++) {
        let productId = document.getElementById("id");
        let Pid = document.createElement("p");
        Pid.innerHTML = parcelOrders[i].id;
        document.body.appendChild(Pid);
        productId.appendChild(Pid);

        let productNames = document.getElementById("pname");
        let Pname = document.createElement("p");
        Pname.innerHTML = parcelOrders[i].productName;
        document.body.appendChild(Pname);
        productNames.appendChild(Pname);

        let productPrice = document.getElementById("pprice");
        let Pprice = document.createElement('p');
        Pprice.innerHTML = parcelOrders[i].price;
        document.body.appendChild(Pprice);
        productPrice.appendChild(Pprice);

        let productPickupLocation = document.getElementById("plocation");
        let PpickupLocation = document.createElement('p');
        PpickupLocation.innerHTML = parcelOrders[i].pickupLocation;
        document.body.appendChild(PpickupLocation);
        productPickupLocation.appendChild(PpickupLocation);

        let productDestination = document.getElementById("pdestination");
        let Pdestination = document.createElement('p');
        Pdestination.innerHTML = parcelOrders[i].destination;
        document.body.appendChild(Pdestination);
        productDestination.appendChild(Pdestination);

        let productOunerPhone = document.getElementById("pphone");
        let PounerPhone = document.createElement('p');
        PounerPhone.innerHTML = parcelOrders[i].ounerPhone;
        document.body.appendChild(PounerPhone);
        productOunerPhone.appendChild(PounerPhone);

        let productcreatedAt = document.getElementById("date");
        let PcreatedAt = document.createElement('p');
        PcreatedAt.innerHTML = parcelOrders[i].createdAt;
        document.body.appendChild(PcreatedAt);
        productcreatedAt.appendChild(PcreatedAt);

    }
}
function getAllParcels() {
    fetch('http://localhost:8000/api/parcels', {
        method: "GET",
        headers: { "Content-type": "application/json;charset=UTF-8" }
    })
        .then(response => response.json())
        .then(parcels => loopTrougthparcels(parcels))
        .catch(err => console.log('Request Failed', err));
}

function getUniqueparcel() {
    const parcelId = prompt("Enter parcel id");
    fetch(`http://localhost:8000/api/parcels/${parcelId}`, {
        method: 'GET',
        headers: { "Content-type": "application/json;charset=UTF-8" }
    })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(err => console.log(err));
}
// validation functions
function validate(parcels) {
    if (parcels.trim().length === 0) {
        return true;
    }
    return false;


}
//phone number validation function
function phonenumberValidation(item) {
    const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (regex.test(item)) {
        return true;
    }
    return false;
}
//Email validation function
function validateEmail(input) {
    const mail = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/;

    if (mail.test(input)) {
        return true;
    } else {
        return false;
    }
}
// refleshing function
function reload() {
    location.reload();
}
const createParcel = () => {
    //values
    const productName = document.getElementById("productName").value;
    const pri = document.getElementById("price").value;
    const price = pri.toString();
    const pickupLocation = document.getElementById("pickup-location").value;
    const destination = document.getElementById("destination").value;
    const ounerPhone = document.getElementById("phonenumber").value;
    const createdAt = document.getElementById("createdat").value;
    const fedback = document.getElementById("feedback-parcel-order");
    const validation = document.getElementById("validation");
    const newParcel = {
        productName: productName,
        price: price,
        pickupLocation: pickupLocation,
        destination: destination,
        ounerPhone: ounerPhone,
        createdAt: createdAt
    }

    if (validate(productName)) {
        validation.style.color = "red";
        validation.innerHTML = "Product name box must be filled."
    } else if (validate(price)) {
        validation.style.color = "red";
        validation.innerHTML = "Please give the price of your product."
    } else if (validate(pickupLocation)) {
        validation.style.color = "red";
        validation.innerHTML = "Please tell us where your product is located."
    } else if (validate(destination)) {
        validation.style.color = "red";
        validation.innerHTML = "provide location to depose your product."
    } else if (!phonenumberValidation(ounerPhone)) {
        validation.style.color = "red";
        validation.innerHTML = "provide correct form of phone number"
    } else if (validate(createdAt)) {
        validation.style.color = "red";
        validation.innerHTML = "Enter date"
    } else {
        fetch('http://localhost:8000/api/parcels', {
            method: 'POST',
            headers: {
                "Content-type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify(newParcel)
        })
            .then(response => response.text())
            .then(parcels => {
                fedback.innerHTML = parcels
            })
            .catch(err => console.log('Request Failed', err));
    }
}
// User connection backend - frontend
const signUp = () => {
    const firstName = document.getElementById('fname').value;
    const lastName = document.getElementById('lname').value;
    const gender = document.getElementById('gender').value;
    const email = document.getElementById('email').value;
    const password1 = document.getElementById('password1').value;
    const password2 = document.getElementById('password2').value;
    const phonenumber = document.getElementById('phone').value;
    const erro = document.getElementById('erro');

    const newUser = {
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        email: email,
        phonenumber: phonenumber,
        password1: password1,
        password2: password2,
    }
    // user singn up form validation
    if (validate(firstName)) {
        erro.style.color = "red";
        erro.innerHTML = "Provide your first name";
    } else if (!validateEmail(email)) {
        erro.innerHTML = "Provide a correct email";
    } else if (!phonenumberValidation(phonenumber)) {
        erro.innerHTML = "Phone number provided is incorrect!. Phone number must include 10 numbers only!";
    } else if (validate(password1)) {
        erro.innerHTML = "Create user password";
    } else if (password1.length < 6 || password1.length >= 10) {
        erro.innerHTML = "Password must be at least 6 chracter long and less than 10 cracters";
    } else if (password1 !== password2) {
        erro.innerHTML = "Provide a password similar to the   previous password";
    } else {
        fetch("http://localhost:8000/api/users", {
            method: "POST",
            headers: { "Content-type": "application/json;charset=UTF-8" },
            body: JSON.stringify(newUser)
        })
            .then((response) => response.text())
            .then((user) => {
                const feedback = document.getElementById("feedback");
                feedback.style.color = "green"
                feedback.innerHTML = user;
            })
            .catch(err => console.log(err));
    }

}
// sign in connection 
const signIn = () => {
    const emailSing_in = document.getElementById('email').value;
    const password = document.getElementById("password-sigin").value;
    const feedback_signIn = document.getElementById("feedback");
    fetch('http://localhost:8000/api/users', {
        method: "GET",
        headers: { "Content-type": "application/json;charset=UTF-8" }
    })
        .then(response => response.json())
        .then(users => {
            const usersVelify = users.find(user => user.email === emailSing_in);
            if (usersVelify.email === emailSing_in && usersVelify.password1 === password) {
                location.href = '/home.html';
            } else {
                feedback_signIn.innerHTML = "Email or password is invalid!";
                feedback_signIn.style.color = 'red';
            }
            console.log(usersVelify.firstName)
        })

        .catch(err => {
            feedback_signIn.innerHTML = "Email or password is invalid!";
            feedback_signIn.style.color = 'red';
        });
}
