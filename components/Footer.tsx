import React from "react";

const footer = () => {
  return (
    <footer className="sticky bottom-0 left-0 w-full bg-gray-800 p-5 text-center text-white">
      <div className="mx-auto max-w-4xl px-4">
        <p>© 2024 Shimg Solution. All rights reserved.</p>
        <div className="mt-3 flex justify-center space-x-4">
          <a href="/privacy-policy" className="text-gray-400 hover:text-white">
            Privacy Policy
          </a>
          <a href="/terms" className="text-gray-400 hover:text-white">
            Terms of Service
          </a>
          <a href="/contact" className="text-gray-400 hover:text-white">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default footer;
