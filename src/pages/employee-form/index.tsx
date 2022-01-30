import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Card } from 'react-bootstrap'
import ContentForm from 'components/content-form'
import { get } from 'lodash'
import { employeeForm as form } from './formset'
import Masonry from 'react-masonry-css'
import PageTitle from 'components/page-title'
import { Link, useHistory, useParams } from 'react-router-dom'
import { TFormSet, TMachineryForm } from 'types/machinery'
import { SELECT_CURRENT_EMPLOYEE } from 'store/selectors/employee.selector'
import { useDispatch, useSelector } from 'react-redux'
import {
    CLEAN_CURRENT_EMPLOYEE,
    CREATE_EMPLOYEE,
    GET_CURRENT_EMPLOYEE,
    UPDATE_EMPLOYEE,
} from 'store/actions/employee.actions'
import { flattenForm, formIsValid } from 'utils/services'
import { ROUTER_PATHS } from 'app-constants/router-paths'
import { toast } from 'react-toastify'

const EmployeeFormPage = (): React.ReactElement => {
    const { id } = useParams<{ id: string | undefined }>()
    const [employeeForm, setEmployeeForm] = useState<TMachineryForm>(form)
    const [formLoaded, setFormLoaded] = useState<boolean>(false)
    const currentEmployee = useSelector(SELECT_CURRENT_EMPLOYEE)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleOnChange = (formset: TFormSet) => {
        const updatedFormsets = employeeForm.formsets.map((prevFormset) => {
            if (prevFormset.id === formset.id) {
                return { ...formset }
            }
            return { ...prevFormset }
        })

        setEmployeeForm((prev) => ({ ...prev, formsets: updatedFormsets }))
    }

    const handleSave = async () => {
        if (!formIsValid(employeeForm?.formsets || [])) {
            return
        }

        const data = flattenForm(employeeForm.formsets)

        if (id) {
            await dispatch(UPDATE_EMPLOYEE({ id: Number(id), data }))
        } else {
            await dispatch(CREATE_EMPLOYEE({ data }))
        }

        toast.success('Se guardó con éxito', { position: 'top-right' })

        history.push(ROUTER_PATHS.EMPLOYEES.ROOT)
    }

    useEffect(() => {
        if (id) {
            dispatch(GET_CURRENT_EMPLOYEE({ id: Number(id) }))
        }

        return () => {
            dispatch(CLEAN_CURRENT_EMPLOYEE())
        }
    }, [dispatch, id])

    useEffect(() => {
        if (currentEmployee && employeeForm && !formLoaded) {
            const formsets = employeeForm.formsets.map((formset) => ({
                ...formset,
                fields: formset.fields.map((field) => ({
                    ...field,
                    value: get(currentEmployee, field.name),
                })),
            }))

            setEmployeeForm((prev) => ({ ...prev, formsets }))
            setFormLoaded(true)
        }
    }, [currentEmployee, employeeForm, formLoaded])

    return (
        <div>
            <PageTitle title={id ? 'Editar Colaborador' : 'Agregar colaborador'}>
                <ButtonGroup>
                    <Button variant="warning" as={Link as any} to={ROUTER_PATHS.EMPLOYEES.ROOT}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Guardar
                    </Button>
                </ButtonGroup>
            </PageTitle>

            <Masonry
                breakpointCols={{ default: 2, 780: 1 }}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {employeeForm.formsets.map((formset) => (
                    <Card>
                        <Card.Header className="machinery-card-header">{formset.title}</Card.Header>
                        <Card.Body>
                            <ContentForm form={formset} onChange={handleOnChange} hideTitle />
                        </Card.Body>
                    </Card>
                ))}
            </Masonry>
        </div>
    )
}

export default EmployeeFormPage
