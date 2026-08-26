import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    repeatPassword: "",
    pincode: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
      general: ""
    }));
  };

  // Frontend validation
  const validateForm = () => {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      repeatPassword,
      pincode
    } = formData;

    const newErrors = {};

    // First Name
    if (!firstName.trim()) {
      newErrors.firstName = "First Name is required";
    } else if (!/^[A-Za-z]+$/.test(firstName)) {
      newErrors.firstName =
        "First Name should contain only alphabets";
    }

    // Last Name
    if (!lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    } else if (!/^[A-Za-z]+$/.test(lastName)) {
      newErrors.lastName =
        "Last Name should contain only alphabets";
    }

    // Email
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    // Phone
    if (!phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else {
      /*
       * Without +
       * Exactly 10 digits
       * Cannot start with 0
       *
       * With +
       * Exactly 13 digits after +
       * Cannot start with 0
       */
      const phonePattern =
        /^(?:\+[1-9]\d{12}|[1-9]\d{9})$/;

      if (!phonePattern.test(phone)) {
        newErrors.phone =
          "Enter a valid phone number";
      }
    }

    // Password
    if (!password) {
      newErrors.password = "Password is required";
    } else {
      const passwordPattern =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$&!]).{6,}$/;

      if (!passwordPattern.test(password)) {
        newErrors.password =
          "Password must contain at least 6 characters, one alphabet, one number and one special character among @ # $ & !";
      }
    }

    // Repeat Password
    if (!repeatPassword) {
      newErrors.repeatPassword =
        "Repeat Password is required";
    } else if (password !== repeatPassword) {
      newErrors.repeatPassword =
        "Passwords do not match";
    }

    // Pincode format
    if (!pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(pincode)) {
      newErrors.pincode =
        "Pincode must contain 6 digits";
    }

    return newErrors;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    // Frontend validation
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const text = await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }

      // Backend validation failed
      if (!response.ok) {
        const message =
          typeof data === "string"
            ? data
            : data.message || "Registration failed";

        // Show pincode error specifically
        if (
          message.toLowerCase().includes("pincode")
        ) {
          setErrors({
            pincode: message
          });
        } else if (
          message.toLowerCase().includes("email")
        ) {
          setErrors({
            email: message
          });
        } else {
          setErrors({
            general: message
          });
        }

        return;
      }

      // Successful registration
      console.log("Registration successful:", data);

      if (!data.id) {
        setErrors({
          general:
            "Registration successful, but user ID was not returned."
        });

        return;
      }

      // Go to confirmation page
      navigate(`/confirmation/${data.id}`);

    } catch (error) {
      console.error("Signup error:", error);

      setErrors({
        general:
          "Unable to connect to the server. Make sure Spring Boot is running on port 8080."
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">

      <div className="form-box">

        <h1>Sign Up</h1>

        {/* General Error */}
        {errors.general && (
          <p className="error general-error">
            {errors.general}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          {/* FIRST NAME */}
          <label>
            First Name <span className="required">*</span>
          </label>

          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
          />

          {errors.firstName && (
            <p className="error">
              {errors.firstName}
            </p>
          )}

          {/* LAST NAME */}
          <label>
            Last Name <span className="required">*</span>
          </label>

          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
          />

          {errors.lastName && (
            <p className="error">
              {errors.lastName}
            </p>
          )}

          {/* EMAIL */}
          <label>
            Email <span className="required">*</span>
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />

          {errors.email && (
            <p className="error">
              {errors.email}
            </p>
          )}

          {/* PHONE */}
          <label>
            Phone Number <span className="required">*</span>
          </label>

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="9876543210 or +9198765432101"
          />

          {errors.phone && (
            <p className="error">
              {errors.phone}
            </p>
          )}

          {/* PASSWORD */}
          <label>
            Password <span className="required">*</span>
          </label>

          <div className="password-wrapper">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />

            {/* Normal eye icon inside input */}
            <span
              className="password-eye"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              title={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                  <circle cx="12" cy="12" r="3" />
                  <line x1="3" y1="3" x2="21" y2="21" />
                </svg>
              )}
            </span>

          </div>

          {errors.password && (
            <p className="error">
              {errors.password}
            </p>
          )}

          {/* REPEAT PASSWORD */}
          <label>
            Repeat Password <span className="required">*</span>
          </label>

          <div className="password-wrapper">

            <input
              type={showRepeatPassword ? "text" : "password"}
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleChange}
              placeholder="Repeat password"
            />

            {/* Normal eye icon inside input */}
            <span
              className="password-eye"
              onClick={() =>
                setShowRepeatPassword(!showRepeatPassword)
              }
              title={
                showRepeatPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showRepeatPassword ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                  <circle cx="12" cy="12" r="3" />
                  <line x1="3" y1="3" x2="21" y2="21" />
                </svg>
              )}
            </span>

          </div>

          {errors.repeatPassword && (
            <p className="error">
              {errors.repeatPassword}
            </p>
          )}

          {/* PINCODE */}
          <label>
            Pincode <span className="required">*</span>
          </label>

          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Enter 6 digit pincode"
            maxLength="6"
          />

          {errors.pincode && (
            <p className="error">
              {errors.pincode}
            </p>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Signup;