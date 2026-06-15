export function checkUpdates(installed = [], latest = {}) {

  return installed.map(mod => {

    return {

      ...mod,

      updateAvailable:

        latest[mod.id] &&
        latest[mod.id] !== mod.version,

      latestVersion:

        latest[mod.id] || mod.version

    };

  });

}
