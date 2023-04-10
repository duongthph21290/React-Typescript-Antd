import instance from "./instance";
interface Iproduct {
    id: number,
    name: string,
    des: string
}
const getAllProduct = () => {
    return instance.get('/products');
}
const getOneProduct = (id: number) => {
    return instance.get('/products/' + id);
}
const addProduct = (product: Iproduct) => {
    return instance.post('/products', product);
}
const updateProduct = (product: Iproduct) => {
    return instance.put('/products/' + product.id, product);
}
const deleteProduct = (id: number) => {
    return instance.delete('/products/' + id);
}

export { getAllProduct, getOneProduct, addProduct, updateProduct, deleteProduct }
