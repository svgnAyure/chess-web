// React-hook som gir tilgang til applikasjonens router.
// Dette gir alle komponenter tilgang til parametre i URL.

import { useContext } from 'react'
import { __RouterContext } from 'react-router-dom'

export const useRouter = () => useContext(__RouterContext)
