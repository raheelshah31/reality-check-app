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
        news = payload.map((item) => ({
          id: item.id,
          title: item.title,
          label: item.label,
          news_poster:
            'https://www.asanet.org/sites/default/files/default_images/placeholder-news.jpg',
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
    async getNews() {
      const UID =
        FirebaseRef &&
        Firebase &&
        Firebase.auth() &&
        Firebase.auth().currentUser &&
        Firebase.auth().currentUser.uid
          ? Firebase.auth().currentUser.uid
          : null;

      return new Promise(async (resolve, reject) => {
        let recommendation = [];

        if (UID) {
          let ref = await FirebaseRef.child(`users/${UID}`);
          await ref.on('value', (snapshot) => {
            const userData = snapshot.val() || [];
            //console.log(userData);
            if (userData.recommendation) {
              Object.keys(userData.recommendation).map((key) => {
                userData.recommendation[key].map((item) => {
                  if (recommendation.indexOf(item) < 0) {
                    recommendation.push(item);
                  }
                });
              });
            }
          });
        }
        return fetch(CONSTANTS.SERVER_URL + '/', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(recommendation),
        })
          .then((response) => response.json())
          .then(async (responseJson) => {
            //console.log(responseJson);
            this.replaceNews(responseJson);

            return resolve();
          })
          .catch(reject);
      }).catch((err) => {
        throw err.message;
      });
    },
    updateRecommendations(recommendationsList) {
      const UID =
        FirebaseRef &&
        Firebase &&
        Firebase.auth() &&
        Firebase.auth().currentUser &&
        Firebase.auth().currentUser.uid
          ? Firebase.auth().currentUser.uid
          : null;

      if (UID) {
        FirebaseRef.child(`users/${UID}`)
          .child('recommendation')
          .push(recommendationsList);
      }
    },
    checkNews(data) {
      return new Promise(async (resolve, reject) => {
        return fetch(CONSTANTS.SERVER_URL + '/verify', {
          method: 'POST',
          body: data,
        })
          .then((response) => response.json())
          .then(async (responseJson) => {
            this.setVerifiedResult(responseJson);
            this.updateRecommendations(responseJson.potentialWinners);
            return resolve();
          })
          .catch(reject);
      }).catch((error) => {
        throw error.message;
      });
    },
  }),
};
