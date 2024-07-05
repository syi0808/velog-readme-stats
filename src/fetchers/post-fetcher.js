import { request } from '../utils/index.js';

// export type GetPostsInput = {
//   cursor?: InputMaybe<Scalars['ID']['input']>
//   limit?: InputMaybe<Scalars['Int']['input']>
//   tag?: InputMaybe<Scalars['String']['input']>
//   temp_only?: InputMaybe<Scalars['Boolean']['input']>
//   username?: InputMaybe<Scalars['String']['input']>
// }

const fetcher = (variables) => {
  return request(
    {
      query: `
            query velogPosts($input: GetPostsInput!) {
                posts(input: $input) {
                  id
                  title
                  short_description
                  thumbnail
                  user {
                    username
                    profile {
                      thumbnail
                    }
                  }
                  url_slug
                  released_at
                  updated_at
                  comments_count
                  tags
                  likes
                }
              }
            `,
      variables,
    },
    3
  );
};

async function fetchPost(name, tag) {
  try {
    const { data } = await fetcher({ input: { username: name, limit: 1, tag: tag } });
    return data.data.posts[0];
  } catch (e) {
    console.log(e.response.data.errors);
    throw new Error(e);
  }
}

export default fetchPost;
