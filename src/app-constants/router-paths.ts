export const ROUTER_PATHS = {
    LOGIN: '/login',
    HOME: {
        ROOT: '/',
        ALT: '/inicio',
    },
    MACHINERY: {
        ROOT: '/maquinaria',
        ADD: '/maquinaria/crear',
        EDIT: '/maquinaria/editar/:id',
        SHOW: '/maquinaria/detalles/:id',
    },
    EMPLOYEES: {
        ROOT: '/empleados',
        ADD: '/empleados/crear',
        EDIT: '/empleados/editar/:id',
        SHOW: '/empleados/detalles/:id',
    },
    MAINTENANCE_ORDERS: {
        ROOT: '/ordenes-de-mantenimiento',
    },
}
