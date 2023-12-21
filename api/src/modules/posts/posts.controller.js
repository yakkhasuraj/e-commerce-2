const BaseController = require("../../core/base.controller");
const postsService = require("./posts.service");

class PostsController extends BaseController {
  constructor(service) {
    super(service);
  }
}

const postsController = new PostsController(postsService);

module.exports = postsController;
