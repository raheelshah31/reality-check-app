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
import Error from '../UI/Error';
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

  onTryAgain = () => {
    console.log("Ayaaa")
    Actions.refresh({key: Math.random()});
  }

  render() {
    const { loading, error, success, verified } = this.props;
    const { news, loadData } = this.state;

    if (loading) return <Loading />;
   
    if (error) return <Error content={error} onTryAgain={this.onTryAgain}/>;

    return (
      <View style={{flex:1,justifyContent:'flex-start',padding:20}}>
        <Header title="Verify News" />
        <View padder>
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
              <View >
                {verified.isVerified === '0' ? (
                  <View>
                    <LottieView
                      autoPlay
                      speed={0.5}
                      loop={false}
                      style={{
                        width: 300,
                        height: 300,
                        alignSelf: 'center',
                      }}
                      source={require('../../../animations/done.json')}
                    />
                    <H2 style={{textAlign:'center',marginVertical:20 }}>This article can be trusted</H2>
                  </View>
                ) : (
                  <View>
                    <LottieView
                      autoPlay
                      loop={false}
                      speed={0.5}
                      style={{
                        width:300,
                        height: 300,
                        alignSelf: 'center',
                        
                      }}
                      source={require('../../../animations/failed.json')}
                    />
                    <H2 style={{textAlign:'center' ,marginVertical:20 }}>This article cannot be trusted</H2>
                  </View>
                )}
              </View>
            ) : null}
          </Form>
        </View>
        </View>
    );
  }
}

export default Search;
