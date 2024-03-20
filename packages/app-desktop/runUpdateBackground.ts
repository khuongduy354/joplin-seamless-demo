import { autoUpdater } from "electron-updater";

export default async function runUpdateBackground(startDownloadCb: Function) {
  const logger = {
    info: console.log,
    error: console.error,
  };
  autoUpdater.logger = null;

  autoUpdater.on("checking-for-update", () => {
    logger.info("Checking for update");
  });
  autoUpdater.on("update-available", (info) => { 
    // validate update info here
    logger.info(info);
  });

  autoUpdater.on("download-progress", (progressObj) => {
    // progress percentage here
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + " - Downloaded " + progressObj.percent + "%";
    log_message =
      log_message +
      " (" +
      progressObj.transferred +
      "/" +
      progressObj.total +
      ")";
    logger.info(log_message);
  });
  autoUpdater.on("update-not-available", (info) => {
    logger.info(info);
  });
  autoUpdater.on("error", (err) => {
    logger.error(err);
  });
  

  autoUpdater.on("update-downloaded", (info) => {
    logger.info(info);
  });
  await startDownloadCb();
  autoUpdater.checkForUpdatesAndNotify();
}
