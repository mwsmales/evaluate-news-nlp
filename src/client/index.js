import { checkForName } from './js/nameChecker'
import { handleSubmitGetApi } from './js/formHandler'
import { handleSubmitPOST } from './js/formHandler'
import { handleSubmit } from './js/formHandler'
import { meaningCloudGet } from './js/formHandler'

import './styles/resets.scss'
import './styles/base.scss'
import './styles/header.scss'
import './styles/form.scss'
import './styles/footer.scss'


console.log("Page reloaded...");

export { 
    checkForName,
    handleSubmitGetApi,
    handleSubmitPOST,
    handleSubmit,
    meaningCloudGet
}