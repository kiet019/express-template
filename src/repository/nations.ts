import { Nation } from "../model/nation/index";

let nations = [{ id: "vn", name: "Viet nam" }];
const createCountry = (nation: Nation) => {
  nations.push(nation);
};
const deleteCountry = (id?: string) => {
  if (id) {
    nations = nations.filter((value) => value.id !== id);
  }  else {
    nations = []
  }
};
const updateCountry = (nation: Nation, id: string) => {
  let index = nations.findIndex((value) => value.id === id);
  nations[index].name = nation.name
};
const getCountry = () => {
  return nations
}
const nationsService = {
  getCountry,
  createCountry,
  deleteCountry,
  updateCountry,
};
export default nationsService;
// export * as nationsService from '../data/nations'
