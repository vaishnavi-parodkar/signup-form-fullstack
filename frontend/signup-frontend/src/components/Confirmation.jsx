import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Confirmation() {

  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {

    fetch(`http://localhost:8080/api/users/${id}`)
      .then(response => {

        if (!response.ok) {
          throw new Error("User not found");
        }

        return response.json();
      })
      .then(data => {
        setUser(data);
      })
      .catch(error => {
        console.error(error);
        setError(error.message);
      });

  }, [id]);

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container">

      <div className="form-box">

        <h1>Registration Successful</h1>

        <h2>
          Welcome {user.firstName}
        </h2>

        <hr />

        <p>
          <strong>First Name:</strong> {user.firstName}
        </p>

        <p>
          <strong>Last Name:</strong> {user.lastName}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Phone:</strong> {user.phone}
        </p>

        <p>
          <strong>Pincode:</strong> {user.pincode}
        </p>

        <p>
          <strong>Password:</strong> ********
        </p>

      </div>

    </div>
  );
}

export default Confirmation;