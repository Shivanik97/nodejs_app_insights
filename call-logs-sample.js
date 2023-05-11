import logger from "./logger.js";

export default function callLogsSample() {
    // rest of your code 
    logger.emerg('emerg');
    logger.alert('alert');
    logger.crit('crit');
    logger.error('error');
    logger.warning("warning");
    logger.notice("notice")
    logger.info('info');
    logger.debug('debug');

}