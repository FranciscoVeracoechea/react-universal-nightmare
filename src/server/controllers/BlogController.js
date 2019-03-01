import Blog from '../models/BLog';


export const index = () => (req, res) => res.status(200).json({
  message: 'blogs list',
  data: Blog.blogs,
});


export const show = () => (req, res) => {
  const { id } = req.params;
  const result = Blog.blogs.find(blog => blog.id === Number(id));
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
