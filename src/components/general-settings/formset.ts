import { TFormSet } from 'types/machinery'

export const formset: TFormSet = {
    id: 'general-settings',
    title: 'Ajustes generales',
    fields: [
        { label: 'Nombre de la empresa', name: 'companyName', nativeType: 'text', required: true },
        { label: 'Dirección', name: 'address', colProps: { xs: 12, sm: 6 }, nativeType: 'text' },
        { label: 'Teléfono', name: 'phone', colProps: { xs: 12, sm: 6 }, nativeType: 'text' },
        {
            label: 'Logo',
            name: 'logo',
            nativeType: 'file',
            inputHTMLType: 'file',
            colProps: { xs: 12, sm: 6 },
        },
    ],
}
