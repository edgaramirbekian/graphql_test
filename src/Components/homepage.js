import React, { useState, useEffect, useRef, useCallback } from 'react';
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

const sortOnKey = (arr) => {
    const lngth = arr.length;
    for (let i = 0; i < (lngth - 1); i++ ) {
        for (let j = 0; j < (lngth - i - 1); j++) {
            if (arr[j].key > arr[j+1].key) {
                let tmp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = tmp;
            }
        }
    }
    return arr
};

const Homepage = (props) => {

    const data = props.data;
    const [content, setContent] = useState([]);
    const [filteredContent, setFilteredContent] = useState([]);
    const inputRef = useRef(null);
    const inputValRef = useRef(null);

    const searchOnKey = (ev) => {
        if (inputRef === null || inputRef === "") {
            setFilteredContent(content)
        } else {
            inputRef.current.focus();
            let filtered_arr = content.filter((item) => {
                return item.key.search(inputRef.current.value) !== -1;
            });
            setFilteredContent(filtered_arr)
        }
    };

    const searchOnValue = (ev) => {
        if (inputValRef === null || inputValRef === "") {
            setFilteredContent(content)
        } else {
            inputValRef.current.focus();
            let filtered_arr = content.filter((item) => {
                return item.value.search(inputValRef.current.value) !== -1;
            });
            setFilteredContent(filtered_arr)
        }
    };

    const getData = useCallback(() => {
        if (data.loading === true ) {
            return (
                <div>Loading...</div>
            )
        }
        else if (data.loading === false && data.networkStatus === 7) {
            let contentItems = data.contentText.en;
            let sortedItems = sortOnKey(contentItems);
            setContent(sortedItems);
            setFilteredContent(sortedItems)
        }
        else {
            return (
                <div>Error :/</div>
            )
        }
    }, [data]);

    useEffect(() => {
        if (data.loading === false && data.networkStatus === 7) {
            getData();
        }
        }, [data.loading, data.networkStatus, getData]);


    const displayContent = (some_content) => {
        return some_content.map((contentItem, idx) => {
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
    };

    return (
        <Container>
            search keywords <input ref={inputRef} type="text" onChange={() => searchOnKey()}/> <br/>
            search values <input ref={inputValRef} type="text" onChange={() => searchOnValue()}/>
            {displayContent(filteredContent)}
        </Container>
    )
};

export default graphql(getTranslationQuery)(Homepage);