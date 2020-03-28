import { Firebase, FirebaseRef } from '../lib/firebase';
import initState from '../store/news';
import CONSTANTS from '../constants/config';
export default {
  /**
   *  Initial state
   */
  state: {
    news: initState.news,
  },

  /**
   * Reducers
   */
  reducers: {
    replaceNews(state, payload) {
      let news = [];
      // Pick out the props I need
      if (payload && typeof payload === 'object') {
        news = payload.map(item => ({
          id: item.id,
          title: item.title,
          label: item.label,
          news_poster: item.news_poster,
          author: item.author,
          text: item.text,
        }));
      }

      return { ...state, news };
    },
    setVerifiedResult(state, payload) {
      let verified = { isVerified: payload.result };
      return { ...state, verified };
    },
  },

  /**
   * Effects/Actions
   */
  effects: () => ({
    /**
     * Get News
     *
     * @return {Promise}
     */
    getNews() {
      if (Firebase === null) return () => new Promise(resolve => resolve());

      return new Promise(resolve =>
        FirebaseRef.child('news').on('value', snapshot => {
          const data = snapshot.val() || [];
          this.replaceNews(data);
          return resolve();
        })
      ).catch(err => {
        throw err.message;
      });
    },
    checkNews(data) {
      return new Promise((resolve, reject) => {
        return fetch(CONSTANTS.SERVER_URL + '/verify', {
          method: 'POST',
          body: data,
        })
          .then(response => response.json())
          .then(responseJson => {
            this.setVerifiedResult(responseJson);
            return resolve();
          })
          .catch(reject);
      }).catch(error => {
        throw error.message;
      });
    },
  }),
};
