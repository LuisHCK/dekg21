import React from 'react'
import { Table } from 'react-bootstrap'
import { TWorkOrderPartUsed } from 'types/work-order'

type TProps = {
    partsUsed?: TWorkOrderPartUsed[]
    total: number
}

const PartsUsed = ({ partsUsed, total }: TProps): React.ReactElement => {
    return (
        <Table>
            <thead>
                <tr>
                    <th>Repuesto</th>
                    <th>Cantidad</th>
                    <th>Precio Unit.</th>
                    <th>Sub Total</th>
                </tr>
            </thead>

            <tbody>
                {partsUsed?.map((partUsed) => (
                    <tr key={`part-used-${partUsed._tempId}`}>
                        <td>
                            <div>
                                {partUsed.part?.name} {partUsed.part?.content}
                                {partUsed.part?.unit}
                            </div>
                            <small>{partUsed.part?.brand}</small>
                        </td>
                        <td className="text-center">{partUsed.quantity}</td>
                        <td className="text-center">C${partUsed.part?.price}</td>
                        <td className="text-center fw-bold">
                            C${Number(partUsed.part?.price) * Number(partUsed.quantity)}
                        </td>
                    </tr>
                ))}
                {!!partsUsed?.length && (
                    <tr>
                        <td colSpan={3} className="text-end">
                            TOTAL:
                        </td>
                        <td className="fw-bold text-center">C${total}</td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
}

PartsUsed.defaultProps = {
    partsUsed: [],
}

export default PartsUsed
