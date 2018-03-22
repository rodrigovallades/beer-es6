import GoogleMaps from './modules/GoogleMaps';
import Loader from './modules/Loader';
import Queries from './modules/Queries';
import BeerService from './modules/BeerLocator'
import Products from './modules/Products'
import { createRouter } from 'vanilla-ui-router';

const loader = new Loader();
const query = new Queries();
const router = createRouter(document.getElementById('app'));
const BeerLocator = new BeerService();
const gMap = new GoogleMaps();
const products = new Products();
gMap.init();

// accessible in the HTML
window.BeerLocator = BeerLocator;
window.gMap = gMap;
window.initOptions = gMap.initOptions;
window.initMap = gMap.initMap;


// Routes
router
	.addRoute('', () => {
		router.navigateTo('home');
	})
	// Home
	.addRoute('home', {
		templateUrl: 'views/home.html',
		routeHandler: (domEntryPoint, routeParams) => {

			gMap.initMap();
			products.removeCart();

      BeerLocator.addressResultsDom = document.querySelector('addressresults');
      BeerLocator.addressResultsDom.addEventListener('click', e => {
          if (e.target.classList.contains('address__get-beers')) {
            router.navigateTo('products');
          }
      });
		}
	})
	// Products
  .addRoute('products', {
    templateUrl: 'views/products.html',
    routeHandler: (domEntryPoint, routeParams) => {

			if (!window.BeerLocator.pocSearch.id) {
				router.navigateTo('home')
				return
			};

			products.renderCart();

      BeerLocator.productsListDom = document.querySelector('products');
			BeerLocator.productsListDom.addEventListener('click', e => {
					if (!e.isTrusted || !e.clientX || !e.clientY) return
					// add product
          if (e.target.classList.contains('product__add')) {
						products.add(e.target.dataset.id);
          }
					// remove product
					if (e.target.classList.contains('product__remove')) {
						products.remove(e.target.dataset.id);
          }
      });
      loader.block();
      // fetch GraphQL products api
      query.getBeers(window.BeerLocator.pocSearch.id)
        .then(res => {
          loader.unblock();
          if (res.data.poc.products.length) {
            BeerLocator.renderProducts(res.data.poc.products);
          }
          console.log(`GraphQL pocCategorySearch:`);
          console.log(res.data);
        });
    }
  })
	.otherwise(() => {
		// If no route configuration matches, the otherwise route is invoked.
		console.log('I am the otherwise route');
		router.navigateTo('404');
	});
