import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
    {
        view: {
            type: Boolean,
            default: false
        },

        add: {
            type: Boolean,
            default: false
        },

        edit: {
            type: Boolean,
            default: false
        },

        delete: {
            type: Boolean,
            default: false
        },

        import: {
            type: Boolean,
            default: false
        },

        export: {
            type: Boolean,
            default: false
        }
    },
    { _id: false }
);

const roleSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    permissions: {

        consignor: {
            type: permissionSchema,
            default: () => ({})
        },

        consignment: {
            type: permissionSchema,
            default: () => ({})
        },

        history: {
            type: permissionSchema,
            default: () => ({})
        },

        roles: {
            type: permissionSchema,
            default: () => ({})
        }
    }

});

export default mongoose.model("Role", roleSchema);