import { ROUTER_PATHS } from 'app-constants/router-paths'
import classNames from 'classnames'
import PageTitle from 'components/page-title'
import { get } from 'lodash'
import { employeeForm } from 'pages/employee-form/formset'
import React, { useEffect } from 'react'
import { Button, Card, ListGroup } from 'react-bootstrap'
import Masonry from 'react-masonry-css'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { CLEAN_CURRENT_EMPLOYEE, GET_CURRENT_EMPLOYEE } from 'store/actions/employee.actions'
import { SELECT_CURRENT_EMPLOYEE } from 'store/selectors/employee.selector'
import { TAsset } from 'types/asset'
import { TFormField } from 'types/machinery'
import { getAssetPath, getRouteWithParams } from 'utils/services'
import styles from './styles.module.scss'

const EmployeeDetailsPage = (): React.ReactElement => {
    const { id } = useParams<{ id: string }>()
    const dispatch = useDispatch()
    const currentEmployee = useSelector(SELECT_CURRENT_EMPLOYEE)

    const renderField = (formfield: TFormField) => {
        const fieldData: TAsset | string | number | undefined = get(currentEmployee, formfield.name)

        if (formfield.inputKind === 'file') {
            const data = typeof fieldData === 'object' ? fieldData : undefined

            return (
                <div className="d-flex justify-content-center">
                    <img
                        className={classNames('img-thumbnail', styles.avatar)}
                        src={data?.url ? getAssetPath(data.url) : '/img/default-avatar.jpg'}
                        alt={currentEmployee?.firstName}
                    />
                </div>
            )
        } else {
            return (
                <div>
                    <b>{formfield.label}: </b>
                    <span>{fieldData || '-'}</span>
                </div>
            )
        }
    }

    useEffect(() => {
        if (id) {
            dispatch(GET_CURRENT_EMPLOYEE({ id }))
        }

        return () => {
            dispatch(CLEAN_CURRENT_EMPLOYEE())
        }
    }, [dispatch, id])

    return (
        <div>
            <PageTitle title="Detalles del empleado">
                <Button
                    as={Link as any}
                    to={getRouteWithParams(ROUTER_PATHS.EMPLOYEES.EDIT, [{ key: 'id', value: 1 }])}
                    variant="primary"
                >
                    Editar empleado
                </Button>
            </PageTitle>

            <Masonry
                breakpointCols={{ default: 2, 780: 1 }}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {employeeForm.formsets.map((formset) => (
                    <Card key={formset.id}>
                        <Card.Header className="app-card-header">{formset.title}</Card.Header>

                        <Card.Body>
                            <ListGroup variant="flush">
                                {formset.fields.map((field) => (
                                    <ListGroup.Item key={`field-${field.name}`}>
                                        {renderField(field)}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                ))}
            </Masonry>
        </div>
    )
}

export default EmployeeDetailsPage
