import parcels from "../parcel-order/parcel.js";
import users from "../users/users.js";

const getUsers = (req, res) => {
    res.json(users)
}
// create user
const addUsers = (req, res) => {
    const { firstName, lastName, gender, email, phonenumber, password1, password2 } = req.body;
    const newUser = { id: users.length + 1, firstName, lastName, gender, email, phonenumber, password1, password2 };
    const mail = users.find(user => user.email === newUser.email)
    if (mail) {
        res.send(`Email provided, was alredy used to create anccount!`)
    } else {
        users.push(newUser);
    }
    res.send(`Hi ${newUser.firstName},your account is ready now you can sign in`);
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