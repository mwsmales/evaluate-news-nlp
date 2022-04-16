import { checkFormInput } from './js/formChecker'
import { getApiKey } from './js/formHandler'
import { postSentiment } from './js/formHandler'
import { handleSubmit } from './js/formHandler'
import { meaningCloudGet } from './js/formHandler'
import { updateUI } from './js/formHandler'

import './styles/resets.scss'
import './styles/base.scss'
import './styles/header.scss'
import './styles/main.scss'
import './styles/form.scss'
import './styles/footer.scss'

// register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(registration => {
        console.log('SW registered: ', registration);
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }

export { 
    checkFormInput,
    getApiKey,
    postSentiment,
    handleSubmit,
    meaningCloudGet,
    updateUI
}