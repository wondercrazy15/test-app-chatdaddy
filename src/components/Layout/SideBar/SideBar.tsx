import React, { useEffect, useState } from 'react'
import { Badge, Col, ListGroup, Row } from 'react-bootstrap'
import style from "./style.module.scss"
import axios from "axios";
import { GetrefreshToken } from '../functions';

interface IProps {
    setFilters: (arg: any) => void
    Filters: any
}

function SideBar(props: IProps) {
    const { setFilters, Filters } = props
    const [Token, setToken] = useState<string | null>(null)
    const [hasTokenExp, setHasTokenExp] = useState(false)
    const [tags, setTags] = useState<any[]>([])
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
            GetTags()
        }
        return () => {

        }
    }, [Token])

    const GetTags = () => {
        try {
            axios.request({
                method: 'GET',
                url: 'https://api-im.chatdaddy.tech/tags',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Token}`
                }
            }).then(function (response) {
                setTags(response.data?.tags || []);
                setHasTokenExp(false)
            }).catch(function (error) {
                console.error(error);
                setHasTokenExp(true)
            });
        } catch (error) {

        }
    }

    const [IncludeTag, setIncludeTag] = useState<string[]>([])
    const [ExcludeTag, setExcludeTag] = useState<string[]>([])
    const [Message, setMessage] = useState<any | null>(null)
    const [flag, setFlag] = useState(false)

    const onTagInclude = (e: any) => {
        const temp: string[] = IncludeTag
        const tag = e.target.id
        if (temp.includes(tag)) {
            temp.splice(temp.indexOf(tag), 1)
        } else {
            temp.push(tag)
        }
        setFlag(!flag)
        setIncludeTag(temp)
    }

    const onTagExclude = (e: any) => {
        const temp: string[] = ExcludeTag
        const tag = e.target.id
        if (temp.includes(tag)) {
            temp.splice(temp.indexOf(tag), 1)
        } else {
            temp.push(tag)
        }
        setFlag(!flag)
        setExcludeTag(temp)
    }

    const MessageFilters = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage({ ...Message, [e.target.name]: e.target.value })
    }

    const ApplyFilters = () => {
        setFilters({
            IncludeTag,
            ExcludeTag,
            Message,
            status: true
        })
    }

    const ClearFilters = () => {
        setFilters({
            IncludeTag,
            ExcludeTag,
            Message,
            status: false
        })
        setExcludeTag([])
        setIncludeTag([])
        setMessage(null)
    }

    return (
        <Col xs lg="3" className={style.sideBar}>
            <Row className={style.sideBarTop}>
                <Col lg="2"><i className="fa fa-bars" aria-hidden="true"></i></Col>
                <Col className={style.title}>Audience</Col>
                <Col className={style.total}>100 contacts</Col>
            </Row>

            <Row>
                <Col>
                    <span className={style.head}> Include tag</span>
                    <div className={style.tagsWarp}>
                        <ListGroup className={style.listGroup}>
                            {tags.length > 0 &&
                                tags.map((tag, index) => {
                                    if (tag.name) {
                                        return (
                                            <ListGroup.Item
                                                className="d-flex justify-content-between align-items-start"
                                                id={tag.name}
                                                onClick={onTagInclude}
                                                action
                                                variant={index % 2 === 0 ? "secondary" : "light"}>
                                                {tag.name}

                                                {IncludeTag.includes(tag.name) &&
                                                    <div className={style.checkBox}>
                                                        <i className="fa fa-check" aria-hidden="true"></i>
                                                    </div>}
                                            </ListGroup.Item>
                                        )
                                    } else return null
                                })
                            }
                        </ListGroup>
                    </div>
                </Col>
            </Row >
            <Row>
                <Col>
                    <span className={style.head}> Exclude tag</span>
                    <div className={style.tagsWarp}>
                        <ListGroup className={style.listGroup}>
                            {tags.length > 0 &&
                                tags.map((tag, index) => {
                                    if (tag.name) {
                                        return (
                                            <ListGroup.Item
                                                className="d-flex justify-content-between align-items-start"
                                                id={tag.name}
                                                onClick={onTagExclude}
                                                action
                                                variant={index % 2 === 0 ? "secondary" : "light"}>
                                                {tag.name}
                                                {ExcludeTag.includes(tag.name) &&
                                                    <div className={style.checkBox}>
                                                        <i className="fa fa-check" aria-hidden="true"></i>
                                                    </div>}
                                            </ListGroup.Item>
                                        )
                                    } else return null
                                })
                            }
                        </ListGroup>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <span className={style.head}> Message sent</span>
                    <Row className={style.inputWrap}>
                        <Col md="6">
                            <input type="number" name="sent.min" placeholder="Min" onChange={MessageFilters} />
                        </Col>
                        <Col md="6">
                            <input type="number" name="sent.max" placeholder="Max" onChange={MessageFilters} />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col>
                    <span className={style.head}> Message received</span>
                    <Row className={style.inputWrap}>
                        <Col md="6">
                            <input type="number" name="received.min" placeholder="Min" onChange={MessageFilters} />
                        </Col>
                        <Col md="6">
                            <input type="number" name="received.max" placeholder="Max" onChange={MessageFilters} />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col>
                    <button className={`btn btn-primary ${style.btnFilter}`}
                        onClick={ApplyFilters}
                    >Save filter</button>
                </Col>
            </Row>
            {Filters?.status && <Row>
                <Col>
                    <button className={`btn btn-primary ${style.btnFilter} ${style.btnClr}`}
                        onClick={ClearFilters}
                    >Clear filter</button>
                </Col>
            </Row>}
        </Col >
    )
}

export default SideBar
