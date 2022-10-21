import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from 'sequelize';
import { sequelize } from '../database';

class LiveRunModel extends Model<
  InferAttributes<LiveRunModel>,
  InferCreationAttributes<LiveRunModel>
> {
  declare id: string;
  declare startTime: string;
  declare endTime: string | null;
}

LiveRunModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    startTime: DataTypes.DATE,
    endTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'live_runs',
  }
);

export { LiveRunModel };
