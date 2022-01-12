import React, { useEffect, useMemo, useState } from 'react'
import { Button, Col, FormControl, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { GET_ALL_PARTS } from 'store/actions/inventory.actions'
import { SELECT_INVENTORY_STATE } from 'store/selectors/inventory.selector'
import { TPart } from 'types/inventory'
import { TWorkOrderPartUsed } from 'types/work-order'
import { randomNumber } from 'utils/services'
import { ReactComponent as IconTrash } from 'bootstrap-icons/icons/trash.svg'

type TPartsSelectProps = {
    partsUsed: TWorkOrderPartUsed[]
    onChange: (data: TWorkOrderPartUsed[]) => void
}

type TSelectOption = {
    label: string
    value?: string
}

const PartsSelect = (props: TPartsSelectProps): React.ReactElement => {
    const [partsUsed, setPartsUsed] = useState<TWorkOrderPartUsed[]>(props.partsUsed)
    const { parts } = useSelector(SELECT_INVENTORY_STATE)
    const dispatch = useDispatch()

    const getPartName = (part?: Partial<TPart>) => `${part?.name} - ${part?.content}${part?.unit}`

    const handleSelection = (partId: number | string | undefined, selection: TSelectOption) => {
        const partInstance = parts?.find((p) => p.id === Number(selection.value))

        if (partId && partInstance) {
            const updatedParts = partsUsed?.map((partUsed) => {
                if (partUsed.id === partId || partUsed._tempId === partId) {
                    return {
                        ...partUsed,
                        part: partInstance,
                    }
                }
                return { ...partUsed }
            })

            setPartsUsed(updatedParts)
            props.onChange(updatedParts)
        }
    }

    const handleQuantityChange = (partId: number | undefined, value: number) => {
        if (partId) {
            const updatedParts = partsUsed?.map((partUsed) => {
                if (partUsed.id === partId || partUsed._tempId === partId) {
                    return {
                        ...partUsed,
                        quantity: value,
                    }
                }
                return { ...partUsed }
            })

            setPartsUsed(updatedParts)
            props.onChange(updatedParts)
        }
    }

    const addPart = () => {
        const updatedParts = [
            ...partsUsed,
            { _tempId: randomNumber(), part: { id: 0 }, quantity: 0 },
        ]
        setPartsUsed(updatedParts)
        props.onChange(updatedParts)
    }

    const removePart = (partId?: number) => {
        const updatedParts = partsUsed.filter((part) => part.id !== partId)
        setPartsUsed(updatedParts)
        props.onChange(updatedParts)
    }

    const partsOptions = useMemo(
        () =>
            parts?.map((part) => ({
                value: part.id,
                label: getPartName(part),
            })),
        [parts],
    )

    const renderPartForm = (partUsed?: TWorkOrderPartUsed) => (
        <Row>
            <Col xs={12} sm={4}>
                <Select
                    options={partsOptions || []}
                    placeholder="Seleccione un repuesto"
                    value={
                        partUsed
                            ? { value: partUsed.id, label: getPartName(partUsed.part) }
                            : undefined
                    }
                    onChange={(val: any) => handleSelection(partUsed?.id || partUsed?._tempId, val)}
                />
            </Col>

            <Col xs={12} sm={4}>
                <FormControl
                    type="number"
                    placeholder="Cantidad"
                    min={0}
                    step={1}
                    value={partUsed?.quantity}
                    onChange={({ currentTarget: { value } }) =>
                        handleQuantityChange(partUsed?.id || partUsed?._tempId, Number(value))
                    }
                />
            </Col>

            <Col xs={12} sm={4} className="text-left">
                <Button variant="warning" onClick={() => removePart(partUsed?.id)}>
                    <IconTrash />
                </Button>
            </Col>
        </Row>
    )

    useEffect(() => {
        dispatch(GET_ALL_PARTS())
    }, [dispatch])

    return (
        <div className="w-100 mb-3">
            <div className="form-label">Repuestos utilizados</div>

            {partsUsed.map((part) => (
                <div className="mb-2" key={`part-item-${part.id || part._tempId}`}>
                    {renderPartForm(part)}
                </div>
            ))}

            <div className="mt-2">
                <Button type="button" variant="info" onClick={addPart}>
                    Agregar repuesto +
                </Button>
            </div>
        </div>
    )
}

export default PartsSelect
