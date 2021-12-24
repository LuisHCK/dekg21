const API_ROUTES = {
    AUTH_LOGIN: '/auth/local',
    MACHINERY: {
        ROOT: '/machines',
        BY_ID: (id?: number) => `/machines/${id}`,
    },
    USER: {
        ROOT: '/api/v1/users/',
        PROFILE: '/api/v1/users/profile',
        BY_ID: (id: string | number) => `/api/v1/users/${id}`,
    },
    EMPLOYEES: {
        ROOT: '/employees',
        BY_ID: (id: string | number) => `/employees/${id}`,
    },
    CONFIG: '/api/v1/config',
    ASSETS: {
        ROOT: '/upload',
    },
}

export default API_ROUTES
