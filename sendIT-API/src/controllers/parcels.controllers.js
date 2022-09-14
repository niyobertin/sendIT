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
    //testing if parcel is found
    if (!parcel) {
        res.sendStatus(404);
    } else {
        res.json(parcel)
    };
}
//create a parcel order.
const addParcel = (req, res) => {
    const { productName, price, pickupLocation, destination, ounerPhone } = req.body;
    const newParcel = { id: parcels.length + 1, productName, price, pickupLocation, destination, ounerPhone, createdAt: new Date(), status: true };
    parcels.push(newParcel);
    res.send(`New parcel created with id ${newParcel.id}`)
}
//cancel parcel order
const concelParcel = (req, res) => {
    const parcelId = parseInt(req.params.id);
    const parcelToCancel = parcels.find((parcel) => parcel.id === parcelId)
    if (parcelToCancel) {
        const canceledParcel = {
            status: false
        }
        res.send(canceledParcel);
    } else {
        res.sendStatus(404);
    }

}
const changeDestination = (req, res) => {
    const parcelId = parseInt(req.params.id);
    const parcelDestinationTochange = parcels.find((parcel) => parcel.id === parcelId)
    const { destination } = req.body;
    if (parcelDestinationTochange) {
        const nedDestination = {
            destination: destination || parcelDestinationTochange.destination
        }
        res.send(nedDestination);
    } else {
        res.sendStatus(404);
    }

}

export default {
    getParcels,
    getParcel,
    addParcel,
    concelParcel,
    changeDestination,
}