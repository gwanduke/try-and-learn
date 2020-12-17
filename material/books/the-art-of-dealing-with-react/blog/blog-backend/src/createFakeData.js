const Post = require('./models/post');

module.exports = function createFakeData() {
  const posts = [...Array(40).keys()].map((i) => ({
    title: `포스트 #${i}`,
    body:
      'Sit consequat irure velit cillum laborum. Id anim adipisicing commodo nostrud commodo sint cupidatat mollit et consequat aliqua ea. Esse in excepteur aliquip esse Lorem ullamco officia culpa nostrud laboris.Sit consequat irure velit cillum laborum. Id anim adipisicing commodo nostrud commodo sint cupidatat mollit et consequat aliqua ea. Esse in excepteur aliquip esse Lorem ullamco officia culpa nostrud laboris.Sit consequat irure velit cillum laborum. Id anim adipisicing commodo nostrud commodo sint cupidatat mollit et consequat aliqua ea. Esse in excepteur aliquip esse Lorem ullamco officia culpa nostrud laboris.Sit consequat irure velit cillum laborum. Id anim adipisicing commodo nostrud commodo sint cupidatat mollit et consequat aliqua ea. Esse in excepteur aliquip esse Lorem ullamco officia culpa nostrud laboris.Sit consequat irure velit cillum laborum. Id anim adipisicing commodo nostrud commodo sint cupidatat mollit et consequat aliqua ea. Esse in excepteur aliquip esse Lorem ullamco officia culpa nostrud laboris.Sit consequat irure velit cillum laborum. Id anim adipisicing commodo nostrud commodo sint cupidatat mollit et consequat aliqua ea. Esse in excepteur aliquip esse Lorem ullamco officia culpa nostrud laboris.Sit consequat irure velit cillum laborum. Id anim adipisicing commodo nostrud commodo sint cupidatat mollit et consequat aliqua ea. Esse in excepteur aliquip esse Lorem ullamco officia culpa nostrud laboris.Sit consequat irure velit cillum laborum. Id anim adipisicing commodo nostrud commodo sint cupidatat mollit et consequat aliqua ea. Esse in excepteur aliquip esse Lorem ullamco officia culpa nostrud laboris.',
    tags: ['가짜', '데이터'],
  }));

  Post.insertMany(posts, (err, docs) => {
    console.log(docs);
  });
};
