import React, { useState, useEffect } from 'react'
import {
    Row,
    Col,
    Breadcrumb,
    Table,
    Space,
    Button,
    Drawer,
    Form,
    Input,
    message,
    Tooltip,
    Popconfirm,
    Switch
} from 'antd'
import {
    HomeOutlined,
    PlusCircleOutlined,
    DeleteOutlined,
    FormOutlined,
    SaveOutlined,
    SearchOutlined
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
    actCreateBrandAsync,
    actDeleteBrandAsync,
    actGetListBrandAdminAsync,
    actGetListBrandAsync,
    actUpdateBrandAsync
} from '../../store/brands/actions'
import slugify from 'slugify'

const DashboardAdminCategories = () => {

    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const [isLoading, setIsLoading] = useState(false)
    const [idSelected, setIdSelected] = useState("")
    const [form] = Form.useForm()
    const [showFormAdd, setShowFormAdd] = useState(false)
    const [showFormUpdate, setShowFormUpdate] = useState(false)
    // const [listBrand, setListBrand] = useState([])
    //Get list brand

    useEffect(() => {
        setIsLoading(true)
        dispatch(actGetListBrandAdminAsync())
            // .then((res) => setListBrand(res))
            .finally(() => setIsLoading(false))
    }, [dispatch])

    const listBrand = selector.Brands.list

    //Create Brand
    const handleSubmit = (values) => {
        setIsLoading(true)
        dispatch(actCreateBrandAsync(values)).then((res) => {
            if (res.ok) {
                message.success(res.message)
                dispatch(actGetListBrandAdminAsync())
                    // .then((res) => setListBrand(res))
                    .finally(() => setIsLoading(false))
            } else {
                message.error(res.message)
            }
        }).finally(() => {
            form.resetFields()
            setShowFormAdd(false)
            setIsLoading(false)
        })
    }

    //Delete brand
    const handleDeleteBrand = (id) => {
        setIsLoading(true)
        dispatch(actDeleteBrandAsync(id)).then((res) => {
            if (res.ok) {
                message.success(res.message)
            } else {
                message.error(res.message)
            }
        }).finally(() => {
            dispatch(actGetListBrandAdminAsync())
                // .then((res) => setListBrand(res))
                .finally(() => setIsLoading(false))
        })
    }

    //Update Brand
    const handleUpdate = (values) => {
        console.log(idSelected)
        // console.log(values)
        setIsLoading(true)
        dispatch(actUpdateBrandAsync(idSelected, values)).then((res) => {
            if (res.ok) {
                message.success(res.message)
            } else {
                message.error(res.message)
            }
        }).finally(() => {
            setIsLoading(false)
            setShowFormUpdate(false)
            dispatch(actGetListBrandAdminAsync())
        })
    }

    const handleChangeStatus = (status, record) => {
        console.log('status', status, record)
        setIsLoading(true)
        if (status === 1) {
            dispatch(actUpdateBrandAsync(record.slug, { ...record, status: 0 }))
                .finally(() => setIsLoading(false))
        } else {
            dispatch(actUpdateBrandAsync(record.slug, { ...record, status: 1 }))
                .finally(() => setIsLoading(false))
        }
    }

    //Columns in table
    const columnsBrandTable = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id
        },
        {
            title: 'T??n h??ng',
            dataIndex: 'name',
            key: 'name',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                return (
                    <div style={{ padding: 8 }}>
                        <Space>
                            <Input
                                placeholder='Nh???p t??n h??ng'
                                value={selectedKeys}
                                onChange={(e) => {
                                    setSelectedKeys(e.target.value ? [e.target.value] : [])
                                    confirm({ closeDropdown: false })
                                }}
                            />
                            <Space>
                                <Button
                                    onClick={() => confirm()}
                                    type='primary'
                                    size='small'
                                >
                                    Ok
                                </Button>
                                <Button
                                    onClick={() => clearFilters()}
                                    type='primary'
                                    danger
                                    size='small'
                                >
                                    Reset
                                </Button>
                            </Space>
                        </Space>
                    </div>
                )
            },
            filterIcon: () => <SearchOutlined />,
            onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase())
        },
        {
            title: '???????ng d???n',
            dataIndex: 'slug',
            key: 'slug',
            render: (slug) => (
                <span>/{slug}</span>
            )
        },
        {
            title: 'Tr???ng th??i',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => {
                return <Switch
                    onChange={() => handleChangeStatus(status, record)}
                    defaultChecked={status}
                />
            },
            filters: [
                { text: '??ang k??ch ho???t', value: 1 },
                { text: '??ang ???n', value: 0 },
            ],
            onFilter: (value, record) => record.status === value
        },
        {
            title: 'M?? t???',
            dataIndex: 'desc',
            key: 'desc'
        },
        {
            title: 'H??nh ?????ng',
            key: 'action',
            render: (text, record) => (
                <Space size='middle'>
                    <Tooltip title="C???p nh???t">
                        <Button
                            type="primary"
                            className="btn-primary"
                            icon={<FormOutlined />}
                            onClick={() => {
                                setShowFormUpdate(true)
                                setIdSelected(record.slug)
                                form.setFieldsValue({
                                    name: record.name,
                                    slug: record.slug,
                                    desc: record.desc
                                })
                            }}
                        >
                        </Button>
                    </Tooltip>
                    <Tooltip title="X??a">
                        <Popconfirm
                            placement="topRight"
                            title={`X??a h??ng ${record.name}`}
                            onConfirm={() => handleDeleteBrand(record.slug)}
                        >
                            <Button
                                type="primary"
                                danger
                                icon={<DeleteOutlined />}
                            >
                            </Button>
                        </Popconfirm>
                    </Tooltip>

                </Space>
            )
        }
    ]

    //render
    return (
        <Row gutter={[16, 16]}>
            <Col span={24}>
                <Breadcrumb
                    style={{
                        marginBottom: '2rem'
                    }}
                >
                    <Breadcrumb.Item href="/admin">
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        S???n ph???m
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        Qu???n l?? h??ng
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Col>
            <Col span={24}>
                <Space>
                    <Button
                        size="large"
                        type="primary"
                        className="btn-primary"
                        icon={<PlusCircleOutlined />}
                        onClick={() => setShowFormAdd(!showFormAdd)}
                    >
                        Th??m m???i
                    </Button>
                </Space>
            </Col>

            <Col span={24}>
                <Table
                    columns={columnsBrandTable}
                    dataSource={listBrand}
                    loading={isLoading}
                    rowKey={(record) => record.id}
                />
            </Col>
            <Drawer
                title="T???o h??ng m???i"
                placement="right"
                closable={true}
                onClose={() => setShowFormAdd(false)}
                visible={showFormAdd}
            >
                <Form
                    layout="vertical"
                    onFinish={handleSubmit}
                    form={form}
                >
                    <Form.Item
                        label="T??n h??ng"
                        name="name"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="???????ng d???n"
                        name="slug"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="M?? t???"
                        name="desc"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<SaveOutlined />}
                            loading={isLoading}
                        >
                            T???o m???i
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
            <Drawer
                title="C???p nh???t th??ng tin"
                placement="right"
                closable={true}
                onClose={() => setShowFormUpdate(false)}
                visible={showFormUpdate}
            >
                <Form
                    layout="vertical"
                    onFinish={handleUpdate}
                    form={form}
                >
                    <Form.Item
                        label="T??n h??ng"
                        name="name"
                        rules={[{ required: true }]}
                    >
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item
                        label="???????ng d???n"
                        name="slug"
                        rules={[{ required: true }]}
                    >
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item
                        label="M?? t???"
                        name="desc"
                        rules={[{ required: true }]}
                    >
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<SaveOutlined />}
                            loading={isLoading}
                        >
                            C???p nh???t
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </Row>
    )
}

export default DashboardAdminCategories
