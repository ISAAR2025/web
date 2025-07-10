const mongoose = require('mongoose');
const User = require('./models/User');
const Course = require('./models/Course');
const Payment = require('./models/Payment');
const Enrollment = require('./models/Enrollment');

const MONGO_URI = 'mongodb://localhost:27017/isar_db';

const fixInvalidRefsByMatching = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const users = await User.find();
    const courses = await Course.find();

    const usersByName = Object.fromEntries(users.map(u => [u.name.toLowerCase(), u]));
    const coursesByTitle = Object.fromEntries(courses.map(c => [c.title.toLowerCase(), c]));

    // 🔁 Fix Enrollments
    const enrollments = await Enrollment.find({ user_id: { $not: { $type: 'objectId' } } });
    for (const enr of enrollments) {
      const user = usersByName[enr.user_id?.toString().toLowerCase()] || usersByName[enr.name?.toLowerCase()];
      if (user) {
        await Enrollment.updateOne({ _id: enr._id }, { $set: { user_id: user._id } });
        console.log(`✅ Enrollment ${enr._id} user_id updated to ${user._id}`);
      } else {
        console.warn(`⚠️ Could not match user for Enrollment ${enr._id}`);
      }
    }

    // 🔁 Fix Payments
    const payments = await Payment.find({
      $or: [
        { user_id: { $not: { $type: 'objectId' } } },
        { course_id: { $not: { $type: 'objectId' } } }
      ]
    });

    for (const pay of payments) {
      const user = usersByName[pay.name?.toLowerCase()];
      const course = coursesByTitle[pay.course_name?.toLowerCase()] || coursesByTitle[pay.title?.toLowerCase()];

      const update = {};
      if (user) update.user_id = user._id;
      if (course) update.course_id = course._id;

      if (Object.keys(update).length > 0) {
        await Payment.updateOne({ _id: pay._id }, { $set: update });
        console.log(`✅ Payment ${pay._id} updated:`, update);
      } else {
        console.warn(`⚠️ Could not update Payment ${pay._id}`);
      }
    }

    console.log('🎉 Matching fix complete!');
    await mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error:', err);
  }
};

fixInvalidRefsByMatching();
