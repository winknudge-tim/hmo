// import { AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'

hasFBAccessToken = function () {

	return new Promise (function (resolve, reject) {

		// AccessToken.getCurrentAccessToken().then(
		// 	(fbData) => {
		// 		resolve({
		// 			fb: fbData
		// 		})
		// 	},
		// 	(error) => {
		// 		console.log('Error');
		// 		reject(error)
		// 	}
		// );


	})

}

loginWithFacebook = function () {

	return new Promise (function (resolve, reject) {
		console.log('logInWithReadPermissions')
		LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_photos', 'user_likes']).then(
            resolve,
            reject
          );

	})

}

logOutOfFacebook = function () {

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

getFacebookUser = function () {

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

export default {
	hasFBAccessToken,
	loginWithFacebook,
	logOutOfFacebook,
	getFacebookUser
}