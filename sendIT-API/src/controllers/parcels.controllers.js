import parcels from "../parcel-order/parcel.js";
import users from "../users/users.js";
//Get all parcel delivery orders
const getParcels = (req, res) => {
    res.json(parcels)
}
// Get a specific parcel delivery order
const getParcel = (req, res) => {
    const id = parseInt(req.params.id);
    const parcel = parcels.find((parcel) => parcel.id === id);
    //tesint if parcel is found
    if (!parcel) {
        res.sendStatus(404);
    } else {
        res.json(parcel)
    };
}
//create a parcel order.
const addParcel = (req, res) => {
    const { productNmae, price, pickupLocation, destination, ounerPhone, createdAt } = req.body;
    const newParcel = { id: parcels.length + 1, productNmae, price, pickupLocation, destination, ounerPhone, createdAt };
    parcels.push(newParcel);
    res.send(`New parcel created with id ${newParcel.id}`)
}
//cancel parcel order
const concelParcel = (req, res) => {
    const parcelId = parseInt(req.params.id);
    const parcelToCancel = parcels.find((parcel) => parcel.id === parcelId)
    const { productName, price, pickupLocation, destination, ounerPhone, createdAt } = req.body;

    const conceledParcel = {
        productName: productName || parcelToCancel.productName,
        price: price || parcelToCancel.price,
        pickupLocation: pickupLocation || parcelToCancel.pickupLocation,
        destination: destination || parcelToCancel.destination,
        ounerPhone: ounerPhone || parcelToCancel.ounerPhone,
        createdAt: createdAt || parcelToCancel.createdAt
    }
    res.send("product canceled")
}

export default {
    getParcels,
    getParcel,
    addParcel,
    concelParcel,
}