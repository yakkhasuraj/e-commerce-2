const BaseService = require("../../core/base.service");
const { Post } = require("./posts.model");

class PostsService extends BaseService {
  constructor(name, model) {
    super(name, model);
  }
}

const postsService = new PostsService("Post", Post);

module.exports = postsService;
