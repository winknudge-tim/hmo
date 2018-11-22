import React from 'react';


import { Actions, Scene, ActionConst, Stack, Modal } from 'react-native-router-flux';

import Lang from './configs/Lang';

//Text.defaultProps.allowFontScaling = false;
/*
  Load screens
 */

// Property
import PropertyScene from './scenes/Property.scene'

// Messaging
import ConversationsScene from './scenes/messaging/Conversations.scene'
import ConversationScene from './scenes/messaging/Conversation.scene'
import NewConversationScene from './scenes/messaging/New-conversation.scene'

// Incidents

// Products
import ProductsScene from './scenes/products/Products.scene'
import ProductScene from './scenes/products/Product.scene'

//IncidentsScene
import IncidentsScene from './scenes/incidents/List.scene'
import IncidentScene from './scenes/incidents/Incident.scene'
import IncidentFaqScene from './scenes/incidents/Faq.scene'
import NewIncidentScene from './scenes/incidents/New-Incident.scene'

// Documents
import DocumentListScene from './scenes/documents/List.scene'
import DocumentScene from './scenes/documents/Document.scene'
import SignDocumentScene from './scenes/documents/Sign.scene'

// ChecklistScene
import ChecklistScene from './scenes/checklist/checklist.scene'

// CalendarScene
import CalendarScene from './scenes/calendar/Calendar.scene'

// REGISTRATION
import RegisterScene from './scenes/registration/Register.scene'
import RegisterSteps from './scenes/registration/Steps.scene'
import UserDetailsScene from './scenes/registration/UserDetails.scene'
import ConfirmProfile from './scenes/registration/Confirm-profile.scene'
import ProfilePictureScene from './scenes/registration/Profile-picture.scene'
import EmploymentScene from './scenes/registration/Employment.scene'
import GuarantorScene from './scenes/registration/Guarantor.scene'
import GuarantorEmployment from './scenes/registration/GuarantorEmployment.scene'
import SelectPropertyScene from './scenes/registration/Select-property.scene'
import RegistrationCompleteScene from './scenes/registration/Complete.scene'
import RegistrationPaymentScene from './scenes/registration/Payment.scene'
import PreviousAddressesScene from './scenes/registration/PreviousAddresses.scene'
import IncidentFaqAnswer from './scenes/incidents/FaqAnswer.scene'

// PROFILE
import ProfileScene from './scenes/profile/Profile.scene'
import CardDetailsScene from './scenes/profile/Card-details.scene'

//<Scene type={ActionConst.RESET} key="registerScene" component={ RegisterScene } Lang={Lang}  />
const Scenes = Actions.create(
  <Scene key="root" hideNavBar={true}>
    <Stack  key='register' type={ActionConst.RESET} hideNavBar={true}>
      <Scene key="reigsterSteps" component={ RegisterSteps } Lang={Lang} />
      
      <Scene key="userDetailsScene" component={ UserDetailsScene } Lang={Lang} />
      <Scene key="profilePictureScene" component={ ProfilePictureScene } Lang={Lang} />
      <Scene key="confirmProfile" component={ ConfirmProfile } Lang={Lang} />
      <Scene key="employmentScene" component={ EmploymentScene } Lang={Lang} />
      <Scene key="previousAddressesScene" component={ PreviousAddressesScene } Lang={Lang} />
      <Scene key="guarantorScene" component={ GuarantorScene } Lang={Lang} />
      <Scene key="guarantorEmploymentScene" component={ GuarantorEmployment } Lang={Lang} />
      <Scene key="selectPropertyScene" component={ SelectPropertyScene } Lang={Lang} />
      <Scene key="registrationPaymentScene" component={ RegistrationPaymentScene } Lang={Lang} />
      <Scene key="registrationCompleteScene" component={ RegistrationCompleteScene } Lang={Lang} />
    </Stack>
    <Stack  key='main' type={ActionConst.RESET} hideNavBar={true}>
      <Scene key="propertyScene" component={ PropertyScene } Lang={Lang} />
      <Scene key="conversationsScene" component={ ConversationsScene } Lang={Lang} />
      <Scene key="conversationScene" component={ ConversationScene } Lang={Lang} />
      <Scene key="newConversationScene" component={ NewConversationScene } Lang={Lang} />

      <Scene key="profileScene" component={ ProfileScene } Lang={Lang} />
      <Scene key="cardDetailsScene" component={ CardDetailsScene } Lang={Lang} />

      <Scene key="productsScene" component={ ProductsScene } Lang={Lang} />
      <Scene key="productScene" component={ ProductScene } Lang={Lang} />
      
      <Scene  key="incidentsScene" component={ IncidentsScene } Lang={Lang} />
      <Scene  key="incidentFaqScene" component={ IncidentFaqScene } Lang={Lang} />
      <Scene key="incidentFaqAnswer" component={ IncidentFaqAnswer } Lang={Lang} />
      
      <Scene key="incidentScene" component={ IncidentScene } Lang={Lang} />
      <Scene  key="newIncidentScene" component={ NewIncidentScene } Lang={Lang} />

      <Scene key="documentListScene" component={ DocumentListScene } Lang={Lang} />
      <Scene key="documentScene" component={ DocumentScene } Lang={Lang} />
      <Scene  key="signDocumentScene" component={ SignDocumentScene } Lang={Lang} />

      <Scene key="calendarScene" component={ CalendarScene } Lang={Lang} />

      <Scene key="checklistScene" component={ChecklistScene} Lang={Lang} />
      <Scene key="profileScene" component={ ProfileScene } Lang={Lang} />
    </Stack>
  </Scene>
)

export default Scenes
