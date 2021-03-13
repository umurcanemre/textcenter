import { readDDB2} from './connection/dynamo.js'
import { Text,getTextParam } from './domain/text.js'

const readDDB = function getText() { readDDB2(getTextParam(nt.label, nt.application)); }