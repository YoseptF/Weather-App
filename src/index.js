import 'country-region-dropdown-menu';
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';
import './sass/style.scss';

import createForm from './packages/countries';

createForm();

window.onload = () => {
  console.log(document.querySelector('body'));
};