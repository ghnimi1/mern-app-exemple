const mongoose=require("mongoose")

const EmployeeSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: 'User' },
        firstname: {
            type: String,
            require: true,
        },
        lastname: {
            type: String,
            require: true,
        },
        phone: {
            type: Number,
            require: true,
        },
        address: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Employee', EmployeeSchema);