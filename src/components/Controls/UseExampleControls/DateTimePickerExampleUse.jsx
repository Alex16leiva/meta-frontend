import React from 'react'
import { useState } from 'react';
import { DateTimePickerControl } from '../TimePickerControl';

export const DateTimePickerExampleUse = () => {
    const [selectedDateTime, setSelectedDateTime] = useState(null);

    return (
        <div>
            <DateTimePickerControl
                label="Selecciona fecha y hora"
                value={selectedDateTime}
                onChange={setSelectedDateTime}
            />
            <p>Fecha seleccionada: {selectedDateTime ? selectedDateTime.toString() : "Ninguna"}</p>
        </div>
    );
}
