"use client";

import { useEffect } from "react";
import Footer from "@/components/Footer";
import ProfileUser from "@/components/Profile";
import Service from "./ServiceS/components/Service";
import TopCard from "@/components/home/Card/TopCard";
import TrendingCard from "@/components/home/Card/TrendingCard";
import PopularCard from "@/components/home/Card/PopularCard";
import WeekendCard from "@/components/home/Card/WeekendCard";
import TraditionalCard from "@/components/home/Card/TraditionalCard";
import { useAuthStore } from "@/store/authStore";
import { useParams } from "next/navigation";

export default function Home() {
  const { id } = useParams();
  const {
    user,
    image,
    isLoading,
    error,
    fetchImage,
    fetchCompanyById,
    fetchUserById,
  } = useAuthStore();

  useEffect(() => {
    if (id) {
      fetchUserById(id).catch((err) =>
        console.error("Error in fetchUserById:", err)
      );
    }
  }, [id, fetchUserById]);

  useEffect(() => {
    if (user?._id) {
      fetchImage(user._id).catch((err) =>
        console.error("Error in fetchImage:", err)
      );
    }
  }, [user, fetchImage]);

  if (isLoading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <ProfileUser id={id} />
      <TopCard />
      <TrendingCard />
      <PopularCard />
      <WeekendCard />
      <TraditionalCard />
      <Service />
      <Footer />
    </div>
  );
}
