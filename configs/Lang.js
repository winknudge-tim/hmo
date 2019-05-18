import _ from 'lodash'

var defaults = {};
var Lang = {}


var property = {};

var conversations = {}
var conversation = {}
var newConversation = {}
var documentListScene = {}
var documentScene = {}
var signDocument = {}
var calendar = {}
var event = {}
var products = {}
var product = {}
var incidents = {}
var incident = {}
var newIncident = {}
var profile = {}
var updateCardDetails = {}
var takePicure = {}
var currentAddress = {}
var checklist = {}

// Registration screen
var register = {}
var userDetails = {}
var confirmProfile = {}
var profilePicture = {}
var employment = {}
var guarantorEmployment = {}
var guarantor = {}
var selectProperty = {}
var registrationPaymentScene = {}
var registrationComplete = {}

defaults.firstName = "First name"
defaults.lastName = "Last name"
defaults.email = "Email"
defaults.phone = "Phone"
defaults.address = "aAddress"
defaults.address1 = "Address line 1"
defaults.address2 = "Address line 2"
defaults.city = "City"
defaults.county = "County"
defaults.postcode = "Postcode"
defaults.previousAddress = "Previous address"
//Buttons
defaults.login = "Login"
defaults.save = "Save"
defaults.next = "Next"
defaults.submit = "Submit"
defaults.register = "Register"
defaults.cancel = "Cancel"

// CHECKLIST
checklist.title = "Checklist"

// PROPERTY
property.title = "Property"

// CONVERSATIONS
conversations.title = "Conversations"

// CONVERSATION
conversation.title = "Conversation"

// NEW CONVERSATION
newConversation.title = "New"
newConversation.subject = "Subject"
newConversation.recipients = "Recipients"
newConversation.start = "Start conversation"

// Calendar
calendar.title = "Calendar"

// DOCUMENTS
documentListScene.title = "Documents"

// DOCUMENT
documentScene.title = "Document"
documentScene.sign = "Sign"

// SIGN DOCUMENT
signDocument.title = "Sign document"
signDocument.sign = "Sign"
signDocument.clear = "Clear"

// REGISTER
register.title = "Register"
register.instructions = "To register you will need a Facebook account."
register.facebookLogin = "Login with Facebook"


// USER DETAILS
userDetails.title = "Login details"
userDetails.instructions = "Enter a username and password you would like to use to login to the app"
userDetails.userName = 'Username'
userDetails.password = 'Password'

// CONFIRM PROFILE
confirmProfile.title = "Profile"
confirmProfile.instructions = "Confirm your details"
confirmProfile.dob = "Date of birth"

// PROFILE PICTURE
profilePicture.title = "Picture"
profilePicture.instructions = "Select the profile picture we should use"
profilePicture.btnTxt = "Choose image"
profilePicture.cropBtnTxt = "Choose image"

// employment
employment.title = "Employment"
employment.jobTitle = "Job title"
employment.annualEarnings = "Annual earnings"
employment.employer = "Employer"
employment.hrContact = "HR/Accountant Contact Name"
employment.hrPhoneNumber = "HR/Accountant Phone number"
employment.hrEmail = "HR/Accountant Email"

// guarantorEmployment
guarantorEmployment.instructions = "If known please enter the guarantors employment details"
guarantorEmployment.title = "Guarantor"
guarantorEmployment.jobTitle = "Job title"
guarantorEmployment.annualEarnings = "Annual earnings"
guarantorEmployment.employer = "Employer"
guarantorEmployment.hrContact = "HR/Accountant Contact Name"
guarantorEmployment.hrPhoneNumber = "HR/Accountant Phone number"
guarantorEmployment.hrEmail = "HR/Accountant Email"

// GUARANTOR
guarantor.title = "Guarantor"
guarantor.instructions = "Please tell us who will be your guarantor"

// SELECT PROPERTY
selectProperty.title = "Properties"

