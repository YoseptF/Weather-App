import 'country-region-dropdown-menu';
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';
import './sass/style.scss';

window.onload = event => {
  $('form').on('click', event => {
    if (event.target.classList.contains('ui-menu-item-wrapper')) { $('.flag').html(event.target.firstElementChild); }
  });
  $;
};