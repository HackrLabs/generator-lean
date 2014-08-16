var controller = require("./controller");

module.exports = {
  '/':{
    get: controller.getAll,
    post: controller.newUser,
  },
  '/:id': {
    get: controller.getById,
    put: controller.setById,
  }
};

