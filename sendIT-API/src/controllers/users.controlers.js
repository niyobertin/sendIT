import parcels from "../parcel-order/parcel.js";
import users from "../users/users.js";

const getUsers = (req, res) => {
    res.json(users)
}
// create user
const addUsers = (req, res) => {
    const { firstName, lastName, gender, email, phone } = req.body;
    const newUser = { id: users.length + 1, firstName, lastName, gender, email, phone };
    users.push(newUser);
    res.send(`User created with id ${newUser.id}`);
}
//Fetch all parcel delivery orders by a specific user
const getUserParcels = (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = users.find((user) => user.id === userId);
    if (!user) {
        res.sendStatus(404);
    } else {
        const userParcels = parcels.filter((parcel) => parcel.ounerPhone === user.phone);
        res.json(userParcels)
    }
}
export default {
    addUsers,
    getUserParcels,
    getUsers,
}