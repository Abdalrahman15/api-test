const express = require("express");
const mongoose = require("mongoose");
const Car = require("./models/user.js");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000; // استخدام المنفذ من Koyeb
const MONGO_URI = process.env.MONGO_URI; // استخدام متغير البيئة لمزيد من الأمان

// ✅ دالة الاتصال بقاعدة البيانات
async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ تم الاتصال بقاعدة البيانات بنجاح");

        // ✅ تشغيل السيرفر بعد نجاح الاتصال فقط
        app.listen(PORT, () => {
            console.log(`🚀 السيرفر شغال على http://localhost:${PORT}`);
        });

    } catch (err) {
        console.error("❌ فشل الاتصال بقاعدة البيانات:", err);
        process.exit(1);
    }
}

connectDB();

// ✅ إنشاء مستخدم جديد
app.post("/user", async (req, res) => {
    try {
        const { name, pass } = req.body;
        const car = new Car({ name, pass });
        await car.save();
        res.json({ message: "✅ تم التسجيل بنجاح", user: car });
    } catch (err) {
        res.status(500).json({ error: "❌ حدث خطأ أثناء التسجيل", details: err.message });
    }
});

// ✅ جلب جميع المستخدمين
app.get("/user", async (req, res) => {
    try {
        const users = await Car.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "❌ حدث خطأ أثناء جلب المستخدمين", details: err.message });
    }
});
