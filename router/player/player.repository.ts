import { Schema, model } from "mongoose";
import { Player } from "../package/model/player";

const PlayerSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    image: {
      type: String,
      require: true,
    },
    club: {
      type: String,
      require: true,
    },
    position: {
      type: String,
      require: true,
    },
    goals: {
      type: Number,
      require: true,
    },
    isCaptain: {
      type: Boolean,
      require: true,
    },
  },
  { timestamps: true }
);
const PlayerModel = model("Player", PlayerSchema);

const getPlayer = async (id?: string) => {
  let players: Player[] = [];
  if (id) {
    const player = (await PlayerModel.findById(id)) as Player;
    player !== null ? players.push(player) : null;
  } else {
    players = await PlayerModel.find();
  }
  return players;
};
const createPlayer = async (player: Player) => {
  const createPlayer = (await PlayerModel.create({
    name: player.name,
    club: player.club,
    goals: player.goals,
    position: player.position,
    image: player.image,
    isCaptain: player.isCaptain,
  })) as Player;
  return createPlayer;
};
const updatePlayer = async (player: Player, id: string) => {
  const updateNation = await PlayerModel.updateOne(
    { _id: id },
    {
      $set: {
        name: player.name,
        club: player.club,
        goals: player.goals,
        position: player.position,
        image: player.image,
        isCaptain: player.isCaptain,
      },
    }
  );
  return updateNation.modifiedCount;
};
const deletePlayer = async (id?: string) => {
  let deletePlayer;
  if (id) {
    deletePlayer = await PlayerModel.deleteOne({ _id: id });
  } else {
    deletePlayer = await PlayerModel.deleteMany();
  }
  return deletePlayer.deletedCount;
};
const playersService = {
  getPlayer,
  createPlayer,
  deletePlayer,
  updatePlayer,
};
export default playersService;
