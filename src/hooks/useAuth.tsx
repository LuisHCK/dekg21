import { useEffect, useState } from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { GET_AUTH_STATE } from 'store/selectors/auth'

const useAuth = () => {
    const { tokenExpiresAt } = useSelector(GET_AUTH_STATE)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        moment(tokenExpiresAt) > moment(new Date()),
    )

    useEffect(() => {
        const tokenValid = moment(tokenExpiresAt) > moment(new Date())
        setIsAuthenticated(tokenValid)
    }, [tokenExpiresAt])

    return isAuthenticated
}

export default useAuth
