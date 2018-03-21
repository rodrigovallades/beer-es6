import GoogleMaps from './modules/GoogleMaps';
import Loader from './modules/Loader';
import Queries from './modules/Queries';
import BeerService from './modules/BeerLocator'
import { createRouter } from 'vanilla-ui-router';

const loader = new Loader();
const query = new Queries();
const router = createRouter(document.getElementById('app'));
const BeerLocator = new BeerService();
const gMap = new GoogleMaps();

// accessible in the HTML
window.BeerLocator = BeerLocator;
window.gMap = gMap;
window.initOptions = gMap.initOptions;
window.initMap = gMap.initMap;

router
	.addRoute('', () => {
		router.navigateTo('home');
	})
	.addRoute('home', {
		templateUrl: 'views/home.html', // is loaded and gets rendered
		routeHandler: (domEntryPoint, routeParams) => {
      gMap.init();
      BeerLocator.addressResults = document.querySelector('addressresults');
      BeerLocator.addressResults.addEventListener('click', function(e) {
          if (e.target.classList.contains('address__get-beers')) {
            router.navigateTo('products');
          }
      });
		}
	})
  .addRoute('products', {
    templateUrl: 'views/products.html', // is loaded and gets rendered
    routeHandler: (domEntryPoint, routeParams) => {
      BeerLocator.productsList = document.querySelector('products');
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
