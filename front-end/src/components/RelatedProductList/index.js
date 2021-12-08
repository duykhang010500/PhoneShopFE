import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { actGetRelatedListProductAsync } from '../../store/products/actions'
import ProductItem from '../ProductItem'
import Underline from '../common/Underline'

const RelatedProductList = ({ productSlug }) => {

    const dispatch = useDispatch()
    const { slug } = useParams
    console.log(slug)

    useEffect(() => {
        dispatch(actGetRelatedListProductAsync(productSlug))
    }, [productSlug, dispatch])

    const relatedProductList = useSelector((state) => state.Products.relatedListProduct)

    // if (!relatedProductList) {
    //     return null
    // }

    return (
        <div className="related-product-list box-sd1">
            <div className="related-title">
                Sản phẩm tương tự
                <Underline />
            </div>
            <ul className="product__list">
                {
                    relatedProductList.map((item, index) => (
                        <ProductItem
                            key={index}
                            product={item}
                            isShowCompareButton
                        />
                    ))
                }
            </ul>
        </div>
    )
}

export default RelatedProductList
