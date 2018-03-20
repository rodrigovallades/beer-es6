class Loader {

  constructor() {
    this.loading = false;
    this.template = `<div class='block-screen'><div class='block-screen__spinner'></div></div>`;
  }

  block() {
    this.loading = true;
    this.render();
  }

  unblock() {
    this.loading = false;
    document.querySelector('.block-screen').remove();
  }

  render() {
    //var l = document.createElement("div");
    //l.innerHTML = this.template
    document.body.insertAdjacentHTML('beforeend', this.template);
  }

}

export default Loader
