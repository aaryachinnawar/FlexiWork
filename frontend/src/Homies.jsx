import React, { useEffect } from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="text-center py-20 bg-white"
    >
      <h1 className="text-4xl font-bold text-gray-900">
        Where Talent Meets Opportunity.
      </h1>
      <p className="text-gray-600 mt-4 max-w-lg mx-auto">
        Run an organization where members get rewarded for their contributions with fractional ownership.
      </p>
    </motion.section>
  );
};

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-white">
      <h2 className="text-xl font-bold">FreeLanceNeo</h2>
      <div className="space-x-6">
        <a href="#" className="text-gray-700 hover:text-gray-900">Home</a>
        <a href="#" className="text-gray-700 hover:text-gray-900">Find Talent</a>
        <a href="#" className="text-gray-700 hover:text-gray-900">Find Work</a>
        <button className="text-green-500 hover:text-green-700">Login</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700">Sign Up</button>
      </div>
    </nav>
  );
};

const CategoryCard = ({ title, description, bgColor }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`p-6 rounded-lg shadow-md ${bgColor} text-white`}
    >
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm">{description}</p>
    </motion.div>
  );
};

const Categories = () => {
  return (
    <section className="py-16 text-center">
      <h2 className="text-2xl font-bold">Browse and Hire Talent by Category</h2>
      <p className="text-gray-600 max-w-md mx-auto mt-2">
        Easily browse expert freelancers, review their profiles, and hire the perfect talent to match your project needs.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 px-6">
        <CategoryCard title="Development & IT" description="Hire expert developers and IT pros." bgColor="bg-red-500" />
        <CategoryCard title="Design & Creative" description="Hire top designers and creative experts." bgColor="bg-green-500" />
        <CategoryCard title="AI Services" description="Find AI specialists for innovative solutions." bgColor="bg-yellow-500" />
        <CategoryCard title="Writing & Translation" description="Hire expert writers and translators." bgColor="bg-pink-500" />
        <CategoryCard title="Finance & Accounting" description="Engage finance & accounting experts." bgColor="bg-teal-500" />
        <CategoryCard title="Sales & Marketing" description="Discover sales & marketing experts." bgColor="bg-yellow-400" />
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <div className="font-sans">
      <Navbar />
      <HeroSection />
      <Categories />
    </div>
  );
};

export default Home;
