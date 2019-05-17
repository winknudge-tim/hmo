import Config from '../configs'

import _ from 'lodash'

import constants from '../configs/constants'
const {
	TEMP_REG_LABEL,
	ORGANISATION_ID
} = constants


const tempDocuments = [
	{
		"DocumentId": "1",
		"Title": "Gas Safety Certificate",
		"PDF": "https://api.idealhouseshare.com/Files/5.pdf",
		"userHasSigned": "False",
		"userNeedsToSign": "False",
		"SignedDate": "1/1/2000 12:00:00 AM"
	},
	{
		"DocumentId": "2",
		"Title": "Tenancy Agreement",
		"PDF": "https://api.idealhouseshare.com/Files/6.pdf",
		"userHasSigned": "False",
		"userNeedsToSign": "True",
		"SignedDate": "1/2/2018 12:00:00 AM"
	}
]


const getDocuments = function getDocumentsFromServer (iPrpId, iTcyId) {

	return new Promise (function (resolve, reject) {
		var data = {
			iPrpId,
			iTcyId,
			iOrgId: 3
		}

		fetch(Config.API_URL + 'documents/listdocuments', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apiKey': Config.API_KEY
			},
			body: JSON.stringify(data)
        }).then((response) => response.json())
            .then((responseJson) => {
                resolve(responseJson.documents)
            })
            .catch(function(error) {
				console.log(error)
				reject('register error')
			});

	})

}

const signDocument = function (iFilId, iDocId, iTcyId, sFile) {
	return new Promise (function (resolve, reject) {
		var data = {
			iFilId, 
			iDocId, 
			iTcyId, 
			sFile
		}

		fetch(Config.API_URL + 'documents/signdocument', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apiKey': Config.API_KEY
			},
			body: JSON.stringify(data)
        }).then((response) => response.json())
            .then((responseJson) => {
				console.log(responseJson)
                resolve()
            })
            .catch(function(error) {
				console.log(error)
				reject('register error')
			});

	})
}

export default {
	getDocuments,
	signDocument
}