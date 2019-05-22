
import Config from '../configs'

var issuesExample = {
    "issues": [
        {
            "label": "Boiler",
            "path": "boiler",
            "iInaId": 63
        },
        {
            "label": "Appliances",
            "path": "appliances",
            "iInaId": 63
        },
        {
            "label": "Leak",
            "path": "leak",
            "iInaId": 63
        },
        {
            "label": "Internet",
            "path": "internet",
            "iInaId": 63
        }
    ]
}

const getOptions = function (propId) {

    return new Promise((resolve, reject) =>{

        resolve(issuesExample.issues)

    })

}

const getQuestions = function (propId, iInaId) {

    return new Promise((resolve, reject) => {

        var sendData = JSON.stringify({
            iOrgId: "3",
	        iPrpId: "1",
            iInaId
        })

        fetch(Config.API_URL + 'incidents/workflows', {
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
            return resolve(responseJson)
        })
        .catch(reject);

    })

}


export default {
    getOptions,
    getQuestions
}

var newIssue = {
    "label": "New issue",
    "paths": {
        "action": "report"
    }
}

var boiler = {
    "label": "Boiler",
    "paths": {
        "question": "What is your issue?",
        "responses": [
            {
                "response": "No hot water And no heating",
                "question": "Is the boiler pressure below 1 bar?",
                "hint_text": "You can find the pressure bar underneath your boiler",
                "hint_image": "https://via.placeholder.com/500x500",
                "responses": [
                    {
                        "response": "Yes",
                        "instruction": "Watch the video on how to top up your pressure",
                        "link": "https://www.youtube.com/watch?v=TSXEm3vURp8",
                        "question": "Did it resolve the problem?",
                        "responses": [
                            {
                                "response": "Yes",
                                "action": "complete"
                            },
                            {
                                "response": "No",
                                "action": "report"
                            }
                        ]
                    },
                    {
                        "response": "No",
                        "question": "Is there money on the meters?",
                        "responses": [
                            {
                                "response": "Yes",
                                "question": "Is there power to the boiler?",
                                "responses": [
                                    {
                                        "response": "Yes",
                                        "question": "Are there any error codes showing?",
                                        "responses": [
                                            {
                                                "response": "Yes",
                                                "action": "complete",
                                                "doHideSuccessMsg": true,
                                                "hint": "Make note of this",
                                                "instruction": "Call British Gas on 03332008899 (option 4) to book appointment and inform them all checks were completed. Our Policy is under Vesta Asset Management; use your house number and postcode."
                                            },
                                            {
                                                "response": "No",
                                                "action": "complete",
                                                "doHideSuccessMsg": true,
                                                "hint": "Not all boilder are digital so may not show an error code",
                                                "instruction": "Call British Gas on 03332008899 (option 4) to book appointment and inform them all checks were completed. Our Policy is under Vesta Asset Management; use your house number and postcode."
                                            }
                                        ]
                                    },
                                    {
                                        "response": "No",
                                        "instruction": "Check the wall switch and the fuse box that is located under the stairs",
                                        "hint_text": "The wall switch is...",
                                        "hint_image": "https://via.placeholder.com/500x500"
                                    }
                                ]
                            },
                            {
                                "response": "No",
                                "instruction": "Please top up the meter and reset the boiler"
                            }
                        ]
                    }
                ]
            },
            {
                "response": "No heating"
            },
            {
                "response": "No hot water"
            }
        ]
    }
}