"use client";

import { useState } from "react";
import Image from "next/image";
import { MoreHorizontal, Edit2, Eye, Search, Plus, Calendar, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function TravelPackages() {
  const [isFormVisible, setIsFormVisible] = useState(false); // State to control form visibility

  const packages = [
    {
      id: 1,
      name: "Tour of Cambodia",
      destination: "South Korea",
      category: "Tour",
      days: "27-29 July",
      duration: "3 days",
      price: "$125",
      status: "Active",
      thumbnail: "/path/to/image.jpg", // Provide a valid image path
    },
    // Add more package data as needed
  ];

  const handleOpenForm = () => setIsFormVisible(true);
  const handleCloseForm = () => setIsFormVisible(false);

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">View All Tours</h1>
        <Button onClick={handleOpenForm}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Tour
        </Button>
      </div>

      {/* Conditionally render the AddPackageForm or the table */}
      {isFormVisible ? (
        <AddPackageForm onClose={handleCloseForm} />
      ) : (
        <>
          {/* Search and Filter Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search by ID" className="pl-9" />
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search by tour name" className="pl-9" />
            </div>
            <Select>
              <SelectTrigger>
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sort by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="all">All Status</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table Section */}
          <div className="rounded-lg border bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Package name</TableHead>
                  <TableHead>Where to</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {packages.map((pkg) => (
                  <TableRow key={pkg.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {pkg.thumbnail ? (
                          <div className="h-16 w-16 overflow-hidden rounded-lg">
                            <Image
                              src={pkg.thumbnail}
                              alt={pkg.name}
                              width={64}
                              height={64}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-16 w-16 overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center">
                            <span className="text-xs text-gray-500">No Image</span>
                          </div>
                        )}
                        <span className="font-medium">{pkg.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{pkg.destination}</TableCell>
                    <TableCell>{pkg.category}</TableCell>
                    <TableCell>{pkg.days}</TableCell>
                    <TableCell>{pkg.duration}</TableCell>
                    <TableCell>{pkg.price}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        {pkg.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
}














//    AddPackageForm   
function AddPackageForm({ onClose }) {
  const [files, setFiles] = useState([]);
  const [showAllImages, setShowAllImages] = useState(false); // State to control "Show More" dropdown
  const [totalPayment, setTotalPayment] = useState(35);
  const [formData, setFormData] = useState({
    packageName: "",
    location: "",
    description: "",
    packageDescription: "",
    category: "",
    type: "",
    days: 0,
    startDate: "",
    endDate: "",
    status: "",
    transportation: "bus",
    quantity: 1,
    price: 35,
    amenities: {
      wifi: false,
      breakfast: false,
      washroom: false,
      taxiboat: false,
      security: false,
      insurance: false,
      documented: false,
      healing: false,
    },
  });

  // Handle file input change (when clicking "Browse Files")
  const handleFileInputChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // Validate file types and sizes
    const validFiles = selectedFiles.filter((file) => {
      const isImage = file.type.startsWith("image/");
      const isSizeValid = file.size <= 5 * 1024 * 1024; // 5MB limit
      return isImage && isSizeValid;
    });

    if (validFiles.length !== selectedFiles.length) {
      alert("Only image files under 5MB are allowed.");
    }

    if (files.length + validFiles.length > 7) {
      alert("You can only upload a maximum of 7 images.");
      return;
    }

    setFiles((prevFiles) => [...prevFiles, ...validFiles]);

    // Reset the file input to allow additional uploads
    e.target.value = null;
  };

  // Handle drag-and-drop file upload
  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);

    // Validate file types and sizes
    const validFiles = droppedFiles.filter((file) => {
      const isImage = file.type.startsWith("image/");
      const isSizeValid = file.size <= 5 * 1024 * 1024; // 5MB limit
      return isImage && isSizeValid;
    });

    if (validFiles.length !== droppedFiles.length) {
      alert("Only image files under 5MB are allowed.");
    }

    if (files.length + validFiles.length > 7) {
      alert("You can only upload a maximum of 7 images.");
      return;
    }

    setFiles((prevFiles) => [...prevFiles, ...validFiles]);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle checkbox change for amenities
  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      amenities: { ...prev.amenities, [id]: checked },
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Files:", files);
    // Add logic to submit the form data and files
  };

  // Function to toggle "Show More" dropdown
  const toggleShowAllImages = () => {
    setShowAllImages((prev) => !prev);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Add New Package</h1>
        <Button variant="outline" size="sm" className="text-green-500" onClick={onClose}>
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="packageName"  className="text-lg">Package name</Label>
                <Input
                  id="packageName"
                  placeholder="Package name"
                  value={formData.packageName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="packageName" className="text-lg">Price</Label>
                <Input
                  id="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="location"  className="text-lg">Location</Label>
                <Input
                  id="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label  className="text-lg">Drop image here</Label>
                <div
                  className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50"
                  onClick={() => document.getElementById("fileInput").click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleFileDrop}
                >
                  <div className="flex flex-col items-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-1">Browse Files</p>
                    <input
                      id="fileInput"
                      type="file"
                      className="hidden"
                      onChange={handleFileInputChange}
                      multiple // Allow multiple file uploads
                    />
                  </div>
                </div>
                {files.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">Selected Files:</p>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      {/* Show only the first 6 images by default */}
                      {(showAllImages ? files : files.slice(0, 6)).map((file, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                            onClick={() =>
                              setFiles((prevFiles) =>
                                prevFiles.filter((_, i) => i !== index)
                              )
                            }
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                    {/* Show "Show More" button if there are more than 6 images */}
                    {files.length > 6 && (
                      <Button
                        type="button"
                        variant="ghost"
                        className="mt-2 text-blue-500"
                        onClick={toggleShowAllImages}
                      >
                        {showAllImages ? "Show Less" : "Show More"}
                      </Button>
                    )}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="description"  className="text-lg">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter description"
                  className="h-32"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="packageDescription"  className="text-lg">Package Plan Description</Label>
                <Textarea
                  id="packageDescription"
                  placeholder="please describe your plan in list ."
                  className="h-32"
                  value={formData.packageDescription}
                  onChange={handleInputChange}
                />
              </div>
              {/* Tip describe*/}
              <div>
                <Label htmlFor="DescriptionTip"  className="text-lg">Tip Description</Label>
                <Textarea
                  id="DescriptionTip"
                  placeholder="please describe your Tip."
                  className="h-32"
                  value={formData.DescriptionTip}
                  onChange={handleInputChange}
                />
              </div>

              

            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="category"  className="text-lg">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="category1">Category 1</SelectItem>
                    <SelectItem value="category2">Category 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="type"  className="text-lg">Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="type1">Type 1</SelectItem>
                    <SelectItem value="type2">Type 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="days"  className="text-lg">Days</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    id="days"
                    placeholder="0"
                    value={formData.days}
                    onChange={handleInputChange}
                  />
                  <span className="text-sm text-gray-500">d</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate"  className="text-lg">Start Date</Label>
                  <Input
                    type="date"
                    id="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate"  className="text-lg">End Date</Label>
                  <Input
                    type="date"
                    id="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="status"  className="text-lg">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
  <Label  className="text-lg">Amenities</Label>
  <div className="grid grid-cols-2 gap-4 mt-2">
    {Object.entries(formData.amenities).map(([key, value]) => (
      <div key={key} className="flex items-center space-x-2">
        <input
          type="checkbox"
          id={key}
          checked={value}
          onChange={(e) => {
            setFormData((prevState) => ({
              ...prevState,
              amenities: {
                ...prevState.amenities,
                [key]: e.target.checked,
              },
            }));
          }}
          className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
        />
        <label htmlFor={key} className="text-sm capitalize">
          {key}
        </label>
      </div>
    ))}
  </div>
</div>

            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-blue-600  font-bold  text-white" type="submit">Post</Button>
        </div>
      </form>
    </div>
  );
}