module.exports = function (req, res, next) {
  const { nom, prenom, email, password, numero_de_telephone, grade } = req.body;

  function validEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  let errorMessage;

  if (req.path === "/register") {
    if (![nom, prenom, email, password, numero_de_telephone, grade].every(Boolean)) {
      errorMessage = "All fields are required";
    } else if (!validEmail(email)) {
      errorMessage = "Invalid Email";
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      errorMessage = "Email and password are required";
    } else if (!validEmail(email)) {
      errorMessage = "Invalid Email";
    }
  }

  if (errorMessage) {
    return res.status(400).send(errorMessage);
  }

  next();
};
