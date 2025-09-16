"use client";

import SliderGeneral from "./slider.general";
import { v4 as uuidv4 } from "uuid";

const data = [
  {
    id: uuidv4(),
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    title: "Premium Subscription",
    description: "Get unlimited access to exclusive content, early releases, and member-only benefits.",
    link: "/subscribe",
  },
  {
    id: uuidv4(),
    imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Exclusive Events",
    description: "Join our curated events with industry leaders and connect with like-minded professionals.",
    link: "/events",
  },
  {
    id: uuidv4(),
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Community Access",
    description: "Become part of our thriving community and network with professionals worldwide.",
    link: "/community",
  },
];

export default function Hero() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden py-16">
      {/* Background elements */}
      <div className="absolute inset-0 bg-black/20 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-white/5 to-transparent z-0"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl z-0"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl z-0"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center mb-12 px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Discover <span className="text-cyan-400">Extraordinary</span> Experiences
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Elevate your journey with our exclusive offerings tailored for discerning individuals.
        </p>
      </div>

      {/* Slider Container */}
      <div className="container flex p-4 w-full max-w-6xl relative z-10">
        <SliderGeneral data={data} />
      </div>

      {/* Additional CTA */}
      <div className="relative z-10 mt-12 text-center px-4">
        <p className="text-gray-300 mb-6">Not sure where to start?</p>
        <button className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20">
          Get Personalized Recommendations
        </button>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-10 left-10 w-10 h-10 rounded-full bg-cyan-500/20 animate-pulse"></div>
      <div className="absolute top-20 right-20 w-6 h-6 rounded-full bg-indigo-500/20 animate-pulse"></div>
      <div className="absolute top-1/3 left-1/4 w-8 h-8 rounded-full bg-blue-500/20 animate-pulse"></div>
    </div>
  );
}