// Fake DB
const userList = [];

module.exports = {
    getUserByUsername: (username) => {
        return userList.find(user => user.username == username);
    },

    checkUsernameExist: (username) => {
        return userList.filter(user => user.username == username).length > 0;
    },

    getUserById: (id) => {
        return userList.find(user => user.id == id);
    },

    addNewUser: (user) => {
        return userList.push(user);
    },

    showAll: () => {
        console.log(userList);
    }
}