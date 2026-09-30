import mongoose from "mongoose";
import dotenv from "dotenv";
import Role from "./models/Role.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await Role.deleteMany({});

await Role.create([
    {
        name: "superadmin",

        permissions: {
            consignor: {
                view: true,
                add: true,
                edit: true,
                delete: true,
                import: true,
                export: true
            },

            consignment: {
                view: true,
                add: true,
                edit: true,
                delete: true,
                import: true,
                export: true
            },

            history: {
                view: true,
                add: true,
                edit: true,
                delete: true,
                import: true,
                export: true
            },

            roles: {
                view: true,
                add: true,
                edit: true,
                delete: true,
                import: true,
                export: true
            }
        }
    },

    {
        name: "admin",

        permissions: {
            consignor: {
                view: true,
                add: true,
                edit: true,
                delete: true,
                import: true,
                export: true
            },

            consignment: {
                view: true,
                add: true,
                edit: true,
                delete: true,
                import: true,
                export: true
            },

            history: {
                view: true,
                add: true,
                edit: true,
                delete: true,
                import: true,
                export: true
            },

            roles: {
                view: false,
                add: false,
                edit: false,
                delete: false,
                import: false,
                export: false
            }
        }
    },

    {
        name: "vendor",

        permissions: {
            consignor: {
                view: true,
                add: false,
                edit: false,
                delete: false,
                import: false,
                export: false
            },

            consignment: {
                view: true,
                add: true,
                edit: true,
                delete: false,
                import: false,
                export: true
            },

            history: {
                view: true,
                add: false,
                edit: false,
                delete: false,
                import: false,
                export: true
            },

            roles: {
                view: false,
                add: false,
                edit: false,
                delete: false,
                import: false,
                export: false
            }
        }
    }
]);

console.log("Roles created successfully");

process.exit();