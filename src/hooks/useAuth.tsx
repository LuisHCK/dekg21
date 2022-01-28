const userString = localStorage.getItem('currentUser')

const useAuth = () => {
    const currentUser = userString ? JSON.parse(userString) : undefined

    return !!currentUser?.id
}

export default useAuth
