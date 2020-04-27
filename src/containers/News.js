import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class NewsListing extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    news: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    match: PropTypes.shape({ params: PropTypes.shape({}) }),
    fetchNews: PropTypes.func.isRequired,
  }

  static defaultProps = {
    match: null,
  }

  state = {
    error: null,
    loading: false,
  }

  componentDidMount = () => this.fetchData();

  fetchData = (data) => {
    
    const { fetchNews } = this.props;
    
    this.setState({ loading: true });

    return fetchNews(data)
      .then(() => this.setState({
        loading: false,
        error: null,
      })).catch(err => this.setState({
        loading: false,
        error: err,
      }));
  }

  render = () => {
    const { Layout, news, match } = this.props;
    const { loading, error } = this.state;
    const id = (match && match.params && match.params.id) ? match.params.id : null;

    return (
      <Layout
        newsId={id} 
        error={error}
        loading={loading}
        newsList={news}
        reFetch={() => this.fetchData()}
      />
    );
  }
}

const mapStateToProps = state => ({
  news: state.news.news || {},
});

const mapDispatchToProps = dispatch => ({
  fetchNews: dispatch.news.getNews
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsListing);
