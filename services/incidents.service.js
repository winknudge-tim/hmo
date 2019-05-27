import Store from 'react-native-simple-store'
import _ from 'lodash'
import Config from '../configs'
import MessagesService from './messages.service'

var dataStub = [ {
    "iIncId": "1",
    "dCreated": "Sun Apr 15 2018 17:49:46 GMT+01:00",
    "createdBy": {
        "iUsrId": "47",
        "sName": "Kris Sparrow"
    },
    "sTitle": "test",
    "sLocation": "test",
    "sStatus": "Reported",
    "dExpectedDate": "1/1/2000 12:00:00 AM",
    "dCompletedDate": "Reported"
}]

/*
{
    "iItyId": "1",
    "sPhotoFileName": "test",
    "sVideoFileName": "test",
    "sTitle": "ffff",
    "sDescription": "test",
    "sLocation": "test",
    "iPrpId": "1",
     "iUsrId": "9"
}
 */
const logIncident = function (incident, createChat) {
    return new Promise((resolve, reject) => {

        var sendData = JSON.stringify(incident)

        fetch(Config.API_URL + 'incidents/createincident', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'apiKey': Config.API_KEY
            },
            body: sendData
        })
        .then((response) => {
            return response.json()
        })
        .then((responseJson) => {

            if (createChat) {
                return MessagesService.createMessage(incident.iPrpId, incident.iUsrId, incident.sTitle, responseJson.iIncId)
            }

            return resolve()
        })
        .then(() => {
            return resolve()
        })
        .catch(reject);
    })

}

const getIncidents = function (iPrpId : string): Promise<array> {
    return new Promise((resolve, reject) => {

        var data = {
			iPrpId
		}

        var sendData = JSON.stringify(data)
        
        fetch(Config.API_URL + 'incidents/listincidents', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apiKey': Config.API_KEY
			},
			body: sendData
		})
		.then((response) => {
			return response.json()
		})
		.then((responseJson) => {
            console.log(responseJson)
			resolve(responseJson.incidents)
		})
		.catch(reject);
    })
}

const makePayment = function () {
    // https://api.idealhouseshare.com/CMS/PaymentLink.aspx?UsrId=xx&InaId=xx&Amount=xx
}


export default {
    logIncident,
    getIncidents
}