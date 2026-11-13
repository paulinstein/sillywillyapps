import rss from '@astrojs/rss';
import { getPublishedPosts, postUrl } from '../lib/posts';

export async function GET(context) {
  const posts = await getPublishedPosts();
  return rss({
    title: 'Silly Willy Apps',
    description: 'No ads. Just fun things I like making.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      categories: post.data.tags,
      link: postUrl(post),
    })),
  });
}
