import { Player } from "../model/player/index";

let players = [{ id: "1", name: "Messi" }];
const createPlayer = (player: Player) => {
    players.push(player);
};
const deletePlayer = (id?: string) => {
  if (id) {
    players = players.filter((player) => player.id !== id);
  }  else {
    players = []
  }
};
const updatePlayer = (player: Player, id: string) => {
  let index = players.findIndex((value) => value.id === id);
  players[index].name = player.name
};
const getPlayer = () => {
  return players
}
const playersService = {
  getPlayer,
  createPlayer,
  deletePlayer,
  updatePlayer,
};
export default playersService;
// export * as nationsService from '../data/nations'
