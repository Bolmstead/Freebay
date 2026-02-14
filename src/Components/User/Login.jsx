import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../Context";
import useStyles from "./Stylings/styleLogin";
import Alert from "@mui/material/Alert";

// Renders a login form. User is redirected to home page once logged in

export default function Login() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { login } = useUserContext();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /companies.
   */

  async function handleSubmit(evt) {
    evt.preventDefault();
    const result = await login(formData);
    if (result.success) {
      navigate("/");
    } else {
      setFormErrors(result.errors.response.data.error.message);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((l) => ({ ...l, [name]: value }));
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <a href="#hello" id="hello"></a>
      <div className={classes.paper}>
        <Typography component="h1" variant="h4" id="hello">
          Hello
        </Typography>
        <br></br>
        <span style={{ display: "inline-block" }}>Log in to freeBay</span>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
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
          </Grid>
          {formErrors.length ? (
            <div>
              <br />
              <Alert variant="filled" severity="error">
                {formErrors}
              </Alert>
            </div>
          ) : null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onSubmit={handleSubmit}
          >
            Login
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/Signup" variant="body2">
                Don't have an account? Create one here
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
