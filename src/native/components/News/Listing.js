import React from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Image,
} from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Button,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from '../UI/Loading';
import Error from '../UI/Error';
import Header from '../UI/Header';
import Spacer from '../UI/Spacer';

const NewsListing = ({ error, loading, newsList, reFetch }) => {
  // Loading

  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id;

  const onPress = item =>
    Actions.newsSingle({ match: { params: { id: String(item.id) } } });

  return (
    <Container>
      <Content padder>
        <Header
          title="Top news"
          content="Search any news article and we will try to help you with the truth"
        />

        <FlatList
          numColumns={2}
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
                  <Button block bordered small onPress={() => onPress(item)}>
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
      </Content>
    </Container>
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
