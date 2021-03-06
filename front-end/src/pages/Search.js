import React, { useEffect, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import ProductItem from '../components/ProductItem'
import { actSearchProductAsync } from '../store/products/actions'

const Search = () => {

    const dispatch = useDispatch()
    const [isSearch, setIsSearch] = useState(false)
    const queryParams = new URLSearchParams(window.location.search)
    const q = queryParams.get('q')

    useEffect(() => {
        window.scrollTo(0, 0)
        setIsSearch(true)
        dispatch(actSearchProductAsync(q))
            .finally(() => {
                setIsSearch(false)
            })
    }, [dispatch, q])

    const resultsSearch = useSelector((state) => state.Products.searchProduct)

    if (!resultsSearch) {
        return null
    }

    if (isSearch) {
        return <div className="search-page">
            <div className="container">
                <h3 className="text-center">
                    <SearchOutlined /> Đang tìm kiếm
                </h3>
            </div>
        </div>
    }

    return (
        <div className="search-page">
            <div className="container">
                <div className="fs-16 mb-2">
                    Tìm thấy {resultsSearch.length} kết quả cho từ khoá "{q}"
                </div>
                <ul className="product__list">
                    {
                        resultsSearch.map((item, index) => (
                            <ProductItem
                                key={index}
                                product={item}
                            />
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Search
