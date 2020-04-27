import React from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Image,
  View,
} from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Button,
  Icon,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from '../UI/Loading';
import Error from '../UI/Error';
import Header from '../UI/Header';
import Spacer from '../UI/Spacer';

const NewsListing = ({ error, loading, newsList, reFetch }) => {
  // Loading

  console.log('loading', loading);
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} onTryAgain={this.onTryAgain} />;

  const keyExtractor = (item) => item.id;

  const onPress = (item) =>
    Actions.newsSingle({ match: { params: { id: String(item.id) } } });

  const onTryAgain = () => {
    Actions.refresh({ key: Math.random() });
  };

  return (
    <View style={{ margin: 15 }}>
      <Header
        title="Top news"
        content="Search any news article and we will try to help you with the truth"
      />

      <FlatList
        numColumns={1}
        data={newsList}
        renderItem={({ item }) => (
          <Card transparent style={{ paddingHorizontal: 6 }}>
            <CardItem cardBody>
              <TouchableOpacity
                onPress={() => onPress(item)}
                style={{ flex: 1 }}
              >
                <Image
                  source={{ uri: item.news_poster }}
                  style={{
                    height: 100,
                    width: null,
                    flex: 1,
                    borderRadius: 5,
                  }}
                />
              </TouchableOpacity>
            </CardItem>
            <CardItem cardBody>
              <Body>
                <Spacer size={10} />
                <Text style={{ fontWeight: '800' }}>{item.title}</Text>
                <Spacer size={15} />

                <Button
                  block
                  bordered
                  small
                  iconLeft
                  onPress={() => onPress(item)}
                  style={{ height: 40 }}
                >
                  {item.label == '0' ? (
                    <Icon
                      type="MaterialIcons"
                      name="verified-user"
                      style={{
                        color: 'green',
                      }}
                    />
                  ) : (
                    <Icon
                      type="MaterialIcons"
                      name="report"
                      style={{ color: 'red' }}
                    />
                  )}
                  <Text>View News</Text>
                </Button>
                <Spacer size={5} />
              </Body>
            </CardItem>
          </Card>
        )}
        keyExtractor={keyExtractor}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={reFetch} />
        }
      />

      <Spacer size={20} />
    </View>
  );
};

NewsListing.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  news: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  reFetch: PropTypes.func,
};

NewsListing.defaultProps = {
  error: null,
  reFetch: null,
};

export default NewsListing;
