import React, { useMemo, useState } from 'react'
import { Calendar as CalendarComponent, momentLocalizer } from 'react-big-calendar'
import { isObject } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import { SELECT_MAINTENANCE_STATE } from 'store/selectors/maintenance-register.selector'
import messages from './messages.json'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es'
import MaintenanceRegisterDetails from 'components/maintenance-register-details'
import {
    CLEAN_CURRENT_MAINTENANCE_REGISTER,
    GET_CURRENT_MAINTENANCE_REGISTER,
} from 'store/actions/maintenance-register.actions'

moment.locale('es')

const localizer = momentLocalizer(moment)

const Calendar = (): React.ReactElement => {
    const [showDetails, setShowDetails] = useState<boolean>(false)
    const { registers, currentMaintenance } = useSelector(SELECT_MAINTENANCE_STATE)
    const dispatch = useDispatch()

    const eventsPerMachine = useMemo(
        () =>
            registers
                .map((register) =>
                    register.expectedDates.map((date) => ({
                        id: `register-${register.id}-${date}`,
                        title: isObject(register.machine) ? register.machine.name : '',
                        start: moment(date).toDate(),
                        end: moment(date).add('1', 'day').toDate(),
                        item: '',
                    })),
                )
                .flat(),
        [registers],
    )

    const handleSelection = (event: any) => {
        const idMatch = event.id.match(/register-[\d]{1,99}/g)
        if (idMatch) {
            const registerId = Number(idMatch[0].replace('register-', ''))
            dispatch(GET_CURRENT_MAINTENANCE_REGISTER({ id: registerId }))

            setTimeout(() => {
                setShowDetails(true)
            }, 200)
        }
    }

    const handleCloseDetails = () => {
        setShowDetails(false)

        setTimeout(() => {
            dispatch(CLEAN_CURRENT_MAINTENANCE_REGISTER())
        }, 300)
    }

    return (
        <>
            <div className="w-100 px-4 pb-5">
                <h3 className="mb-4">Calendario de mantenimientos</h3>
                <CalendarComponent
                    localizer={localizer}
                    events={eventsPerMachine}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 480 }}
                    messages={messages}
                    views={{ month: true, agenda: true }}
                    onSelectEvent={handleSelection}
                    popup
                />
            </div>

            <MaintenanceRegisterDetails
                show={showDetails}
                register={currentMaintenance}
                onClose={handleCloseDetails}
            />
        </>
    )
}

export default Calendar
