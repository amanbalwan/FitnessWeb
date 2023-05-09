
const exportedMethods={
    authRedirect(req, res, next){

    if (req.session.Fitcen) {
      if (req.session.Fitcen.role === 'admin') {
        res.redirect('/admin');
      } else if (req.session.Fitcen.role === 'Fitcen') {
        res.redirect('/protected');
      }
    } else {
      res.redirect('/loginFitcen');
    }
  },
  

}

export default exportedMethods;
  
  