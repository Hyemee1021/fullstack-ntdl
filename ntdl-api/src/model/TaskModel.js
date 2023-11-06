import TaskSchema from "./TaskSchema.js";

//one method in one function
//we are getting finctions from mongo db

//CRUD
//.making query

//CREATE

export const insertTask = (taskObj) => {
  return TaskSchema(taskObj).save();
  //this return promise
};

//READ
export const getAllTasks = () => {
  return TaskSchema.find();
};

//UPDATE
//@filter is id string ,@data is an object

// to prevent default behavior new: true
export const SwitchTask = (_id, data) => {
  return TaskSchema.findByIdAndUpdate(_id, data, { new: true });
};

// //delete
export const delteTask = (_id) => {
  return TaskSchema.findByIdAndDelete(_id);
};

export const deleteManyTask = (ids) => {
  return TaskSchema.deleteMany({ _id: { $in: ids } });
};
