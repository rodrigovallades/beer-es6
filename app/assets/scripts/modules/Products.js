class Products {

  constructor() {
    this.totalCart = 0;
  }

  add(id) {
    const qty = document.querySelector(`.product__quantity--id${id}`)
    const value = document.querySelector(`.product__value--id${id}`)
    qty.innerHTML = ++qty.innerHTML;
    this.totalCart = parseFloat(this.totalCart) + parseFloat(value.innerHTML);
  }

  remove(id) {
    const qty = document.querySelector(`.product__quantity--id${id}`)
    const value = document.querySelector(`.product__value--id${id}`)
    if (qty.innerHTML > 0) {
      this.totalCart = parseFloat(this.totalCart) - parseFloat(value.innerHTML);
      qty.innerHTML = --qty.innerHTML;      
    }
  }

}

export default Products
