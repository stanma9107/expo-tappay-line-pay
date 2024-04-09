import {
  withInfoPlist,
  ConfigPlugin,
  withAndroidManifest,
} from "expo/config-plugins";

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

const withAllowBackupFalse: ConfigPlugin = (config) => {
  return withAndroidManifest(config, (config) => {
    console.log("Applying withAllowBackupFalse...");

    if (
      !config.modResults.manifest.application ||
      !Array.isArray(config.modResults.manifest.application)
    ) {
      console.log(
        "Unexpected format in AndroidManifest.xml. Make sure you have an <application> tag.",
      );
      return config;
    }

    for (const application of config.modResults.manifest.application) {
      if (application && application["$"]) {
        application["$"]["android:allowBackup"] = "false";
        console.log("Set android:allowBackup to false.");
      } else {
        console.log("Skipped an application element.");
      }
    }

    return config;
  });
};

const withLinePayQueryScheme: ConfigPlugin = (config) => {
  config = withAndroidManifest(config, (config) => {
    console.log("Applying queries in manifest...");
    config.modResults.manifest.queries.push({
      package: [
        {
          $: {
            "android:name": "jp.naver.line.android",
          },
        },
      ],
    });
    return config;
  });
  return config;
};

const withConfig: ConfigPlugin = (config) => {
  config = withLSApplicationQueriesSchemes(config);
  config = withAllowBackupFalse(config);
  config = withLinePayQueryScheme(config);
  return config;
};

export default withConfig;
