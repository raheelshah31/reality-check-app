import { Firebase, FirebaseRef } from '../lib/firebase';
import initState from '../store/news';

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
  }),
};
