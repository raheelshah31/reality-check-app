import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Content,
  Form,
  Text,
  Button,
  Icon,
  Textarea,
  View,
  H2,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Messages from '../UI/Messages';
import Loading from '../UI/Loading';
import Header from '../UI/Header';
import Spacer from '../UI/Spacer';
import LottieView from 'lottie-react-native';

class Search extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    success: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onVerify: PropTypes.func.isRequired,
  };

  static defaultProps = {
    error: null,
    success: null,
    data: {},
  };
  state = { news: '' };
  constructor(props) {
    super(props);
  }

  onVerifyClicked = () => {
    const { onVerify } = this.props;
    this.setState({ loadData: true });
    return onVerify(this.state.news)
      .then(() => {})
      .catch(() => {});
  };

  onChangeText = text => {
    this.setState({ loadData: false });
    this.setState({ news: text });
  };

  render() {
    const { loading, error, success, verified } = this.props;
    const { news, loadData } = this.state;

    if (loading) return <Loading />;
    console.log(verified);
    //if (error && typeof error == 'string') return <Error content={error} />;

    return (
      <Container style={{ padding: 20 }}>
        <Header title="Verify News" />
        <Content padder>
          <Form>
            <Textarea
              rowSpan={5}
              bordered
              value={news}
              onChangeText={this.onChangeText}
              placeholder="Paste the news article to verify the news"
            />
            <Button
              iconLeft
              primary
              full
              style={{ marginTop: 20 }}
              onPress={() => {
                this.onVerifyClicked();
              }}
            >
              <Icon name="search" />
              <Text>Search</Text>
            </Button>
            {loadData ? (
              <View>
                {verified.isVerified === '1' ? (
                  <View>
                    <LottieView
                      autoPlay
                      speed={0.5}
                      loop={false}
                      style={{
                        width: 400,
                        height: 400,
                        alignSelf: 'center',
                      }}
                      source={require('../../../animations/done.json')}
                    />
                    <H2>This article can be trusted</H2>
                  </View>
                ) : (
                  <View>
                    <LottieView
                      autoPlay
                      loop={false}
                      speed={0.5}
                      style={{
                        width: 400,
                        height: 400,
                        alignSelf: 'center',
                      }}
                      source={require('../../../animations/failed.json')}
                    />
                    <H2>The content of this article cannot be trusted</H2>
                  </View>
                )}
              </View>
            ) : null}
          </Form>
        </Content>
      </Container>
    );
  }
}

export default Search;
