class Products {

  constructor() {
  }

  add(id) {
    const qty = document.querySelector(`.products__quantity--id${id}`)
    qty.innerHTML = ++qty.innerHTML;
  }

  remove(id) {
    const qty = document.querySelector(`.products__quantity--id${id}`)
    if (qty.innerHTML > 0) qty.innerHTML = --qty.innerHTML;
  }

}

export default Products
