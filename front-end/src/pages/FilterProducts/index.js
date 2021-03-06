import React, { useEffect, useState } from 'react'
import { Button, Row, Checkbox, Col, Select, Input, InputNumber, Spin, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { actFilterProductAsync } from '../../store/products/actions'
import ProductItem from '../../components/ProductItem'


const FilterProducts = () => {

    const dispatch = useDispatch()
    const selector = useSelector((state) => state)

    const [isFetching, setIsFetching] = useState(false)

    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingPrice, setIsLoadingPrice] = useState(false)
    const [brandFilter, setBrandFilter] = useState([])
    const [checkedListBrand, setCheckedListBrand] = useState([])
    const [isCheckedAllBrand, setIsCheckAllBrand] = useState(true)
    const [sortFilter, setSortFilter] = useState(null)
    const [minPrice, setMinPrice] = useState(null)
    const [maxPrice, setMaxPrice] = useState(null)

    useEffect(() => {
        setIsFetching(true)
        dispatch(actFilterProductAsync({
            page: 1,
            brand_id: brandFilter,
            sort_by: sortFilter,
            min_price: minPrice,
            max_price: maxPrice
        })).finally(() => setIsFetching(false))
    }, [brandFilter, sortFilter])

    const brandList = selector.Brands.list
    if (!brandList) {
        return null
    }

    const productPaging = selector.Products.filterListProduct
    if (!productPaging) {
        return
    }

    const product = productPaging.list
    const totalItem = productPaging.totalItem
    const currentPage = productPaging.currentPage
    const totalPage = productPaging.totalPage
    const hasMorePost = currentPage < totalPage

    //Load more
    const handleLoadingMore = () => {
        setIsLoading(true)
        dispatch(actFilterProductAsync({
            page: currentPage + 1,
            brand_id: brandFilter,
            sort_by: sortFilter,
            min_price: minPrice,
            max_price: maxPrice
        }))
            .finally(() => {
                setIsLoading(false)
            })
    }

    // chang brand
    const handleChangeBrandOption = (values) => {
        if (isCheckedAllBrand) {
            setIsCheckAllBrand(false)
            setMinPrice(null)
            setMaxPrice(null)
        }
        if (values.length === 0) {
            setIsCheckAllBrand(true)
        }
        setBrandFilter(values)
        setCheckedListBrand(values)
        setMinPrice(null)
        setMaxPrice(null)
        // setSortFilter(null)
    }

    // check all brand
    const handleCheckedAllBrand = () => {
        setIsCheckAllBrand(true)
        setMinPrice(null)
        setMaxPrice(null)
        setSortFilter(null)
        setBrandFilter([])
        setCheckedListBrand([])
    }

    // sort
    const handleChangeOrderBy = (values) => {
        setSortFilter(values)
        // setMinPrice(null)
        // setMaxPrice(null)
    }

    // min price
    const handleChangeMinimumPrice = (value) => {
        setMinPrice(value)
    }

    // max price
    const handleChangeMaximumPrice = (value) => {
        setMaxPrice(value)
    }

    const handleFilterPrice = () => {
        if (maxPrice < minPrice) {
            message.error('Gi?? t???i ??a ph???i l???n h??n gi?? nh??? nh???t!')
            return
        }
        setIsLoadingPrice(true)
        setIsFetching(true)
        dispatch(actFilterProductAsync({
            page: 1,
            brand_id: brandFilter,
            sort_by: sortFilter,
            min_price: minPrice,
            max_price: maxPrice
        })).finally(() => {
            setIsLoadingPrice(false)
            setIsFetching(false)
            // setMinPrice(null)
            // setMaxPrice(null)
        })
    }


    return (
        <div className="container">
            <div className="filter-product-page">
                <Row gutter={[20, 20]}>
                    <Col span={4}>
                        <div className="filter">
                            <div className="filter-option">
                                {/*Filter h??ng */}
                                <div className="fs-16 mb-2 fw-500">
                                    H??ng s???n xu???t
                                </div>
                                <Checkbox
                                    onChange={handleCheckedAllBrand}
                                    checked={isCheckedAllBrand}
                                >
                                    T???t c???
                                </Checkbox>

                                <Checkbox.Group style={{ width: '100%', marginTop: '1rem' }}
                                    onChange={handleChangeBrandOption}
                                    value={checkedListBrand}
                                >
                                    <Row gutter={[10, 10]}>
                                        {
                                            brandList.map((item, index) => (
                                                <Col span={24} key={index}>
                                                    <Checkbox
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.name}
                                                    </Checkbox>
                                                </Col>
                                            ))
                                        }
                                    </Row>
                                </Checkbox.Group>

                                {/*Filter gi?? */}
                                <div className="fs-16 mb-2 mt-2 fw-500">
                                    Gi??
                                </div>
                                <div className="fs-16 mb-1">
                                    T???
                                </div>
                                <InputNumber
                                    className="mb-1 w-100"
                                    step={500000}
                                    min={0}
                                    onChange={handleChangeMinimumPrice}
                                    value={minPrice}
                                />
                                <div className="fs-16 mb-1">
                                    ?????n
                                </div>
                                <InputNumber className="mb-2 w-100"
                                    step={500000}
                                    value={maxPrice}
                                    min={0}
                                    onChange={handleChangeMaximumPrice}
                                />
                                <Button style={{ width: '100%' }}
                                    danger
                                    type="primary"
                                    onClick={handleFilterPrice}
                                    disabled={!minPrice || !maxPrice}
                                >
                                    ??p d???ng
                                </Button>
                            </div>
                        </div>
                    </Col>
                    <Col span={20}>
                        <ul className="sort-product">
                            <div className="fs-16  text-center">
                                C?? t???t c??? <span className="fw-500">{totalItem}</span> s???n ph???m
                            </div>
                            <Select
                                placeholder="S???p x???p theo"
                                style={{ width: 200 }}
                                onChange={handleChangeOrderBy}
                                value={sortFilter}
                            >
                                <Select.Option
                                    value="discount"
                                >
                                    Khuy???n m???i t???t
                                </Select.Option>
                                <Select.Option
                                    value="desc"
                                >
                                    Gi?? gi???m d???n
                                </Select.Option>
                                <Select.Option
                                    value="asc"
                                >
                                    Gi?? t??ng d???n
                                </Select.Option>
                            </Select>
                        </ul>
                        <Spin spinning={isFetching}>
                            <ul className="product__list">
                                {
                                    product.map((item, index) => (
                                        <ProductItem
                                            product={item}
                                            key={index}
                                        />
                                    ))
                                }
                            </ul>
                        </Spin>
                        <Row justify="space-around">
                            {
                                hasMorePost && <Button
                                    loading={isLoading}
                                    type="primary"
                                    danger
                                    className="mt-1"
                                    style={{ textAlign: 'center', display: 'block' }}
                                    onClick={handleLoadingMore}
                                    size="large"
                                >
                                    Xem th??m {totalItem - product.length} s???n ph???m
                                </Button>
                            }
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default FilterProducts
