import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Card, Button, Carousel } from 'react-bootstrap'
import PageTitle from 'components/page-title'
import ContentForm from 'components/content-form'
import machineFormSlides from './slides'
import { TFormSet, TMachineryForm } from 'types/machinery'
import {
    CLEAN_CURRENT_MACHINE,
    SET_CURRENT_MACHINE,
    SUBMIT_MACHINERY_FORM,
    UPDATE_MACHINERY_FORM,
} from 'store/actions/machine.actions'
import { flattenForm, getRouteWithParams } from 'utils/services'
import { SELECT_MACHINERY_STATE } from 'store/selectors/machinery.selector'
import { get } from 'lodash'
import { ROUTER_PATHS } from 'app-constants/router-paths'
import { toast } from 'react-toastify'

const MachineryFormPage = (): React.ReactElement => {
    const { id } = useParams<{ id: string | undefined }>()
    const { loading, currentMachine } = useSelector(SELECT_MACHINERY_STATE)
    const [currentFormIndex, setCurrentFormIndex] = useState<number>(0)
    const [machineryForm, setMachineryForm] = useState<TMachineryForm>({ ...machineFormSlides })
    const [disableNext, setDisableNext] = useState<boolean>(true)
    const [dataLoaded, setDataLoaded] = useState<boolean>(false)
    const history = useHistory()

    const dispatch = useDispatch()
    const handleOnChange = (formset: TFormSet) => {
        const updatedFormsets = machineryForm.formsets.map((prevFormset) => {
            if (prevFormset.id === formset.id) {
                return { ...formset }
            }
            return { ...prevFormset }
        })

        setMachineryForm((prev) => ({ ...prev, formsets: updatedFormsets }))
    }

    const isLastForm = () => currentFormIndex === machineryForm.formsets.length - 1

    const handleClickNext = () => {
        if (currentFormIndex < machineryForm.formsets.length - 1) {
            setCurrentFormIndex(currentFormIndex + 1)
        }

        if (currentFormIndex === machineryForm.formsets.length - 1) {
            onSubmit()
        }
    }

    const handleClickPrev = () => {
        if (currentFormIndex > 0) {
            setCurrentFormIndex(currentFormIndex - 1)
        }
    }

    const onSubmit = () => {
        const postBody = flattenForm(machineryForm.formsets)
        dispatch(
            id
                ? UPDATE_MACHINERY_FORM({ ...postBody, id: Number(id) })
                : SUBMIT_MACHINERY_FORM(postBody),
        )
        setTimeout(() => {
            if (currentMachine?.id) {
                history.push(
                    getRouteWithParams(ROUTER_PATHS.MACHINERY.SHOW, [
                        { key: 'id', value: currentMachine.id },
                    ]),
                )
            } else {
                history.push(ROUTER_PATHS.MACHINERY.ROOT)
            }
            toast.success('Se guardó con éxito', { position: 'top-right' })
        }, 300)
    }

    useEffect(() => {
        const currentFormset: TFormSet = machineryForm.formsets[currentFormIndex]

        const isValid = currentFormset.fields.every((field) =>
            field.required ? !!field.value : true,
        )
        setDisableNext(!isValid)
    }, [machineryForm.formsets, currentFormIndex])

    useEffect(() => {
        if (id) {
            dispatch(SET_CURRENT_MACHINE(parseInt(id)))
        }
    }, [id, dispatch])

    useEffect(() => {
        if (currentMachine && machineryForm && !dataLoaded) {
            const formsets = machineryForm.formsets.map((formset) => ({
                ...formset,
                fields: formset.fields.map((field) => ({
                    ...field,
                    value: get(currentMachine, field.name),
                })),
            }))

            setMachineryForm((prev) => ({ ...prev, formsets }))
            setDataLoaded(true)
        }
    }, [currentMachine, machineryForm, dataLoaded])

    useEffect(() => {
        return () => {
            setMachineryForm(machineFormSlides)
            dispatch(CLEAN_CURRENT_MACHINE())
        }
    }, [dispatch])

    return (
        <div className="container-fluid">
            <PageTitle title={id ? 'Editar maquinaria' : 'Registrar nueva maquinaria'} />

            <Card>
                <Card.Body>
                    <Carousel
                        activeIndex={currentFormIndex}
                        controls={false}
                        indicators={false}
                        keyboard={false}
                        touch={false}
                        interval={null}
                    >
                        {machineryForm.formsets.map((formset) => (
                            <Carousel.Item key={`form-slide-${formset.id}`}>
                                <ContentForm form={formset} onChange={handleOnChange} />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Card.Body>

                <Card.Footer className="d-flex justify-content-between">
                    <Button
                        variant="secondary"
                        onClick={handleClickPrev}
                        disabled={currentFormIndex === 0}
                    >
                        Regresar
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleClickNext}
                        disabled={disableNext || loading}
                    >
                        {isLastForm() ? 'Guardar' : 'Continuar'}
                    </Button>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default MachineryFormPage
