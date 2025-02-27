const express = require('express');
const mongoose = require("mongoose");
const Car = require("./models/user.js");

const app = express();
app.use(express.json());

// ✅ دالة الاتصال بقاعدة البيانات
async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://soulBurner:Heatsoul.5@soulburner.vrm4f.mongodb.net/?retryWrites=true&w=majority&appName=soulBurner", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ تم الاتصال بقاعدة البيانات بنجاح");

        // تشغيل السيرفر بعد نجاح الاتصال
        app.listen(3000, () => {
            console.log('🚀 السيرفر شغال على http://localhost:3000');
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
        res.status(500).json({ error: "❌ حدث خطأ أثناء التسجيل" });
    }
});

// ✅ جلب جميع المستخدمين
app.get("/user", async (req, res) => {
    try {
        const users = await Car.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "❌ حدث خطأ أثناء جلب المستخدمين" });
    }
});
