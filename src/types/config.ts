export interface ICompany {
    _id: string
    name: string
    logo: string
    email: string
    phone: string
    legalId: string
}

export interface IConfig {
    company: ICompany
}
