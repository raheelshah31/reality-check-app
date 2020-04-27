import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, H3, View, Button } from 'native-base';
import Spacer from './Spacer';

const Error = ({ title, content, onTryAgain }) => (
  <View
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      
      flex: 1,
      flexDirection: 'column',
    }}
  >
    <H3>{title}</H3>
    <Spacer size={20}></Spacer>
    <Text>{content}</Text>
    <Spacer></Spacer>
    {onTryAgain ? (
      <Button primary onPress={() => onTryAgain()} style={{alignSelf:'center'}}>
        <Text>Try again</Text>
      </Button>
    ) : null}
  </View>
);

Error.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  onTryAgain: PropTypes.func,
};

Error.defaultProps = {
  title: 'Uh oh',
  content: 'An unexpected error came up',
  onTryAgain: null,
};

export default Error;
