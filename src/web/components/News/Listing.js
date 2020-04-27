import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Error from '../UI/Error';

const RecipeListing = ({ error, loading, recipes }) => {
  // Error
  if (error) return <Error content={error} />;

  // Build Cards for Listing
  const cards = recipes.map(item => (
    <Card key={`${item.id}`}>
      
    </Card>
  ));

  // Show Listing
  return (
    <div>
     
    </div>
  );
};

RecipeListing.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

RecipeListing.defaultProps = {
  error: null,
};

export default RecipeListing;
