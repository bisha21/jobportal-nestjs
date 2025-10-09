/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'randomuser.me',
      'example.com',
      'res.cloudinary.com',
      'www.google.com',
      'lh3.googleusercontent.com',
      'www.vecteezy.com',
      'upload.wikimedia.org',
    ],
  },
};

module.exports = nextConfig;
