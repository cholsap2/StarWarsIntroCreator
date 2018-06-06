import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import '../styles/main.styl';
import '../../.env';

import './extras/facebooksdk';
import './extras/googleanalytics';
import registerServiceWorker from './registerServiceWorker';

import startApplication from './App';

registerServiceWorker();

swal.setDefaults({
  customClass: 'starwars-sweetalert',
});


(function _() {
  if ('development' === process.env.NODE_ENV) {
    startApplication();
    return;
  }

  Raven.config(process.env.RAVEN, {
    ignoreErrors: [
      'AutoPlayError',
      'null is not an object (evaluating \'elt.parentNode\')',
    ],
    shouldSendCallback: (data) => {
      if ('https://connect.facebook.net/en_US/sdk.js' === data.culprit) {
        return false;
      }
      return true;
    },
    release: '0e4fdef81448dcfa0e16ecc4433ff3997aa53572',
  }).install();
  Raven.context(() => {
    startApplication();
  });
}());

