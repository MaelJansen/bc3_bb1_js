import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./vehiclemanagement.css";
const baseURI = import.meta.env.VITE_API_BASE_URL;

const VehicleManagement = () => {
  const navigate = useNavigate();
  const [vehicleList, setVehicleList] = useState([]);

  const fetchVehicleList = async () => {
    try {
      const response = await fetch(baseURI + "api/vehicles", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setVehicleList(data);
        console.log(vehicleList);
      } else {
        alert("Erreur lors de la récupération des véhicules");
      }
    } catch (err) {
      alert("Erreur réseau");
    }
  };

  useEffect(() => {
    fetchVehicleList();
  }, []);

  const goToAddVehicle = () => {
    navigate("/vehicleaddform");
  };

  const gotToUpdate = (vehicle) => {
    navigate("/vehiculeupdateform", { state: vehicle });
  };

  const deleteVehicle = async (vehicle) => {
    try {
      const response = await fetch(baseURI + "api/vehicles/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicle),
        credentials: "include",
      });
      if (response.ok) {
        alert("Véhicule supprimé avec succès");
        fetchVehicleList();
      } else {
        alert("Erreur lors de la suppression");
      }
    } catch (error) {
      alert("Erreur réseau");
    }
  };

  return (
    <div className="vehiclemanagement-container">
      <div className="vehiclemanagement-header">
        <h1>Menu gestion des véhicules</h1>
      </div>

      <div className="vehiclemanagement-actions">
        <button className="action-button" onClick={goToAddVehicle}>
          Ajouter des véhicules
        </button>
      </div>

      <div className="vehiclemanagement-list">
        {vehicleList && vehicleList.length > 0 ? (
          vehicleList.map((vehicle) => (
            <div className="vehicle-card" key={vehicle.id}>
              <h3>
                {vehicle.brand} {vehicle.model} ({vehicle.year})
              </h3>
              <button onClick={() => gotToUpdate(vehicle)}>Modifier</button>
              <button onClick={() => deleteVehicle(vehicle)}>Supprimer</button>
              <div className="vehicle-id">{vehicle.id}</div>
              <div className="vehicle-client">ID Client associé {vehicle.client_id}</div>
            </div>
          ))
        ) : (
          <p>Chargement des véhicules ...</p>
        )}
      </div>
    </div>
  );
};

export default VehicleManagement;
