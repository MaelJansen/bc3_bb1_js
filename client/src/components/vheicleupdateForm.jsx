import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const baseURI = import.meta.env.VITE_API_BASE_URL;

const VehiculeupdateForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const vehicle = location.state;
  const [updatedVehicle, setupdatedVehicle] = useState({ id: vehicle.id, brand: vehicle.brand, model: vehicle.model, year: vehicle.year });

  const handleChange = (e) => {
    setupdatedVehicle({
      ...updatedVehicle,
      [e.target.name]: e.target.value,
    });
  };

  const updateVehicle = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(baseURI + "api/vehicles/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedVehicle),
        credentials: "include",
      });
      if (response.ok) {
        alert("Véhicule modifier avec succès");
        navigate("/vehiclemanagement");
      } else {
        alert("Erreur lors de la modification");
      }
    } catch (error) {
      alert("Erreur réseau");
    }
  };

  return (
    <form className="signin-form" onSubmit={updateVehicle}>
      <h2>Modifier un véhicule</h2>
      <input type="text" name="brand" placeholder="Marque" value={updatedVehicle.brand} onChange={handleChange} required />
      <input type="text" name="model" placeholder="Modèle" value={updatedVehicle.model} onChange={handleChange} required />
      <input type="text" name="year" placeholder="Année" value={updatedVehicle.year} onChange={handleChange} required />
      <button type="submit">Modifier un véhicule</button>
    </form>
  );
};

export default VehiculeupdateForm;
