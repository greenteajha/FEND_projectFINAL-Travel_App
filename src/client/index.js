import { handleSubmit } from './js/formHandler'
import { printPage } from './js/formHandler'
import { retrieveResults } from './js/formHandler'
import './styles/style.scss'

document.getElementById('retrieve').addEventListener('click', handleSubmit)
document.getElementById('printPage').addEventListener('click', printPage)