"use client";
import React, { useState } from "react";

const InviteCard = () => {
  const [showForm, setShowForm] = useState(false);
  const [policies, setPolicies] = useState([]);
  const [formData, setFormData] = useState({
    policyName: "",
    companyName: "",
    policyNumber: "",
    startDate: "",
    endDate: "",
    policyStatus: "active",
    policyLocation: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Add the new policy to the policies state
    setPolicies([...policies, formData]);

    // Reset form data
    setFormData({
      policyName: "",
      companyName: "",
      policyNumber: "",
      startDate: "",
      endDate: "",
      policyStatus: "active",
      policyLocation: "",
    });

    // Hide the form
    setShowForm(false);
  };

  // Handle cancel button click
  const handleCancel = () => {
    setShowForm(false); // Hide the form
    setFormData({
      policyName: "",
      companyName: "",
      policyNumber: "",
      startDate: "",
      endDate: "",
      policyStatus: "active",
      policyLocation: "",
    }); // Reset form data
  };

  return (
    <div className="p-6">
      {/* Add New Policy Button */}
      <button
        onClick={() => setShowForm(true)}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg mb-6"
      >
        Add new policy
      </button>

      {/* Policy Form (Conditionally Rendered) */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Policy</h2>
            <form onSubmit={handleSubmit}>
              {/* Policy Name */}
              <div className="mb-4">
                <label className="block mb-1">Policy Name</label>
                <input
                  type="text"
                  name="policyName"
                  value={formData.policyName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter policy name"
                  required
                />
              </div>

              {/* Company Name */}
              <div className="mb-4">
                <label className="block mb-1">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter company name"
                  required
                />
              </div>

              {/* Policy Number */}
              <div className="mb-4">
                <label className="block mb-1">Policy Number</label>
                <input
                  type="text"
                  name="policyNumber"
                  value={formData.policyNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter policy number"
                  required
                />
              </div>

              {/* Start and End Date */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-1">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>

              {/* Policy Status */}
              <div className="mb-4">
                <label className="block mb-1">Policy Status</label>
                <select
                  name="policyStatus"
                  value={formData.policyStatus}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              {/* Policy Location */}
              <div className="mb-4">
                <label className="block mb-1">Policy Location</label>
                <input
                  type="text"
                  name="policyLocation"
                  value={formData.policyLocation}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter policy location"
                  required
                />
              </div>

              {/* Submit and Cancel Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded"
                >
                  Submit Policy
                </button>
                <button
                  type="button" // Important: Use type="button" to prevent form submission
                  onClick={handleCancel}
                  className="w-full bg-gray-500 text-white py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Display Policy Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {policies.map((policy, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="mb-4">
              <h2 className="text-xl font-bold">Policy</h2>
              <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                {policy.policyStatus}
              </span>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">{policy.companyName}</h3>
              <p className="text-sm text-gray-600">{policy.policyNumber}</p>
            </div>
            <div className="mb-4">
              <h4 className="text-md font-medium">{policy.policyName}</h4>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Starts</p>
                <p className="text-md font-medium">{policy.startDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Ends</p>
                <p className="text-md font-medium">{policy.endDate}</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500">Location</p>
              <p className="text-md font-medium">{policy.policyLocation}</p>
            </div>
            <button className="w-full bg-blue-500 text-white py-2 rounded">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InviteCard;