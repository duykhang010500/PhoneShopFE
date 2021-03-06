import {
    Row,
    Col,
    Space,
    Typography,
    Radio,
    Button,
    Tooltip,

} from 'antd'

import {
    HeartFilled,
    HeartOutlined
} from '@ant-design/icons'

import {
    useDispatch, useSelector
} from 'react-redux'

import { CheckCircleTwoTone, PlusCircleOutlined, CheckCircleOutlined } from '@ant-design/icons'
import {
    convertNewPrice, formatVND
} from '../../helpers/priceFormat'

import { actAddToCart } from '../../store/cart/action'
import { useEffect, useState } from 'react'
import { actAddToWishList, actDeleteItemInWishListAsync } from '../../store/wishList/action'

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Controller, Thumbs } from 'swiper';
import 'swiper/swiper-bundle.css';
import './styles.css';
import { openNotificationWithIcon } from '../../helpers/notification'
import { actAddToCompare, actRemoveCompare } from '../../store/compare/action'
SwiperCore.use([Navigation, Pagination, Controller, Thumbs]);


export default function DetailProductInfo() {

    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const [productColor, setProductColor] = useState('')
    const [isLiked, setIsLiked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [isCompare, setIsCompare] = useState(false)

    const myWishList = selector.WishList
    const product = selector.Products.detailProduct.data
    const compareList = selector.Compare.compareList

    useEffect(() => {
        if (myWishList.find(item => item.product_id === product.id)) {
            setIsLiked(true)
        } else {
            setIsLiked(false)
        }
    }, [myWishList])

    useEffect(() => {
        if (compareList.find(item => item.id === product.id)) {
            setIsCompare(true)
        } else {
            setIsCompare(false)
        }
    }, [compareList])

    if (!product) {
        return null
    }
    if (!myWishList) {
        return null
    }


    const handleChangeColor = (e) => {
        setProductColor(e.target.value)
    }

    const handleAddToCart = (product, color) => {

        if (!productColor) {
            openNotificationWithIcon('error', 'H??y ch???n m??u c???a s???n ph???m!')
            return
        }
        const productWithColor = { ...product, color }
        console.log(productWithColor)
        dispatch(actAddToCart(productWithColor))
    }

    const handleLikeProduct = (id) => {
        if (!localStorage.getItem('access_token')) {
            openNotificationWithIcon('error', 'Vui l??ng ????ng nh???p ????? s??? d???ng t??nh n??ng n??y!')
            return
        }
        setIsLiked(true)
        setIsLoading(true)
        dispatch(actAddToWishList(id))
        openNotificationWithIcon('success', '???? th??ch!')

    }

    const handleUnLikeProduct = (id) => {
        setIsLiked(false)
        setIsLoading(true)
        dispatch(actDeleteItemInWishListAsync(id))
        openNotificationWithIcon('error', '???? b??? th??ch!')


    }


    // Covert Array Image
    const formatImg = product.images_product
    const galleryImage = [product.image, ...formatImg]
    // console.log('???nh ???? format', galleryImage)


    return (
        <Row gutter={[40, 40]}>
            <Col
                xs={24}
                md={10}
            >
                <div className="gallery">
                    <div className="swiper-top">
                        <Swiper
                            style={{ '--swiper-navigation-color': '#fff', '--swiper-pagination-color': '#fff' }}
                            spaceBetween={10}
                            navigation={true}
                            loop
                            thumbs={{ swiper: thumbsSwiper }}
                            className="mySwiper2"
                        >
                            {
                                galleryImage.map((item, index) => {
                                    return (
                                        <SwiperSlide key={index} className="item-gallery">
                                            <img src={item} alt={item} />
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                    </div>
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={5}
                        freeMode={true}
                        watchSlidesProgress={true}
                        className="mySwiper"
                    >
                        {
                            galleryImage.map((item, index) => {
                                return (
                                    <SwiperSlide key={index} className="item-gallery">
                                        <img src={item} alt={item} />
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </div>
            </Col>
            <Col md={14} xs={24}>
                <Space direction="vertical" size="middle">
                    <Space size="middle" direction="vertical">
                        <Space direction="horizontal">
                            <Typography.Title level={4} type="danger">
                                {
                                    formatVND(convertNewPrice(product.price, product.discount))
                                }
                            </Typography.Title>
                            <Typography.Text strong italic>
                                <del>Gi?? ni??m y???t: {formatVND(product.price)}</del>
                            </Typography.Text>
                        </Space>
                        {
                            isLiked ? (
                                <Space>
                                    <Tooltip title="B??? th??ch">
                                        <HeartFilled
                                            style={{ cursor: 'pointer', color: 'rgb(255, 66, 78)', fontSize: '2rem' }}
                                            onClick={() => handleUnLikeProduct(product.id)}

                                        />
                                    </Tooltip>
                                    <Typography.Text strong>
                                        ???? th??ch
                                    </Typography.Text>
                                </Space>
                            ) : (
                                <Space>
                                    <Tooltip title="Y??u th??ch">
                                        <HeartOutlined
                                            style={{ cursor: 'pointer', fontSize: '2rem' }}
                                            onClick={() => handleLikeProduct(product.id)}
                                        />
                                    </Tooltip>
                                    Th??ch
                                </Space>
                            )
                        }
                        {

                            isCompare ? <Space
                                style={{ color: 'blue', cursor: 'pointer' }}
                                onClick={() => dispatch(actRemoveCompare(product.id))}
                            >
                                <CheckCircleOutlined /> ???? th??m so s??nh
                            </Space> :
                                <Space
                                    style={{ color: 'blue', cursor: 'pointer' }}
                                    onClick={() => dispatch(actAddToCompare({ product }))}
                                >
                                    <PlusCircleOutlined /> So s??nh
                                </Space>
                        }
                    </Space>
                    <Typography.Text strong>
                        <i className="fas fa-shipping-fast"></i>
                        &nbsp;
                        Mi???n ph?? v???n chuy???n to??n qu???c
                    </Typography.Text>
                    <Space direction="vertical">
                        <Typography.Text strong>
                            KHUY???N M??I
                        </Typography.Text>
                        <Typography.Text>
                            <CheckCircleTwoTone twoToneColor="#52c41a" /> &nbsp;
                            T???ng g??i iCloud 50GB mi???n ph?? 3 th??ng
                        </Typography.Text>
                        <Typography.Text>
                            <CheckCircleTwoTone twoToneColor="#52c41a" /> &nbsp;
                            Gi???m ngay 20% ???p l??ng ch??nh h??ng khi mua k??m ??i???n tho???i
                        </Typography.Text>
                        <Typography.Text>
                            <CheckCircleTwoTone twoToneColor="#52c41a" /> &nbsp;
                            Gi???m ?????n 300.000?? khi mua b???o h??nh (r??i v??? + v??o n?????c) k??m m??y
                        </Typography.Text>
                        <Typography.Text>
                            <CheckCircleTwoTone twoToneColor="#52c41a" /> &nbsp;
                            Gi???m th??m 200.000?? cho kh??ch h??ng ???? t???ng mua h??ng t???i ????y
                        </Typography.Text>
                    </Space>

                    {/* product color */}
                    <Radio.Group>
                        <Space
                            onChange={handleChangeColor}
                        >
                            {
                                product.attributes.map((item) => {
                                    return (
                                        <Radio.Button
                                            key={item.id}
                                            value={item.id}
                                        >
                                            {item.name}
                                        </Radio.Button>
                                    )
                                })
                            }
                        </Space>
                    </Radio.Group>

                    {/* button add to cart */}
                    <Button
                        type="danger"
                        size="large"
                        onClick={() => handleAddToCart(product, productColor)}
                    >
                        Ch???n mua
                    </Button>

                </Space>
            </Col>
        </Row>
    )
}