import { Router } from "express";
import validation from "../helpers.js";
import appointmentData from "../data/appointments.js";
import dietitianData from "../data/dietitians.js";
const router = Router();

router
  .route("/login")
  .get(async (req, res) => {
    return res.render("dietitianLogin", {
      title: "Login",
      header: "Login as Dietitian",
    });
  })
  .post(async (req, res) => {
    //code here for POST
    let emailAddress = req.body.emailInput;
    let password = req.body.passwordInput;
    try {
      emailAddress = validation.stringValidation(emailAddress, "Email Address");
      emailAddress = req.body.emailInput.toLowerCase();
      emailAddress = validation.emailValidation(emailAddress);
      password = validation.passwordValidation(password);
    } catch (e) {
      return res.status(400).render("dietitianLogin", {
        title: "Login",
        header: "Login as Dietitian",
        emailInput: emailAddress,
        passwordInput: password,
        error: e,
      });
    }

    try {
      let dietitian = await dietitianData.checkDietitian(
        req.body.emailInput,
        req.body.passwordInput
      );
      if (dietitian._id) {
        req.session.user = {
          id: dietitian._id,
          firstName: dietitian.firstName,
          lastName: dietitian.lastName,
          emailAddress: dietitian.emailAddress,
          address: dietitian.address,
          zipcode: dietitian.zipcode,
          phoneNumber: dietitian.phoneNumber,
          city: dietitian.city,
          state: dietitian.state,
          fees: dietitian.fees,
          description: dietitian.description,
          rating: dietitian.rating,
          role: dietitian.role,
          verified: dietitian.verified
        };

        res.redirect("/");
      } else {
        throw `Either email address or password is invalid`;
      }
    } catch (e) {
      return res.status(400).render("dietitianLogin", {
        title: "Login",
        header: "Login as Dietitian",
        emailInput: req.body.emailInput,
        passwordInput: req.body.passwordInput,
        error: e,
      });
    }

    return res.status(500).render("error", {
      title: "Error 500",
      header: "Error 500",
      error: "Internal Server Error",
    });
  });

router
  .route("/register")
  .get(async (req, res) => {
    return res.render("dietitianRegister", {
      title: "Register",
      header: "Register as Dietitian",
    });
  })
  .post(async (req, res) => {
    let firstName = req.body.firstNameInput;
    let lastName = req.body.lastNameInput;
    let emailAddress = req.body.emailInput;
    let password = req.body.passwordInput;
    let confirmPassword = req.body.confirmPasswordInput;
    let address = req.body.addressInput;
    let zipcode = req.body.zipCodeInput;
    let city = req.body.cityInput;
    let state = req.body.stateInput;
    let description = req.body.descriptionInput;
    let phoneNumber = req.body.phoneNumberInput;
    let fees = req.body.feesInput;

    try {
      firstName = validation.stringValidation(firstName, "First Name");
      firstName = validation.nameValid(firstName, "First Name");
      lastName = validation.stringValidation(lastName, "Last Name");
      lastName = validation.nameValid(lastName, "Last Name");
      emailAddress = validation.stringValidation(emailAddress, "Email Address");
      emailAddress = validation.emailValidation(emailAddress);
      emailAddress = emailAddress.toLowerCase();
      phoneNumber = validation.phoneNumberValidation(phoneNumber);
      password = validation.stringValidation(password, "Password");
      password = validation.passwordValidation(password);
      confirmPassword = validation.confirmPaswordValidation(
        password,
        confirmPassword
      );
      address = validation.stringValidation(address, "Address");
      zipcode = validation.zipCodeValidation(zipcode);
      phoneNumber = validation.phoneNumberValidation(phoneNumber);
      description = validation.stringValidation(description, "Description");
      state = validation.stringValidation(state, "State");
      city = validation.stringValidation(city, "City");
      fees = validation.checkNumber(fees, "Fees");
    } catch (e) {
      return res.status(400).render("dietitianRegister", {
        title: "Register",
        header: "Register as Dietitian",
        firstNameInput: firstName,
        lastNameInput: lastName,
        emailInput: emailAddress,
        passwordInput: password,
        confirmPasswordInput: confirmPassword,
        addressInput: address,
        cityInput: city,
        descriptionInput: description,
        stateInput: state,
        zipCodeInput: zipcode,
        phoneNumberInput: phoneNumber,
        feesInput: fees,
        error: e,
      });
    }

    try {
      let newDietitian = await dietitianData.createDietitian({
        firstName,
        lastName,
        emailAddress,
        password,
        confirmPassword,
        address,
        zipcode,
        city,
        state,
        description,
        phoneNumber,
        fees,
      });
      if (newDietitian) {
        return res.redirect("/dietitian/login");
      }
    } catch (e) {
      return res.status(400).render("dietitianRegister", {
        title: "Register",
        header: "Register as Dietitian",
        firstNameInput: firstName,
        lastNameInput: lastName,
        emailInput: emailAddress,
        passwordInput: password,
        confirmPasswordInput: confirmPassword,
        addressInput: address,
        cityInput: city,
        descriptionInput: description,
        stateInput: state,
        zipCodeInput: zipcode,
        phoneNumberInput: phoneNumber,
        feesInput: fees,
        error: e,
      });
    }

    return res.status(500).render("error", {
      title: "Error 500",
      header: "Error 500",
      error: "Internal Server Error",
    });
  });

