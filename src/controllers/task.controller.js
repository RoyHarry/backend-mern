import mongoose from "mongoose";
import { taskModel } from "../models/task.model.js";
export const getTasks = async (req, res)=>{

    const tasks = await taskModel.find({ user: req.user.id}).populate('user');

    res.status(200).send(tasks);
}


export const registerTask = async (req, res)=>{
    const {tittle, description, date } = req.body;

    console.log(req.user);

    const task = new taskModel({
        tittle : tittle,
        description: description,
        date: date,
        user: req.user.id
    });

    const taskSave = await task.save();

    res.status(200).send(taskSave);

}

export const deleteTask = async (req, res)=>{
    
    const taskDeleted = await taskModel.findByIdAndDelete(req.params.id);

    if(!taskDeleted){
        return res.status(404).send({ msg: "No se encontró ninguna tarea"})
    }

    res.status(200).send({ msg: "Se eliminó la tarea"});

}

export const getTask = async (req, res)=>{

    const task = await taskModel.findById(req.params.id).populate('user');

    if(!task){
        return res.status(404).send({msg : "No se encontró ninguna tarea"});
    }

    res.status(200).send(task);

}

export const updateTask = async (req, res) =>{
    const task = await taskModel.findByIdAndUpdate(req.params.id, req.body, {
        new : true
    });
    if(!task) return res.status(404).send({ msg: "No se encontró ninguna tarea"});
    res.status(200).send({ msg: "en registerTask"});

}