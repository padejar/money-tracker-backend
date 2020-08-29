import path from "path";
import {
  Sequelize as SequelizeTs,
  SequelizeOptions,
} from "sequelize-typescript";

let coreSequelize: SequelizeTs;

const getModelsPath = () => {
  if (process.env.JEST_WORKER_ID !== undefined) {
    return [path.resolve("src/**/models/*.ts")];
  }
  return [path.resolve("dist/**/models/*.js")];
};

const getDbConfig = () => {
  if (process.env.JEST_WORKER_ID !== undefined) {
    return {
      database: process.env.TEST_DB_NAME,
      host: process.env.TEST_DB_HOST,
      port: parseInt(process.env.TEST_DB_PORT || "3306"),
      username: process.env.TEST_DB_USERNAME,
      password: process.env.TEST_DB_PASSWORD,
    };
  }
  return {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  };
};

const initSequelize = () => {
  const options: SequelizeOptions = {
    ...getDbConfig(),
    logging: false,
    dialect: "mysql",
    models: getModelsPath(),
  };

  return new SequelizeTs(options);
};

const getSequelizeInstance = (): SequelizeTs => {
  if (coreSequelize === undefined) coreSequelize = initSequelize();
  return coreSequelize;
};

export default getSequelizeInstance;