router.route("/profile").get(async (req, res) => {
  if (req.session?.user?.role === "Dietitian") {
    let firstName = req.session.user.firstName;
    let lastName = req.session.user.lastName;
    let emailAddress = req.session.user.emailAddress;
    let address = req.session.user.address;
    let zipcode = req.session.user.zipcode;
    let state = req.session.user.state;
    let city = req.session.user.city;
    let phoneNumber = req.session.user.phoneNumber;
    let description = req.session.user.description;
    let fees = req.session.user.fees;
    let verified = req.session.user.verified;

    return res.render("dietitianProfile", {
      title: "Profile",
      header: "My Profile",
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      phoneNumber: phoneNumber,
      address: address,
      zipCode: zipcode,
      city: city,
      state: state,
      verified: verified,
      fees: fees,
      description: description,
      edit: true,
    });
  } else {
    res.redirect("/");
  }
});

router
  .route("/profile/edit")
  .get(async (req, res) => {
    if (req.session?.user?.role === "Dietitian") {
      const firstName = req.session.user.firstName;
      const lastName = req.session.user.lastName;
      const emailAddress = req.session.user.emailAddress;
      let address = req.session.user.address;
      let zipcode = req.session.user.zipcode;
      let city = req.session.user.city;
      let state = req.session.user.state;
      let description = req.session.user.description;
      let phoneNumber = req.session.user.phoneNumber;
      let fees = req.session.user.fees;

      return res.status(400).render("editDietitian", {
        title: "Edit",
        header: "Edit Profile",
        firstName: firstName,
        lastName: lastName,
        emailAddress: emailAddress,
        addressInput: address,
        cityInput: city,
        descriptionInput: description,
        stateInput: state,
        zipCodeInput: zipcode,
        phoneNumberInput: phoneNumber,
        feesInput: fees,
      });
    } else {
      res.redirect("/");
    }
  })
  .post(async (req, res) => {
    if (req.session?.user?.role === "Dietitian") {
      const id = req.session.user.id;
      const firstName = req.session.user.firstName;
      const lastName = req.session.user.lastName;
      const emailAddress = req.session.user.emailAddress;
      let address = req.body.addressInput;
      let zipcode = req.body.zipCodeInput;
      let city = req.body.cityInput;
      let state = req.body.stateInput;
      let description = req.body.descriptionInput;
      let phoneNumber = req.body.phoneNumberInput;
      let fees = req.body.feesInput;

      try {
        phoneNumber = validation.phoneNumberValidation(phoneNumber);
        address = validation.stringValidation(address, "Address");
        zipcode = validation.zipCodeValidation(zipcode);
        description = validation.stringValidation(description, "Description");
        state = validation.stringValidation(state, "State");
        city = validation.stringValidation(city, "City");
        fees = validation.checkNumber(fees, "Fees");
      } catch (e) {
        return res.status(400).render("editDietitian", {
          title: "Edit",
          header: "Edit Profile",
          firstName: firstName,
          lastName: lastName,
          emailAddress: emailAddress,
          addressInput: address,
          cityInput: city,
          descriptionInput: description,
          stateInput: state,
          zipCodeInput: zipcode,
          phoneNumberInput: phoneNumber,
          feesInput: fees,
          error: e,
        });
      }

      try {
        let updateDietitian = await dietitianData.updateDietitian({
          id,
          address,
          zipcode,
          city,
          state,
          description,
          phoneNumber,
          fees,
        });
        if (updateDietitian) {
          req.session.user.zipcode = updateDietitian.zipcode
          req.session.user.phoneNumber = updateDietitian.phoneNumber
          req.session.user.city = updateDietitian.city
          req.session.user.state = updateDietitian.state
          req.session.user.fees = updateDietitian.fees
          req.session.user.address = updateDietitian.address
          res.redirect("/dietitian/profile");
        }
      } catch (e) {
        return res.status(400).render("editDietitian", {
          title: "Edit",
          header: "Edit Profile",
          firstName: firstName,
          lastName: lastName,
          emailAddress: emailAddress,
          addressInput: address,
          cityInput: city,
          descriptionInput: description,
          stateInput: state,
          zipCodeInput: zipcode,
          phoneNumberInput: phoneNumber,
          feesInput: fees,
          error: e,
        });
      }
    } else {
      res.redirect("/");
    }

    res.status(500).render("error", {
      title: "Error 500",
      header: "Error 500",
      error: "Internal Server Error",
    });
  });

  router.route("/profile/delete").get(async (req, res) => {
    if (req.session?.user?.role === "Dietitian") {
      const id = req.session.user.id;
      try {
        const deleteDietitian = await dietitianData.removeDietitian(id);
        if (deleteDietitian) {
          req.session.destroy();
          res.redirect("/");
        }
      } catch (e) {
        return res.status(400).render("error", {
          title: "Error",
          error: e,
        });
      }
    } else {
      res.redirect("/");
    }
  
    res.status(500).render("error", {
      title: "Error 500",
      header: "Error 500",
      error: "Internal Server Error",
    });
  });

