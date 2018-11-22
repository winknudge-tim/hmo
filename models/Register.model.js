import { AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'

var RegisterModel = {}

var user = {
	registrationComplete: false,
	details: {}
}

RegisterModel.saveTemp = function () {

	return new Promise(function(resolve, reject) {
	// do a thing, possibly async, then…

		if (type) {

			var tData = [
				{ date: new Date('2018-01-18T23:55:00'), flights: ['test']  }
			];

			setTimeout(() => { resolve(tData); }, 500)
			
		}
		else {
			reject("create is broke");
		}

	});

}

RegisterModel.hasFBAccessToken = function () {

	return new Promise (function (resolve, reject) {

		AccessToken.getCurrentAccessToken().then(
			(fbData) => {
				resolve({
					fb: fbData,
					user: user
				})
			},
			(error) => {
				console.log('Error');
				reject(error)
			}
		);


	})

}

RegisterModel.loginWithFacebook = function () {

	return new Promise (function (resolve, reject) {

		LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_photos', 'user_likes', 'user_work_history']).then(
            resolve,
            reject
          );

	})

}

RegisterModel.logOutOfFacebook = function () {

	LoginManager.logOut()

}

function _getFacebookUser (accessToken, userID) {

	return new Promise (function (resolve, reject) {

		function _responseInfoCallback(error: ?Object, result: ?Object) {
		  if (error) {
		    reject(error.toString())
		  } else {
		    resolve(result)
		  }
		}

		const infoRequest = new GraphRequest(
		  '/me',
		  {
		  	accessToken: accessToken,
		  	parameters: {
				fields: {
					string: 'id, first_name, last_name, email, birthday, gender'
				}
		    }
		  },
		  _responseInfoCallback,
		);
		// Start the graph request.
		new GraphRequestManager().addRequest(infoRequest).start();

	})

}

RegisterModel.getFacebookUser = function () {

	return new Promise (function (resolve, reject) {

		AccessToken.getCurrentAccessToken().then(
			(fbData) => {
			
				_getFacebookUser(fbData.accessToken, fbData.userID).then(
					(result) => {

						resolve(result)

					},
					reject
				)

			},
			reject
		);	

	})


}

export default RegisterModel 