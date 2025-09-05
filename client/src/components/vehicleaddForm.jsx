import { useState } from "react";
import { useNavigate } from "react-router-dom";
const baseURI = import.meta.env.VITE_API_BASE_URL;

const VehicleaddForm = () => {
  const navigate = useNavigate();
  const [newVehicle, setNewVehicle] = useState({ id: "", brand: "", model: "", year: "" });

  const handleChange = (e) => {
    setNewVehicle({
      ...newVehicle,
      [e.target.name]: e.target.value,
    });
  };

  const addVehicle = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(baseURI + "api/vehicles/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVehicle),
        credentials: "include",
      });
      if (response.ok) {
        alert("Véhicule créer avec succès");
        navigate("/vehiclemanagement");
      } else {
        alert("Erreur lors de la création");
      }
    } catch (error) {
      alert("Erreur réseau");
    }
  };

  return (
    <form className="signin-form" onSubmit={addVehicle}>
      <h2>Ajouter un véhicule</h2>
      <input type="text" name="id" placeholder="Immatriculation" value={newVehicle.id} onChange={handleChange} required />
      <input type="text" name="brand" placeholder="Marque" value={newVehicle.brand} onChange={handleChange} required />
      <input type="text" name="model" placeholder="Modèle" value={newVehicle.model} onChange={handleChange} required />
      <input type="text" name="year" placeholder="Année" value={newVehicle.year} onChange={handleChange} required />
      <button type="submit">Créer un véhicule</button>
    </form>
  );
};

export default VehicleaddForm;
