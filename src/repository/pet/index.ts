import { Collection, Schema, model } from "mongoose";
import { Pet } from "../../model/pet";

const petSchema = new Schema({
  name: String,
  type: String,
  description: String,
});

export const PetModel = model("Pet", petSchema);

export const createPet = async (newPet: Pet) => {
  const pet = await PetModel.create(newPet)
  return pet
}
export const getAllPet = async () => {
  const pets = await PetModel.find()
  return pets
}

const petService = {
  getAllPet,
  createPet
}

export default petService
