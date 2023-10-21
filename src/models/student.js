import { model,Schema } from "mongoose";

const studentSchema = new Schema({
    name: String,
    age: Number,
    mobile: String,
    email: String,
  });
  const student = model("student", studentSchema);

  export default student