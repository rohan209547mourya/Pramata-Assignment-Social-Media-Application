/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import {
  Box, Flex, Icon, Input, Text,
} from '@chakra-ui/react';
import { FaComment, FaHeart } from 'react-icons/fa';
import Cookies from 'js-cookie';
import handleRequest from '../API';

const PostCard = ({ post }) => {
  const { _id, name } = post.user;

  const [showComments, setShowComments] = useState(false);

  const addComment = async (event) => {
    event.preventDefault();
    const comment = event.target.elements.comment.value;

    handleRequest(`posts/comment/${post._id}`, 'POST', {
      'Content-Type': 'application/json',
      authorization: Cookies.get('app_session_token'),
    }, JSON.stringify({
      comment,
    }))
      .then((data) => console.log(data))
      .catch((err) => console.log(err));

    event.target.reset();
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p="4" width={500}>
      <Text fontWeight="bold">{name}</Text>
      <Box>
        <Flex>
          <img src={post.image} alt="" />
          <Text>{post.description}</Text>
        </Flex>
      </Box>
      <Flex align="center" direction={['column', 'row']} mt={2}>
        <Box>
          <Icon
            as={FaHeart}
            boxSize={5}
            _hover={{ cursor: 'pointer' }}
          />
          <Text>
            {' '}
            {post.likes.length}
            {' '}
          </Text>
        </Box>

        <Icon
          as={FaComment}
          boxSize={5}
          onClick={() => {
            setShowComments(!showComments);
          }}
          _hover={{ cursor: 'pointer' }}
        />
      </Flex>
      <Text mt="2">{post.text}</Text>
      {showComments && (
        <Box>
          <form onSubmit={addComment}>
            <Input type="text" name="comment" mt="2" />
            <button type="submit">Add Comment</button>
          </form>
          {post.comments.map((comment) => (
            <Text key={comment._id} mt="2">
              {comment.comment}
            </Text>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default PostCard;
