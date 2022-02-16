export const ROUTER_PATHS = {
    LOGIN: '/login',
    LOGOUT: '/logout',
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
        ROOT: '/colaboradores',
        ADD: '/colaboradores/crear',
        EDIT: '/colaboradores/editar/:id',
        SHOW: '/colaboradores/detalles/:id',
    },
    MAINTENANCE_REGISTER: {
        ROOT: '/registro-de-mantenimiento',
        ADD: '/registro-de-mantenimiento/crear',
        EDIT: '/registro-de-mantenimiento/editar/:id',
        SHOW: '/registro-de-mantenimiento/detalles/:id',
    },
    WORK_ORDER: {
        ROOT: '/ordenes-de-trabajo',
        ADD: '/ordenes-de-trabajo/crear',
        EDIT: '/ordenes-de-trabajo/editar/:id',
        SHOW: '/ordenes-de-trabajo/detalles/:id',
    },
    INVENTORY: {
        ROOT: '/inventario',
        ADD: '/inventario/crear',
        EDIT: '/inventario/editar/:id',
        SHOW: '/inventario/detalles/:id',
    },
    SETTINGS: {
        ROOT: '/ajustes',
    },
}
