import React from 'react'
import { Calendar as CalendarComponent, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import messages from './messages.json'

moment.locale('es')

const localizer = momentLocalizer(moment)

const Calendar = (): React.ReactElement => {
    return (
        <div className="w-100 px-4 pb-5">
            <h3 className="mb-4">Calendario de mantenimientos</h3>
            <CalendarComponent
                localizer={localizer}
                events={[]}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 480 }}
                messages={messages}
            />
        </div>
    )
}

export default Calendar
