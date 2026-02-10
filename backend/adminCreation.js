const mongoose =  require("mongoose");
const Admin =  require("./schema/Admin.js");
const {connectDB} = require("./connect.js")

connectDB()
const adminCreation = async ({name, email, password, role, image}) => {
    // Code to create an admin user
    try {
        const admin = new Admin({
            name,
            email,
            password,
            role
        });
        await admin.save();
        console.log("Admin user created successfully");
    } catch (error) {
        console.error("Error creating admin user:", error);
    }
};

module.exports = adminCreation;

// const admin ={
//             name : "Samuel Jackson",
//             password : "Kishan@4580",
//             email: "kishanrajput4580@gmail.com",
//             role: "admin",
//             image : "https://res.cloudinary.com/everglow-web-app-cloud/image/upload/v1760625232/samples/people/smiling-man.jpg"
//         };

// adminCreation(admin);


const getAllAdmins = async () => {
    try {
        const admins = await Admin.find({});    
        console.log("All Admins:", admins[0]);
    } catch (error) {
        console.error("Error fetching admins:", error);
    }
};
getAllAdmins();