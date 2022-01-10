import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './reducers/auth'
import { configReducer } from './reducers/config.reducer'
import { machineryReducer } from './reducers/machinery.reducer'
import { navigationReducer } from './reducers/navigation'
import { employeeReducer } from './reducers/employee.reducer'
import maintenanceRegisterReducer from './reducers/maintenance-register.reducer'
import workOrderReducer from './reducers/work-order.reducer'
import inventoryReducer from './reducers/inventory.reducer'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        navigation: navigationReducer,
        config: configReducer,
        machinery: machineryReducer,
        employee: employeeReducer,
        maintenanceRegister: maintenanceRegisterReducer,
        workOrder: workOrderReducer,
        inventory: inventoryReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
