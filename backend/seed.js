require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const GymInfo = require('./models/GymInfo');
const connectDB = require('./config/db');

const seed = async () => {
  try {
    await connectDB();

    const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (!adminExists) {
      await Admin.create({
        name: process.env.ADMIN_NAME || 'Admin',
        email: process.env.ADMIN_EMAIL || 'admin@gym.com',
        password: process.env.ADMIN_PASSWORD || 'Admin@123',
        role: 'superadmin',
      });
      console.log('Admin created');
    } else {
      console.log('Admin already exists');
    }

    const gymInfoExists = await GymInfo.findOne();
    if (!gymInfoExists) {
      await GymInfo.create({
        gymName: 'FitZone Gym',
        address: '123 Fitness Street, Gym City, GC 10001',
        phone: '+1 234 567 8900',
        email: 'info@fitzone.com',
        openingHours: {
          monday: '6:00 AM - 10:00 PM',
          tuesday: '6:00 AM - 10:00 PM',
          wednesday: '6:00 AM - 10:00 PM',
          thursday: '6:00 AM - 10:00 PM',
          friday: '6:00 AM - 10:00 PM',
          saturday: '8:00 AM - 8:00 PM',
          sunday: '8:00 AM - 6:00 PM',
        },
        googleMapLink: 'https://maps.google.com/?q=123+Fitness+Street',
        whatsappNumber: '+1 234 567 8900',
      });
      console.log('GymInfo created');
    } else {
      console.log('GymInfo already exists');
    }

    console.log('Seed completed');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
};

seed();
