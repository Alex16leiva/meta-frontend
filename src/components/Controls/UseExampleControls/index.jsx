import React from 'react'
import { PivotTableUseExample } from './PivotTableUseExample'
import { SearchControlModalUseExample } from './SearchControlModalUseExample'
import { PivotTableUse1 } from './PivotTableUse1'
import NavControl from '../NavControl'
import { DateTimePickerExampleUse } from './DateTimePickerExampleUse'

export const UseExampleControls = () => {

    const navigationItems = [
        { id: "pivotTableControl", label: "PivotTable ", component: PivotTableUse1 },
        { id: "searchModalControl", label: "Search", component: SearchControlModalUseExample },
        { id: "dateTimePickerControl", label: "DateTimePickerControl", component: DateTimePickerExampleUse }
    ];

    return (
        <div>
            <NavControl items={navigationItems} />
        </div>
    )
}
