import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Col, Row } from 'react-bootstrap'
import List from './List'
import style from "./style.module.scss"
import { GetrefreshToken } from '../functions';

interface IProps {
    Filters: any
}

function ContactsList(props: IProps) {
    const { Filters } = props
    const [Token, setToken] = useState<string | null>(null)
    const [hasTokenExp, setHasTokenExp] = useState(false)
    const [filterList, setFilterList] = useState<any[]>([])
    const [contactsList, setContactsList] = useState<any[]>([])
    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            setToken(localStorage.getItem("authToken"))
        } else {
            setHasTokenExp(true)
        }
    }, [])

    useEffect(() => {
        if (hasTokenExp) {
            GetrefreshToken().then((res) => {
                setToken(res.data?.access_token)
            })
        }
        return () => {

        }
    }, [hasTokenExp])

    useEffect(() => {
        if (Token) {
            getContacts()
        }
        return () => {

        };
    }, [Token])

    useEffect(() => {
        console.log(Filters)
        if (Token && Filters.status) {
            getContacts("", {
                tags: JSON.stringify(Filters.IncludeTag),
                notTags: JSON.stringify(Filters.ExcludeTag),
                minMessagesSent: Filters.Message && Filters.Message['sent.min'] || 0,
                minMessagesRecv: Filters.Message && Filters.Message['received.min'] || 0,
                maxMessagesSent: Filters.Message && Filters.Message['sent.max'] || 0,
                maxMessagesRecv: Filters.Message && Filters.Message['received.min'] || 0,
            })
        } else if (Token && !Filters.status) {
            getContacts("");
        }
        return () => {

        }
    }, [Filters, Token])

    const getContacts = (searchText: string | null = "", filters: any = null) => {
        try {
            axios.request({
                method: 'GET',
                url: 'https://api-im.chatdaddy.tech/contacts',
                params: filters ? filters : { q: `${searchText}` },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Token}`
                }
            }).then((response) => {
                if (searchText != '') {
                    setFilterList([...response.data?.contacts] || [])
                    setContactsList([])
                } else if (filters) {
                    setFilterList([...response.data?.contacts] || [])
                    setContactsList([])
                } else {
                    setFilterList([])
                    setContactsList((x) => [...x, ...response.data?.contacts] || []);
                }
                setHasTokenExp(false)
            }).catch((error) => {
                console.log(error);
                setHasTokenExp(true)
            });
        } catch (error) {
            console.log("Error", error)
        }
    }
    return (
        <Col>
            <div className={style.ContactsListWrap}>
                <Col className={""}>
                    <Row>
                        <Col><h4>{
                            filterList.length > 0 ?
                                `Filter Contacts(${filterList.length})`
                                : `All Contacts(${contactsList.length})`}
                        </h4>
                        </Col>
                        <Col lg="1">
                            <button className={`btn btn-success ${style.btnRound}`}>
                                <i className="fa fa-plus" aria-hidden="true"></i>
                            </button>
                        </Col>
                    </Row>
                    <Row>
                        <Search getContacts={getContacts} />
                    </Row>
                </Col>
                <List contactsList={filterList.length > 0 ? filterList : contactsList} getContacts={getContacts} />
            </div>
        </Col>
    )
}

export default ContactsList

interface ISubProps {
    getContacts?: (text: string) => void
}

const Search = (props: ISubProps) => {
    const { getContacts } = props;

    const onHandleSearch = (e: any) => {
        const text = (e.target.value)
        if (getContacts !== undefined)
            getContacts(text)
    }
    return (
        <Col className={style.SearchWrap}>
            <input type="text"
                placeholder="Search Contacts"
                onChange={onHandleSearch}
            />
        </Col>
    )
}
