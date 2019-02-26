module.exports = {
  signUp: async (req, res, next) => {
    // need to validate Email & Password here
    console.log(`UsersController.signup() called`);
  },

  login: async (req, res, next) => {
    //generate token
    console.log(`UsersController.login() called`);
  },

  secret: async (req, res, next) => {
    console.log(`UsersController.secret() called`);
  }
};
