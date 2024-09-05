import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="text-center py-4 bg-transparent text-gray-700">
            <p>&copy; {currentYear} Your Company. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
