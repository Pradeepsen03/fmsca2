import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const DetailsPage = () => {
  const location = useLocation();
  const { record_id } = location.state || {}; // Remove rowData if not used

  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (record_id) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `https://fmsca-3doa.onrender.com/api/data/${record_id}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setApiData(data); // Assuming the data is an array
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [record_id]);

  // Define styles for the container and other elements
  const containerStyle = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    backgroundColor: "#f9f9f9",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const thStyle = {
    borderBottom: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  };

  const tdStyle = {
    borderBottom: "1px solid #ddd",
    padding: "8px",
  };

  // Helper function to format the label
  const formatLabel = (key) => {
    switch (key) {
      case "created_dt":
        return "Creation Date";
      case "data_source_modified_dt":
        return "Last Modified Date";
      case "entity_type":
        return "Entity Type";
      case "operating_status":
        return "Operating Status";
      case "legal_name":
        return "Legal Name";
      case "dba_name":
        return "DBA Name";
      case "physical_address":
        return "Physical Address";
      case "phone":
        return "Phone";
      case "usdot_number":
        return "USDOT Number";
      case "mc_mx_ff_number":
        return "MC/MX/FF Number";
      case "power_units":
        return "Power Units";
      case "out_of_service_date":
        return "Out of Service Date";
      case "mcs_150_form_date":
        return "MCS-150 Form Date";
      case "state_carrier_id_number":
        return "State Carrier ID Number";
      case "duns_number":
        return "DUNS Number";
      case "drivers":
        return "Number of Drivers";
      case "mcs_150_mileage_year":
        return "MCS-150 Mileage Year";
      case "id":
        return "ID";
      case "credit_score":
        return "Credit Score";
      case "record_status":
        return "Record Status";
      default:
        return key.replace(/_/g, " ").toUpperCase();
    }
  };

  // Function to get sections
  const getSections = (data) => {
    const basicInfo = [
      "created_dt",
      "data_source_modified_dt",
      "entity_type",
      "legal_name",
      "dba_name",
    ];

    const contactInfo = [
      "physical_address",
      "phone",
      "mailing_address",
      "m_street",
      "m_city",
      "m_state",
      "m_zip_code",
    ];

    const additionalDetails = [
      "usdot_number",
      "mc_mx_ff_number",
      "power_units",
      "mcs_150_form_date",
      "out_of_service_date",
      "state_carrier_id_number",
      "duns_number",
      "drivers",
      "mcs_150_mileage_year",
      "id",
      "credit_score",
      "record_status",
    ];

    return {
      basicInfo: basicInfo.map((key) => ({ key, value: data[key] })),
      contactInfo: contactInfo.map((key) => ({ key, value: data[key] })),
      additionalDetails: additionalDetails.map((key) => ({
        key,
        value: data[key],
      })),
    };
  };

  return (
    <div className="p-4">
      <div style={containerStyle}>
        <h2 className="text-xl font-semibold my-6 text-center">
          USDOT Information
        </h2>
        {loading && <p>Loading data...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && apiData.length > 0 ? (
          <>
            {Object.entries(getSections(apiData[0])).map(
              ([sectionName, sectionData]) => (
                <div key={sectionName} style={{ marginBottom: "24px" }}>
                  <h3 className="text-lg font-semibold text-center">
                    {formatSectionName(sectionName)}
                  </h3>
                  <table style={tableStyle}>
                    <tbody>
                      {sectionData.map(({ key, value }) => (
                        <tr key={key}>
                          <td style={tdStyle}>{formatLabel(key)}</td>
                          <td style={tdStyle}>{value || "---"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            )}
          </>
        ) : (
          !loading && !error && <p>No data available</p>
        )}
      </div>
    </div>
  );
};

// Helper function to format section names
const formatSectionName = (sectionName) => {
  switch (sectionName) {
    // case "basicInfo":
    //   return "Basic Information";
    case "contactInfo":
      return "Operating Authority Information";
    case "additionalDetails":
      return "Company Information";
    default:
      return sectionName.replace(/_/g, " ").toUpperCase();
  }
};

export default DetailsPage;
