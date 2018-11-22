import Config from '../configs'

const fetchProperties = function () {

    return new Promise (function (resolve, reject) {

        fetch(Config.API_URL + 'property/listproperties', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'apiKey': Config.API_KEY
            }
        }).then((response) => response.json())
              .then((responseJson) => {

                resolve(responseJson.properties)

                })
              .catch(reject);

    })

}

export default {
    fetchProperties
}