import { withInfoPlist, ConfigPlugin } from "expo/config-plugins";

const withLSApplicationQueriesSchemes: ConfigPlugin = (config) => {
  config = withInfoPlist(config, (config) => {
    if (!config.modResults["LSApplicationQueriesSchemes"]) {
      console.log("Adding LSApplicationQueriesSchemes to Info.plist");
      config.modResults["LSApplicationQueriesSchemes"] = [];
    }
    config.modResults["LSApplicationQueriesSchemes"]?.push("line");
    return config;
  });

  return config;
};

export default withLSApplicationQueriesSchemes;
