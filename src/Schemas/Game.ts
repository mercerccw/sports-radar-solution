import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '../database';

class GameModel extends Model<
  InferAttributes<GameModel>,
  InferCreationAttributes<GameModel>
> {
  declare id: number;
  declare eventTime: string;
  declare awayTeam: string;
  declare homeTeam: string;
}

GameModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
    },
    eventTime: DataTypes.STRING,
    awayTeam: DataTypes.STRING,
    homeTeam: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: 'games',
  }
);

export { GameModel };
