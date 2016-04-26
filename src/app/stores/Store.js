import BookActions from '../actions/Actions.js';
import alt from 'dgx-alt-center';

class Store {
  constructor() {
    this.bindListeners({
    });

    this.on('init', () => {
    });
  }
}

export default alt.createStore(Store, 'Store');
