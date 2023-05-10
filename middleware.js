/*
You can choose to define all your middleware functions here, 
export them and then import them into your app.js and attach them that that.
add.use(myMiddleWare()). you can also just define them in the app.js if you like as seen in lecture 10's lecture code example. If you choose to write them in the app.js, you do not have to use this file. 
*/
// Auth middleware function
const exportedMethods={
    authRedirect(req, res, next){
      console.log(req.session.user,'midd');
    if (req.session.user) {
      if (req.session.user.role === 'User') {
        res.redirect(`/landingpage/homepage/${req.session.user.id}`);
      } else if (req.session.user.role === 'Rest') {
        res.redirect('/restaurant/restaurantsLogin');
      } else if (req.session.user.role === 'Fitness') {
        res.redirect('/fitness/fitnessprofile');
      }
      else if (req.session.user.role === 'Dietitian') {
        res.redirect('/dietitian/profile');
      }
    } else {
      res.redirect('/landingpage');
    }
  },
  
//   // Login redirect middleware function
//   loginRedirect(req, res, next){
//     if (req.session.user) {
//       if (req.session.user.role === 'admin') {
//         res.redirect('/admin');
//       } else if (req.session.user.role === 'user') {
//         res.redirect('/protected');
//       }
//     } else {
//       next();
//     }
//   },
  
//   // Register redirect middleware function
//   registerRedirect(req, res, next){
//     if (req.session.user) {
//       const { role } = req.user || {};
//       if (role === 'admin') {
//         res.redirect('/admin');
//       } else if (role === 'user') {
//         res.redirect('/protected');
//       }
//     } else {
//       next();
//     }
//   },
  
//   // Protected route middleware function
//   protectedRoute(req, res, next){
    
//     if (req.session.user) {
//       next();
//     } else {
//       res.redirect('/login');
//     }
//   },
  
//   // Admin route middleware function
//   adminRoute(req, res, next){
//     console.log(req.session.user,'role')
//     if (req.session.user) {
//       if (req.session.user.role === 'admin') {
//         next();
//       } else {
//         res.status(403).send('You do not have permission to view this page');
//       }
//     } else {
//       res.redirect('/login');
//     }
//   },
  
//   // Logout route middleware function
//   logoutRoute(req, res, next){
//     // console.log(req)
    
//     if (!req.session.user) {
//         res.redirect('/login');
//     } else {
//         next();
//     }
    
//   },
//   // Logging middleware function
//   logging(req, res, next){
//     let aunth;
//     if(req.session.user===null){
//       aunth='Non-Authenticated User'
//     }else{
//       aunth ='Authenticated User'
//     }
//     console.log(`[${new Date().toUTCString()}] ${req.method} ${req.originalUrl} User Authenticated: ${aunth}`);
//     next();
//   },
}

export default exportedMethods;
  
  