const Query = {

    // posts
    InsertPosts: (username, txt) => `insert into posts (username, txt) VALUES ("${username}", "${txt}")`,
    GetAllPosts: () => `select * from posts where status = 1`,
    GetPostsById: (id) => `select * from posts where (id = ${id} and status = 1)`,
    UpdatePostsById: (id, body) => `update posts set username = "${body.username}", txt = "${body.text}", status = ${body.status} where id = ${id}`,
    SoftDeletePosts: (id) => `update posts set status = 0 where id = ${id}`,

    // products
    InsertProducts: (product_name, product_price) => `insert into products (product_name, product_price) VALUES ("${product_name}", ${product_price})`,
    GetAllProducts: () => `select * from products where status = 1`,
    GetProductsById: (id) => `select * from products where (id = ${id} and status = 1)`,
    UpdateProductsById: (id, body) => `update products set product_name = "${body.product_name}", product_price = ${body.product_price}, status = ${body.status} where id = ${id}`,
    SoftDeleteProducts: (id) => `update products set status = 0 where id = ${id}`,

}

module.exports = {
    Query
}