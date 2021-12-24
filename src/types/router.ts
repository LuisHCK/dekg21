export interface IRouterItem {
    path: string
    component: React.FunctionComponent
    exact?: boolean
    isPublic?: boolean
}