router.route("/profile/:id").get(async (req, res) => {
  let id = req.params.id;
  try{
    id = validation.idValidation(id,"ID")
  }catch(err){
    res.status(404).render("error", { title: "Page Not Found" });
  }
  try {
    const dietitian = await dietitianData.getDietitianById(id);

    let firstName = dietitian.firstName;
    let lastName = dietitian.lastName;
    let emailAddress = dietitian.emailAddress;
    let address = dietitian.address;
    let zipcode = dietitian.zipcode;
    let age = dietitian.age;
    let state = dietitian.state;
    let city = dietitian.city;
    let phoneNumber = dietitian.phoneNumber;
    let description = dietitian.description;
    let fees = dietitian.fees;
    let bookappointment = false;

    if (req.session?.user?.role === "User") bookappointment = true;

    res.render("dietitianProfile", {
      title: "Profile",
      header: "Dietitian Profile",
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      phoneNumber: phoneNumber,
      age: age,
      address: address,
      zipCode: zipcode,
      city: city,
      state: state,
      fees: fees,
      description: description,
      bookappointment,
      id,
      verified:dietitian.verified
    });
  } catch (e) {
    return res.status(400).render("error", {
      title: "Error",
      error: e,
    });
  }
});



router
  .route("/bookappointment/:id")
  .get(async (req, res) => {
    if (req.session?.user?.role === "User") {
      const id = req.params.id;

      try {
        const dietitian = await dietitianData.getDietitianById(id);
        return res.render("bookappointment", {
          title: "Appointment",
          header: `Dietitian Appointment with ${dietitian.firstName} ${dietitian.lastName}`,
          id
        });
      } catch (err) {
        return res
          .status(400)
          .render("error", { title: "Invalid ID", error: err });
      }
    } else {
      res.redirect("/");
    }
  })
  .post(async (req, res) => {
    if (req.session?.user?.role === "User") {
      const id = req.params.id;
      let dietitian;

      try {
        dietitian = await dietitianData.getDietitianById(id);
        if (!dietitian.verified)
          throw "You cannot book appointment for this dietitian";
      } catch (e) {
        return res.status(400).render("error", {
          title: "Error",
          error: e,
        });
      }

      const data = req.body;
      data["dietitianId"] = id;
      data["userId"] = req.session?.user?.id;
      const startTime = req.body.startTime.split(":");
      data["endTime"] =
        (parseInt(startTime[0]) + 1).toString() + ":" + startTime[1];
      try {
        const result = await appointmentData.createAppointment(data);
        if (result)
          return res.render("bookappointment", {
            title: "Appointment",
            header: `Appointment with ${dietitian.firstName} ${dietitian.lastName} has been booked sucessfully`,
            id
          });
      } catch (err) {
        return res.status(400).render("error", {
          title: "Appointment",
          error: err,
        });
      }
    } else {
      res.redirect("/");
    }
  });

router.route("*").get(async (req, res) => {
  res.status(404).render("error", { title: "Page Not Found" });
});

export default router;
