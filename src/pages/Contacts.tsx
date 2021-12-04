import React, { Fragment, useState } from 'react'
import { ContactsList, SideBar } from '../components'

function Contacts() {
    const [Filters, setFilters] = useState({
        IncludeTag: [],
        ExcludeTag: [],
        Message: {},
        status: false
    })
    return (
        <Fragment>
            <SideBar setFilters={setFilters} Filters={Filters} />
            <ContactsList Filters={Filters} />
        </Fragment>
    )
}

export default Contacts
