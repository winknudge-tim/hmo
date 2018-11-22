//import { AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'

// function getProfileAlbum(profilePictureAlbumID, accessToken, userID, success, fail) {

// 	function _responseInfoCallback(error: ?Object, result: ?Object) {
// 	  if (error) {
// 	    fail(error.toString())
// 	  } else {

// 	  	var pictures = result.data
// 	  	var profilePicLimit = (pictures.length > 3) ? 3 : pictures.length
// 	  	var toReturn = []

// 	  	for (var i = 0; i < profilePicLimit; i++) {
// 	  		toReturn.push(pictures[i].picture)
// 	  	}
	  	
// 	  	success(toReturn)
	   
// 	  }
// 	}

// 	const infoRequest = new GraphRequest(
// 	  '/' + profilePictureAlbumID + '/photos',
// 	  {
// 	  	accessToken: accessToken,
// 	  	limit: 2,
// 	  	parameters: {
// 			fields: {
// 				string: 'id, picture, created_time'
// 			}
// 	    }
// 	  },
// 	  _responseInfoCallback,
// 	);
// 	// Start the graph request.
// 	new GraphRequestManager().addRequest(infoRequest).start();

// }

// function _getProfilePictureAlbumID(accessToken, userID, success, fail) {

// 	function _responseInfoCallback(error: ?Object, result: ?Object) {
// 	  if (error) {
// 	    fail(error.toString())
// 	  } else {

// 	  	var profilePictureAlbumID = _.find(result.data, ['type', 'profile']);

// 	  	if (profilePictureAlbumID && profilePictureAlbumID.id) {
// 	  		success(profilePictureAlbumID.id)
// 	  	} else {
// 	  		fail("No profile picture album")
// 	  	}
	    

// 	  }
// 	}

// 	const infoRequest = new GraphRequest(
// 	  '/' + userID + '/albums',
// 	  {
// 	  	accessToken: accessToken,
// 	  	parameters: {
// 			fields: {
// 				string: 'id, name, type'
// 			}
// 	    }
// 	  },
// 	  _responseInfoCallback,
// 	);
// 	// Start the graph request.
// 	new GraphRequestManager().addRequest(infoRequest).start();

// }

// var getProfilePictures = function getProfilePicturesFromFacebook() {

// 	return new Promise (function (resolve, reject) {

// 		AccessToken.getCurrentAccessToken().then(
// 			(fbData) => {
			
// 				//fbData.accessToken, fbData.userID
// 				_getProfilePictureAlbumID(
// 					fbData.accessToken, 
// 					fbData.userID, 
// 					(profilePictureAlbumID) => {

// 						getProfileAlbum(profilePictureAlbumID, fbData.accessToken, fbData.userID, resolve, reject)

// 					}, 
// 					reject)

// 			},
// 			reject
// 		);

// 	})

// }

export default {
}