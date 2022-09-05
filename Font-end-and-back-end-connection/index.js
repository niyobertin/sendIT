
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
    function validate(parcels) {
        if (parcels.trim().length === 0) {
            return true;
        }
        return false;
    }
    function phonenumberValidation() {
        const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (regex.test(ounerPhone)) {
            return true;
        }
        return false;
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
    } else if (!phonenumberValidation()) {
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


