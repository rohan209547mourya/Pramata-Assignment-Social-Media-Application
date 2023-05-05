import React, { useEffect, useState } from 'react';
import {
  Box, Button, ButtonGroup, Flex, Input,
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import PostCard from '../components/PostCard';
import handleRequest from '../API';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [showPostOption, setShowPostOption] = useState(false);
  const [description, setDescription] = useState('');

  useEffect(() => {
    handleRequest(
      'posts',
      'GET',
      {
        'Content-Type': 'application/json',
        authorization: Cookies.get('app_session_token'),
      },
      null,
    ).then((data) => {
      setPosts(data);
    })
      .catch((err) => { console.log(err); });
  }, [posts]);

  const createNewPostHandler = (e) => {
    e.preventDefault();

    handleRequest('posts', 'POST', {
      'Content-Type': 'application/json',
      authorization: Cookies.get('app_session_token'),
    }, JSON.stringify({ description })).then((data) => { setShowPostOption(false); setDescription(''); });
  };

  return (
    <div>
      <Box width="20%" m="auto">
        <ButtonGroup>
          <Button onClick={() => setShowPostOption(!showPostOption)}>
            Create post
          </Button>
        </ButtonGroup>
        {

          showPostOption && (
            <Box>
              <form onSubmit={createNewPostHandler}>
                <Input
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter post content"
                />
                <Button type="submit" colorScheme="blue" mt={5}>Post</Button>
              </form>
            </Box>

          )

        }
      </Box>
      <Flex width="40%" margin="auto" align="center" justify="center" mt={10} flexDirection="column" gap={5}>
        {
          // eslint-disable-next-line no-underscore-dangle
          posts?.map((post) => <PostCard post={post} key={post._id} />)

        }
      </Flex>
    </div>
  );
};

export default Posts;
