import React, { Fragment, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Col, Row, Spinner } from 'react-bootstrap';
import style from "./style.module.scss"
import { IContactType } from '../../../models/types';

interface IProps {
    contactsList: IContactType[]
    getContacts: () => void
}

function List(props: IProps) {
    const { contactsList, getContacts } = props
    const [selectedContacts, setSelectedContacts] = useState<string[]>([])
    const [flag, setFlag] = useState(false)
    const onContactSelect = (e: React.MouseEvent<HTMLElement>) => {
        const temp: string[] = selectedContacts
        const id = (e.target as unknown as { id: string }).id
        if (temp.includes(id)) {
            temp.splice(temp.indexOf(id), 1)
        } else {
            temp.push(id)
        }
        setFlag(!flag)
        setSelectedContacts(temp)
    }

    const getNextData = () => {
        setTimeout(() => {
            getContacts()
        }, 1000);
    }

    return (
        <InfiniteScroll
            dataLength={contactsList.length}
            next={getNextData}
            hasMore={contactsList.length > 0 && contactsList.length < 150}
            loader={<Loader />}
            endMessage={<EndMessage length={contactsList.length} />}
            className={style.contactsList}
        >
            {contactsList && contactsList.length > 0 &&
                contactsList.map((contact, index) => {
                    return (
                        <Fragment key={index}>
                            <Row className={style.contactRow}>
                                <Col lg="1">
                                    <div className={`${style.checkBox} ${selectedContacts.includes(contact.id + "") && style.active}`}
                                        id={contact.id}
                                        onClick={onContactSelect}
                                    >
                                        <i id={contact.id} className="fa fa-check" aria-hidden="true"></i>
                                    </div>
                                </Col>
                                <Col xs lg="1">
                                    <div className={style.avatar}>
                                        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
                                    </div>
                                </Col>
                                <Col>
                                    <h5>{contact.name}</h5>
                                    <span className={style.phoneNumber}>+{contact.phoneNumber}</span>
                                </Col>
                                <Col xs="6" lg="1">
                                    <button className={`btn btn-success ${style.btnRound}`}>
                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                    </button>
                                </Col>
                            </Row>
                        </Fragment>
                    )
                })
            }
        </InfiniteScroll>
    )
}

export default List

const Loader = () => {
    return (
        <h4 style={{ textAlign: 'center' }}>
            <Spinner animation="grow" className={style.colorPrimary} />
        </h4>
    )
}

const EndMessage = ({ length }: { length: number }) => {
    return (
        <p style={{ textAlign: 'center' }}>
            {length === 0 ?
                <b>No, contacts found.!</b>
                :
                <>
                    <hr />
                    <b>No, more contacts</b>
                </>}
        </p>
    )
}