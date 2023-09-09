import { Schema, model } from "mongoose";
import { Nation } from "../model/nation";

const NationSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});
const NationModel = model("Nation", NationSchema);

const getNation = async (id?: string) => {
  let nations: Nation[] = [];
  if (id) {
    const nation = (await NationModel.findById(id)) as Nation;
    nation !== null ? nations.push(nation) : null;
  } else {
    nations = await NationModel.find();
  }
  return nations;
};
const createNation = async (nation: Nation) => {
  const createNation = (await NationModel.create({
    name: nation.name,
    description: nation.description,
  })) as Nation;
  return createNation;
};
const updateNation = async (nation: Nation, id: string) => {
  const updateNation = await NationModel.updateOne(
    { _id: id },
    { $set: { name: nation.name, description: nation.description } }
  );
  return updateNation.modifiedCount;
};
const deleteNation = async (id?: string) => {
  let deleteNation: Nation[] = [];
  if (id) {
    let nation = (await NationModel.findByIdAndDelete(id)) as Nation;
    deleteNation.push(nation);
  } else {
    await NationModel.deleteMany();
    deleteNation = [];
  }
  return deleteNation;
};
const nationsService = {
  getNation,
  createNation,
  deleteNation,
  updateNation,
};
export default nationsService;
// export * as nationsService from '../data/nations'
