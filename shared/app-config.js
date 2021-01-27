import config from "../config/config";

export default class AppConfig {
  static getConfig() {
    return config;
  }

  static getBaseUrl() {
    return config[config.ENV_MODE]["API_URL"];
  }
}
