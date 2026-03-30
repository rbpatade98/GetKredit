import React, { useState } from "react";
import {
  Box, Button, TextField, Typography, Alert, CircularProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuth from "../../app/useAuth";

const PRIMARY = "#0d3b4f";

const inputStyles = {
  "& .MuiOutlinedInput-root": {
    background: "rgba(13,59,79,0.04)",
    borderRadius: "12px",

    "& fieldset": {
      borderColor: "rgba(13,59,79,0.15)",
    },

    "&:hover fieldset": {
      borderColor: PRIMARY,
    },

    "&.Mui-focused fieldset": {
      borderColor: PRIMARY,
      borderWidth: "1.5px",
    },
  },
};

const buttonStyles = {
  background: PRIMARY,
  color: "#ffffff",
  borderRadius: "12px",
  fontWeight: 600,
  textTransform: "none",
  fontSize: "15px",
  py: 1.4,
  boxShadow: "0 6px 18px rgba(13,59,79,0.2)",

  "&:hover": {
    background: "rgba(13,59,79,0.9)",
  },
};

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp, error, setError } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const validate = () => {
    const errs = {};

    if (!email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Enter a valid email";

    if (!password) errs.password = "Password is required";
    else if (password.length < 6) errs.password = "Minimum 6 characters";

    if (!confirmPassword) errs.confirmPassword = "Confirm your password";
    else if (password !== confirmPassword) errs.confirmPassword = "Passwords do not match";

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      const success = signUp(email, password);
      setLoading(false);
      if (success) navigate("/users");
    }, 800);
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex" }}>

      {/* LEFT PANEL */}
      <Box
        sx={{
          width: { xs: "0%", md: "50%" },
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          px: 8,
          borderRight: "1px solid rgba(13,59,79,0.08)",
        }}
      >
        <Typography sx={{ fontSize: 36, fontWeight: 800, color: PRIMARY }}>
          GetKredit
        </Typography>

        <Typography sx={{ mt: 2, color: "rgba(13,59,79,0.7)", maxWidth: 360 }}>
          Create your account and start managing your business smarter.
        </Typography>
      </Box>

      {/* RIGHT PANEL */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 3,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 380 }}>

          <Typography sx={{ fontSize: 28, fontWeight: 700, color: PRIMARY }}>
            Create account
          </Typography>

          <Typography sx={{ color: "rgba(13,59,79,0.7)", mb: 3 }}>
            Sign up to get started
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setFieldErrors((p) => ({ ...p, email: "" }));
              }}
              error={!!fieldErrors.email}
              helperText={fieldErrors.email}
              sx={{ mb: 2, ...inputStyles }}
            />

            <TextField
              fullWidth
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setFieldErrors((p) => ({ ...p, password: "" }));
              }}
              error={!!fieldErrors.password}
              helperText={fieldErrors.password}
              sx={{ mb: 2, ...inputStyles }}
            />

            <TextField
              fullWidth
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setFieldErrors((p) => ({ ...p, confirmPassword: "" }));
              }}
              error={!!fieldErrors.confirmPassword}
              helperText={fieldErrors.confirmPassword}
              sx={{ mb: 3, ...inputStyles }}
            />

            <Button type="submit" fullWidth sx={buttonStyles} disabled={loading}>
              {loading ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : "Create Account"}
            </Button>
          </form>

          <Typography sx={{ mt: 3, textAlign: "center", color: "rgba(13,59,79,0.7)" }}>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/signin")}
              style={{ color: PRIMARY, fontWeight: 600, cursor: "pointer" }}
            >
              Sign in
            </span>
          </Typography>

        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;