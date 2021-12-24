import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Masonry from 'react-masonry-css'
import { Card, ListGroup } from 'react-bootstrap'
import PageTitle from 'components/page-title'
import { useDispatch, useSelector } from 'react-redux'
import { SET_CURRENT_MACHINE } from 'store/actions/machine.actions'
import { SELECT_CURRENT_MACHINE } from 'store/selectors/machinery.selector'
import { ROUTER_PATHS } from 'app-constants/router-paths'
import { getAssetPath, getRouteWithParams } from 'utils/services'
import machineForm from 'pages/machine-form/slides'
import { get } from 'lodash'
import { TFormField } from 'types/machinery'
import { TAsset } from 'types/asset'
import './styles.scss'

const MachineryDetailsPage = (): React.ReactElement => {
    const { id } = useParams<{ id: string }>()
    const dispatch = useDispatch()
    const currentMachine = useSelector(SELECT_CURRENT_MACHINE)

    useEffect(() => {
        dispatch(SET_CURRENT_MACHINE(Number(id)))
    }, [dispatch, id])

    const renderField = (formfield: TFormField) => {
        const fieldData: TAsset | string | number | undefined = get(currentMachine, formfield.name)

        if (fieldData && typeof fieldData === 'object') {
            return (
                <img
                    className="w-100 h-auto"
                    src={getAssetPath(fieldData?.url)}
                    alt={currentMachine?.name}
                />
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

    return (
        <div className="container-fluid">
            <PageTitle title={currentMachine?.name}>
                <Link
                    to={getRouteWithParams(ROUTER_PATHS.MACHINERY.EDIT, [{ key: 'id', value: id }])}
                >
                    <button className="btn btn-primary">Editar</button>
                </Link>
            </PageTitle>

            <Masonry
                breakpointCols={{ default: 2, 780: 1 }}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {machineForm.formsets.map((formset) => (
                    <Card key={formset.id}>
                        <Card.Header className="machinery-card-header">{formset.title}</Card.Header>

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

export default MachineryDetailsPage
