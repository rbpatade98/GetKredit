import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

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

const SignIn = () => {
  const navigate = useNavigate();
  const { signIn, error, setError } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Enter a valid email";

    if (!password) errs.password = "Password is required";

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      const success = signIn(email, password);
      setLoading(false);
      if (success) navigate("/Dashboard");
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
          Manage your leads, tasks, and team performance in one workspace.
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
            Welcome back
          </Typography>

          <Typography sx={{ color: "rgba(13,59,79,0.7)", mb: 3 }}>
            Sign in to your account
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
              sx={{ mb: 3, ...inputStyles }}
            />

            <Button
              type="submit"
              fullWidth
              sx={buttonStyles}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={22} sx={{ color: "#fff" }} />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <Typography
            sx={{ mt: 3, textAlign: "center", color: "rgba(13,59,79,0.7)" }}
          >
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              style={{ color: PRIMARY, fontWeight: 600, cursor: "pointer" }}
            >
              Sign up
            </span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;
