var express = require('express');
var router = express.Router();

const userModel = require('./users');
const postModel = require('./posts')
const passport = require('passport');
const upload = require('./multer')
const LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy(userModel.authenticate()))


/* GET home page. */
router.get('/',   function (req, res, next) {
  res.render('index');
  

});

//Handle file Upload
router.post('/upload', isLoggedIn, upload.single('file'), async (req, res) => {
  //access the uploaded file details via req.file
  if (!req.file) {
    return res.status(400).send('No files were uploaded')
  }
  const user = await userModel.findOne({ username: req.session.passport.user })
  const post = await postModel.create({
    imageURL: req.file.filename,
    imageText: req.body.imagecaption,
    user: user._id
  })
   user.posts.push(post._id)
   await user.save()
  res.redirect('/profile')
})



router.get('/login', function (req, res, next) {
  console.log(req.flash('error'));
  res.render('login', { error: req.flash('error') });
});

//Register
router.post('/register', (req, res) => {
  const userData = {
    username: req.body.username,
    fullname: req.body.fullname ,
    email: req.body.email
  };

  

  userModel.register(new userModel(userData), req.body.password, (err) => {
    if (err) {
      // Handle registration error
      console.error(err);
      return res.status(500).json({ error: err.message });
    }

    // Authentication after successful registration
    passport.authenticate('local')(req, res, function () {
      res.redirect('/profile');
    });
  });
});


//login
router.post("/login", passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}), (req, res) => {

});


//Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err) };
    res.redirect('/')
  })
})
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/')

}

//Profile
router.get('/profile', isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({
    username: req.session.passport.user
  })
  .populate('posts')

  res.render('profile', { user })
})

//feed
router.get('/feed',isLoggedIn ,async(req, res) => {
  const user = await userModel.findOne({username:req.session.passport.user})
   const posts =await  postModel.find()
  .populate('user')
  res.render('feed',{user,posts})
})

module.exports = router;
