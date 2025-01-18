import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:3500/api/tours";

export const useTourStore = create((set) => ({
  tours: [],
  currentTour: null,
  upcomingTours: [],
  dateRangeTours: [],
  loading: false,
  error: null,

  // Fetch all tours
  fetchTours: async (subadminId) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/by-subadmin/${subadminId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      set({ tours: data.data, loading: false });
    } catch (error) {
      set({
        error: "Failed to fetch tours. Please check the API endpoint.",
        loading: false,
      });
    }
  },

  // Fetch a single tour by ID
  fetchTourById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/${id}`); // Adjust the API endpoint
      const data = await response.json();
      if (response.ok) {
        set({ currentTour: data.data, loading: false });
      } else {
        throw new Error(data.error || "Failed to fetch tour");
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Fetch upcoming tours
  fetchUpcomingTours: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/upcoming`);
      set({ upcomingTours: response.data, loading: false });
    } catch (error) {
      set({ error: error.response.data.message, loading: false });
    }
  },

  // Fetch tours within a date range
  fetchToursByDateRange: async (start, end) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        `${API_URL}/date-range?start=${start}&end=${end}`,
        {
          params: { start, end },
        }
      );
      set({ tours: response.data, loading: false });
    } catch (error) {
      set({ error: error.response.data.message, loading: false });
    }
  },
  // Create a new tour
  createTour: async (subadminId, tourData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        ` ${API_URL}/${subadminId}/add`,
        tourData
      );
      set((state) => ({
        tours: [...state.tours, response.data.tour],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.response.data.message, loading: false });
    }
  },

  // Update a tour
  updateTour: async (subadminId, tourId, updateData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(
        `${API_URL}/${subadminId}/${tourId}`,
        updateData
      );
      set((state) => ({
        tours: state.tours.map((tour) =>
          tour._id === tourId ? response.data.tour : tour
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.response.data.message, loading: false });
    }
  },

  // Delete a tour
  deleteTour: async (subadminId, tourId) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${API_URL}/${subadminId}/${tourId}`);
      set((state) => ({
        tours: state.tours.filter((tour) => tour._id !== tourId),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.response.data.message, loading: false });
    }
  },
  // Edit main image of a tour
  editMainImage: async (id, newImageUrl) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/${id}/edit-main-image`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mainImage: newImageUrl }),
      });
      const data = await response.json();
      if (response.ok) {
        set((state) => ({
          tours: state.tours.map((tour) =>
            tour._id === id ? { ...tour, mainImage: newImageUrl } : tour
          ),
          loading: false,
        }));
      } else {
        throw new Error(data.error || "Failed to update main image");
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Delete an image from galleryImages
  deleteGalleryImage: async (id, imageUrl) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/${id}/delete-gallery-image`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl }),
      });
      const data = await response.json();
      if (response.ok) {
        set((state) => ({
          tours: state.tours.map((tour) =>
            tour._id === id
              ? {
                  ...tour,
                  galleryImages: tour.galleryImages.filter(
                    (img) => img !== imageUrl
                  ),
                }
              : tour
          ),
          loading: false,
        }));
      } else {
        throw new Error(data.error || "Failed to delete gallery image");
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  // fetchUpcomingTours: async () => {
  //   set({ loading: true });
  //   try {
  //     const response = await axios.get(`${API_URL}/upcoming`);
  //     set({ upcomingTours: response.data, loading: false, error: null });
  //   } catch (error) {
  //     set({ error: error.message, loading: false });
  //   }
  // },
  // fetchToursByDateRange: async (start, end) => {
  //   set({ loading: true });
  //   try {
  //     const response = await axios.get(
  //       `${API_URL}/date-range?start=${start}&end=${end}`
  //     );
  //     set({ dateRangeTours: response.data, loading: false, error: null });
  //   } catch (error) {
  //     set({ error: error.message, loading: false });
  //   }
  // },
}));
