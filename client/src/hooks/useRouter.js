import { useContext } from 'react'
import { __RouterContext } from 'react-router-dom'

export const useRouter = () => useContext(__RouterContext)
