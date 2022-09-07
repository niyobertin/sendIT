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
    const { productNmae, price, pickupLocation, destination, ounerPhone, createdAt } = req.body;
    const newParcel = { id: parcels.length + 1, productNmae, price, pickupLocation, destination, ounerPhone, createdAt, parcelsStatus: true };
    parcels.push(newParcel);
    res.send(`New parcel created with id ${newParcel.id}`)
}
//cancel parcel order
const cancelparcel = (req, res) => {
    const parcelId = parseInt(req.params.id);
    const parcelToCancel = parcels.find((parcel) => parcel.id === parcelId)
    if (parcelToCancel) {
        parcelToCancel.parcelsStatus = false;
        res.send('Parcel canceled!!')
    }
    res.send('Parcel Not found!!')
}
// change parcel destination
function changeDestination(req, res) {
    const parcelId = parseInt(req.params.id);
    const { destination } = req.body;
    const parcelToUpdate = parcels.find((parcel) => parcel.id === parcelId)
    if (parcelToUpdate) {
        const newParcel = {
            destination: destination || parcelToUpdate.destination
        }
        res.send(newParcel)
    } else {
        console.error()
    }
    res.end(newParcel);
}

export default {
    getParcels,
    getParcel,
    addParcel,
    cancelparcel,
    changeDestination,
}