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

  renderCart() {
    let header = document.querySelector('.header');    
    const template = `
    <div class='cart'>
      <div class='cart__title'>Total</div>
      <div class='cart__total'>R$ <span class='cart__value'>00,00</span></div>
    </div>`;
    header.insertAdjacentHTML('beforeend', template)
  }

}

export default Products
