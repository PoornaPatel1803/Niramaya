import React from "react";
import {
  ArrowRight,
  FileText,
  Lock,
  Users,
  Hospital,
  Activity,
  Globe,
} from "lucide-react";
import Navbar from "../Components/Navbar";
import poster from "../assets/PosterImage.jpg";
const LandingPage = () => {
  const features = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Centralized Records",
      description:
        "Access and maintain patient medical records in one secure digital platform",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Secure Access",
      description:
        "Register with Aadhaar number and secret key for enhanced security",
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Efficient Workflow",
      description:
        "Streamlined process for doctors to view and update patient records",
    },
  ];

  const benefits = [
    {
      title: "For Patients",
      points: [
        "Seamless medical history",
        "Improved diagnosis",
        "Better treatment outcomes",
      ],
    },
    {
      title: "For Doctors",
      points: [
        "Comprehensive patient history",
        "Enhanced efficiency",
        "Better record-keeping",
      ],
    },
    {
      title: "For Administrators",
      points: [
        "Centralized management",
        "Secure permissions",
        "Effective administration",
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div
          id="hero"
          style={{
            backgroundImage: `url(${poster})`,
          }}
          className="bg-cover bg-center text-gray-900 h-screen flex items-center"
        >
          {/* <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-8">
                Revolutionizing Healthcare Records Management
              </h1>
              <p className="text-xl md:text-2xl mb-12">
                Transform the way medical records are managed with our
                integrated digital platform
              </p>
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-50 transition-colors mx-auto">
                Get Started <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div> */}
          <div className="p-2 bg-transparent">
          <span
            className="block max-w-2xl p-6 rounded-lg dark:bg-transparent "
          >
            <h1 class="mb-2 text-5xl font-bold tracking-tight text-blue-900 dark:text-blue-800">
                Revolutionizing Healthcare Records Management
            </h1>
            <h4 class="font-normal text-blue-700 dark:text-blue-700 max-w-xl text-100rem">
            Revolutionize healthcare with our integrated digital platform that simplifies medical record management. Ensure secure, centralized access to patient information, enabling faster, more accurate diagnoses and treatments. Streamline workflows for healthcare providers while enhancing data privacy and accessibility for patients.
            </h4>
            <button className="bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold flex flex-start gap-2 hover:bg-blue-500 transition-colors mx-auto mt-10">
                Get Started <ArrowRight className="w-6 h-6" />
              </button>
          </span>
          </div>
          

        </div>

        {/* Features Section */}
        <div id="features" className="container mx-auto px-6 py-16 pt-24">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div id="benefits" className="bg-gray-100 pt-24">
          <div className="container mx-auto px-6 py-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              Benefits for All Users
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">
                    {benefit.title}
                  </h3>
                  <ul className="space-y-2">
                    {benefit.points.map((point, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-gray-600"
                      >
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Global Perspective Section */}
        <div id="global" className="container mx-auto px-6 py-16 pt-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            Global Perspective
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { region: "United States", icon: <Globe className="w-6 h-6" /> },
              { region: "European Union", icon: <Globe className="w-6 h-6" /> },
              { region: "Canada", icon: <Globe className="w-6 h-6" /> },
              { region: "Asia", icon: <Globe className="w-6 h-6" /> },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
              >
                <div className="text-blue-600 flex justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold">{item.region}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="bg-gray-100 pt-24">
          <div className="container mx-auto px-6 py-12 text-center text-gray-800">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Healthcare?
            </h2>
            <p className="text-xl mb-8">
              Join us in revolutionizing medical record management
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
