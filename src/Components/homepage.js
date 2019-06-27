import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import { Container, Row, Col } from 'react-bootstrap';

const getTranslationQuery = gql `
    {
        contentText {
            en {
                key
                value
            }
        }
    }
`;

const Homepage = (props) => {
    console.log(props)
    const data = props.data;
    console.log(data)
    const displayContent = () => {
        if (data.loading === true ) {
            return (
                <div>Loading...</div>
            )
        }
        else if (data.loading === false && data.networkStatus === 7) {
            const contentItems = data.contentText.en;
            return contentItems.map((contentItem, idx) => {
                return (
                    <Row key={idx}>
                        ---{idx}---
                        <Col sm={3}>
                            {contentItem.key}
                        </Col>
                        <Col sm={8}>
                            {contentItem.value}
                        </Col>
                    </Row>
                )
            })
        }
        else {
            return (
                <div>Error :/</div>
            )
        }
    };

    return (
        <Container>
            {displayContent()}
        </Container>
    )
};

export default graphql(getTranslationQuery)(Homepage);