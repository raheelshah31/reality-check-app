import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Search extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    verified: PropTypes.shape({}).isRequired,
    onVerify: PropTypes.func.isRequired,
  };

  state = {
    error: null,
    success: null,
    loading: false,
  };

  onVerify = data => {
    const { onVerify } = this.props;

    this.setState({ loading: true });

    return onVerify(data)
      .then(() =>
        this.setState({
          loading: false,
          success: 'Success',
          error: null,
        })
      )
      .catch(err => {
        this.setState({
          loading: false,
          success: null,
          error: err,
        });
        throw err; // To prevent transition back
      });
  };

  render = () => {
    const { Layout, data } = this.props;
    const { error, loading, success } = this.state;
    console.log(data);
    return (
      <Layout
        error={error}
        verified={data}
        loading={loading}
        success={success}
        onVerify={this.onVerify}
      />
    );
  };
}

const mapStateToProps = state => ({
  data: state.news.verified ,
});

const mapDispatchToProps = dispatch => ({
  onVerify: dispatch.news.checkNews,
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
