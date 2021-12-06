import React, { Fragment, useState } from 'react'
import { ContactsList, SideBar } from '../components'
import { IFiltersTypes } from '../models/types'

function Contacts() {
    const [Filters, setFilters] = useState<IFiltersTypes>({
        IncludeTag: [],
        ExcludeTag: [],
        Message: {},
        status: false,
        cleared: false,
    })
    return (
        <Fragment>
            <SideBar setFilters={setFilters} Filters={Filters} />
            <ContactsList Filters={Filters} />
        </Fragment>
    )
}

export default Contacts
