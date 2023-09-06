import { Nation } from "../model/nation/index";

export let nations = [{ id: "vn", name: "Viet name" }];
export const handleCreateCountry = (nation: Nation) => {
  nations.push(nation);
};
export const handleDeleteCountry = () => {
  nations = nations.filter((value) => value.id === "");
};
