import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    tittle: {
        type: String,
        required: true        
    },
    description : {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'usertask',
        required: true
    }    
}, {
    timestamps: true
});

export const taskModel = mongoose.model('taskModel', taskSchema);