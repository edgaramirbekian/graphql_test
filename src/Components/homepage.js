import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getTranslationQuery = gql `
    {
        contentText {
            contentTextItem {
                key
                value
            }
        }
    }
`;

const Homepage = (props) => {
    console.log(props)
    return (
        <div>
        </div>
    );
};

export default graphql(getTranslationQuery)(Homepage);