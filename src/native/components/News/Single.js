import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  H3,
  List,
  ListItem,
  Text,
} from 'native-base';
import { errorMessages } from '../../../constants/messages';
import Error from '../UI/Error';
import Spacer from '../UI/Spacer';

const NewsView = ({ error, newsList, newsId }) => {
  // Error
  console.log(newsList);
  if (error) return <Error content={error} />;

  // Get this News from all Newss
  let news = null;
  if (newsId && newsList) {
    news = newsList.find(
      item => parseInt(item.id, 10) === parseInt(newsId, 10)
    );
  }

  // News not found
  if (!news) return <Error content={errorMessages.News404} />;

  return (
    <Container>
      <Content padder>
        <H3>{news.title}</H3>
        <Text>by {news.author}</Text>

              <Spacer size={20} />
              <Text>by {news.text}</Text>
      </Content>
    </Container>
  );
};

NewsView.propTypes = {
  error: PropTypes.string,
  newsId: PropTypes.string.isRequired,
  news: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

NewsView.defaultProps = {
  error: null,
};

export default NewsView;