// REGISTER PAYMENT
registrationPaymentScene.title = "Payment"
registrationPaymentScene.makePayment = "Register and make payment"
registrationPaymentScene.paymentInstructions = "We will take a non refunable payment of £100 from you when your register"
registrationPaymentScene.nameOnCard = "Name on card"
registrationPaymentScene.cardNumber = "Card number"
registrationPaymentScene.securityNumber = "Security number"
registrationPaymentScene.expiryDate = "Expiry date"
registrationPaymentScene.accountNumber = "Account number"
registrationPaymentScene.sortCode = "Sort code"
registrationPaymentScene.cardType = "Card type"

// REGISTER COMPLETE
registrationComplete.title = "Registration Complete"
registrationComplete.message = "Thank you your registration is complete"

// PRODUCTS 
products.title = "Products"

// PRODUCT
product.title = "Product"
product.buy = "Buy"

// INCIDENTS
incidents.title = "Maintenance"
incidents.noIssues = "There are currently no logged maintenance issues, tap the plus to log an issue"

// INCIDENTS
incident.title = "Maintenance"

// NEW INCIDENT
newIncident.title = "New incident"
newIncident.furtherInfo = "Further info"
newIncident.description = "Description"
newIncident.priority = "Priority"
newIncident.location = "Location"
newIncident.media = "Media"
newIncident.addMedia = "Add media"
newIncident.create = "Report issue"
newIncident.cancelMsg = "Are you sure you wish to cancel?"
newIncident.successMsg = "Thank you, your issue has been logged"
newIncident.completeMsg = "Fanstastic! We glad we could help you solve the issue."
newIncident.completeBtnText = "All done"
newIncident.instruction = "As you have been unable to resolve the issue, please fill in the form below with as much information as possible and we will get back to you asap."

// PROFILE
profile.title = "Profile"
profile.logout = "Logout"
profile.updateCardDetails = "Update card details"

// TAKE PICTURE
takePicure.title = "Take picture"

currentAddress.title = "Address"
currentAddress.currentAddress = "Current address"
currentAddress.timeAtCurrentAddress = "Time at current address"
currentAddress.rentPaid = "Rent paid"
currentAddress.reasonsForLeaving = "Reasons for leaving"
currentAddress.landlordName = "Landlord name"
currentAddress.landlordPhone = "Landlord phone"
currentAddress.landlordEmail = "Landlord email"

updateCardDetails.title = "Card details"

function buildData(data) {

	return _.defaults(data, defaults)

}

Lang.property = buildData(property)
Lang.conversations = buildData(conversations)
Lang.conversation = buildData(conversation)
Lang.products = buildData(products)
Lang.product = buildData(product)
Lang.incidents = buildData(incidents)
Lang.incident = buildData(incident)
Lang.newIncident = buildData(newIncident)
Lang.newConversation = buildData(newConversation)
Lang.documentListScene = buildData(documentListScene)
Lang.documentScene = buildData(documentScene)
Lang.calendar = buildData(calendar)
Lang.event = buildData(event)
Lang.signDocument = buildData(signDocument)
Lang.register = buildData(register)
Lang.userDetails = buildData(userDetails)
Lang.confirmProfile = buildData(confirmProfile)
Lang.profilePicture = buildData(profilePicture)
Lang.guarantor = buildData(guarantor)
Lang.selectProperty = buildData(selectProperty)
Lang.registrationPaymentScene = buildData(registrationPaymentScene)
Lang.registrationComplete = buildData(registrationComplete)
Lang.profile = buildData(profile)
Lang.updateCardDetails = buildData(updateCardDetails)
Lang.takePicure = buildData(takePicure)
Lang.employment = buildData(employment)
Lang.guarantorEmployment = buildData(guarantorEmployment)
Lang.currentAddress = buildData(currentAddress)
Lang.checklist = buildData(checklist)


export default Lang;