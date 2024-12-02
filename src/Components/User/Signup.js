import React, { useState, useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
// import Alert from "@material-ui/lab/Alert";
import Context from "../../Context";
import useStyles from "./Stylings/styleSignup";

// Renders a Register form to create an account. User is redirected
// to a welcome page once a form has been submitted.

export default function Signup() {
  const classes = useStyles();
  const history = useHistory();
  const { signup } = useContext(Context);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    imageUrl: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  const [disableBtn, setDisableBtn] = useState(true);

  console.debug(
    "Signup",
    "signup=",
    typeof signup,
    "formData=",
    formData,
    "formErrors=",
    formErrors
  );

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await signup(formData);
    console.log("🚀 ~ handleSubmit ~ result:", result);
    if (result.success) {
      history.push("/welcome");
    } else {
      setFormErrors(result.errors.response.data.error);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    let tempFormData = { ...formData, [name]: value };
    setFormData((data) => ({ ...data, [name]: value }));

    console.log(
      "asdfffff:: ",
      tempFormData.password.length < 8 ||
        tempFormData.imageUrl.length > 499 ||
        tempFormData.email.length < 8 ||
        tempFormData.firstName !== "" ||
        tempFormData.lastName !== "" ||
        tempFormData.username !== ""
    );

    if (
      tempFormData.firstName.length < 4 ||
      tempFormData.lastName.length < 4 ||
      tempFormData.password.length < 8 ||
      tempFormData.imageUrl.length > 499 ||
      tempFormData.email.length < 8 ||
      tempFormData.firstName === "" ||
      tempFormData.lastName === "" ||
      tempFormData.username === ""
    ) {
      setDisableBtn(true);
    } else setDisableBtn(false);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <a href="#hello"></a>
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          Hello
        </Typography>
        <br></br>
        <span style={{ display: "inline-block" }}>
          Create a freeBay account
        </span>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="imageUrl"
                label="Image URL (optional)"
                type="imageUrl"
                id="imageUrl"
                autoComplete="current-imageUrl"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          {formErrors.length > 0 && (
            <div>
              <br />
              <div>{formErrors}</div>
            </div>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onSubmit={handleSubmit}
            disabled={disableBtn}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/Login" variant="body2">
                Already have an account? Sign in
              </Link>
              <br />
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
