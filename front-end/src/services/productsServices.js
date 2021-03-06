import api from './api'

const productsServices = {
    getAll() {
        return api.callWithToken().get('/products')
    },
    getAllForAdmin() {
        return api.callWithToken().get('/admin/products/all')
    },
    create(formData) {
        return api.callWithToken().post('/products', formData)
    },
    delete(slug) {
        return api.callWithToken().delete('/product', {
            params: {
                slug
            }
        })
    },
    updateProduct(slug, formData) {
        return api.callWithToken().put(`/product?slug=${slug}`, formData)
    },
    getDetailProduct(id) {
        return api.call().get(`/product?slug=${id}`)
    },
    getBestDiscount() {
        return api.call().get('/products/filter?sort_by=discount')
    },
    ratingProduct(id, formData) {
        return api.callWithToken().post(`/ratings?id=${id}`, formData)
    },
    getRelatedListProduct(slug) {
        return api.call().get('/related-products', {
            params: {
                slug
            }
        })
    },
    getColorsProduct() {
        return api.call().get('/colors-product')
    },
    searchProduct(keyWord) {
        return api.call().get(`/search?data=${keyWord}`)
    },
    filterProduct({
        page = 1,
        ...restParams
    } = {}) {
        return api.call().get('/products/filter?sort_by=new', {
            params: {
                page,
                ...restParams
            }
        })
    }
}

export default productsServices