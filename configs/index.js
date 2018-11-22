var Config = {};

Config.API_URL = 'https://api.idealhouseshare.com/'
Config.API_KEY = '12345'

Config.INCIDENT_PRIORIRTY = {
	URGENT: 0,
	NORMAL: 1,
	LOW: 2
}

const INCIDENT_STATUS = {
	OPENED: 0,
	IN_REVIEW: 0,
	CLOSED: 3,
}


export default Config;
export { INCIDENT_STATUS };