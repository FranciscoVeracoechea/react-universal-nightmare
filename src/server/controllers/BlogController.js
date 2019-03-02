import Blog from '../models/BLog';


export const index = () => (req, res) => res.status(200).json({
  message: 'posts list',
  data: Blog.posts,
});


export const show = () => (req, res) => {
  const { id } = req.params;
  const result = Blog.posts.find(post => post.id === Number(id));
  return res.status(200).json(
    result
      ? {
        message: 'success',
        data: result,
      }
      : {
        message: 'error',
        data: undefined,
      }
  );
};
