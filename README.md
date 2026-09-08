# 🛠️ เครื่องมือช่วยอนุมัติการปักหมุด (Auto-Pin Approval Tool)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)

สวัสดีครับ! เพื่อให้ชีวิตและการทำงานของทุกท่านง่ายดายมากยิ่งขึ้น ข้าพเจ้าได้พัฒนาเครื่องมือสำหรับช่วยอนุมัติการปักหมุดอัตโนมัติเป็นที่เรียบร้อยแล้ว สามารถทำตามขั้นตอนด้านล่างนี้ได้เลยครับ

---

## 🚀 1. การตั้งค่า Google Sheet & Apps Script

**ขั้นตอนที่ 1-2:** เปิด Google Sheet ขึ้นมาใหม่ และตั้งค่าการแชร์ให้เป็น **"สาธารณะ"** และ **"สามารถแก้ไขได้" (Editor)**
<br><img width="568" height="429" alt="image" src="https://github.com/user-attachments/assets/7f387f49-4fc7-4d0e-8573-2c924528e078" />

**ขั้นตอนที่ 3:** ในไฟล์ Google Sheet ไปที่เมนูด้านบน เลือก **ส่วนขยาย (Extensions)** > **Apps Script**
<br><img width="308" height="303" alt="image" src="https://github.com/user-attachments/assets/f7bfbb4a-b64f-4c21-8d37-82fadf7df742" />

**ขั้นตอนที่ 4:** นำโค้ดจากไฟล์ `prep_google_sheet.js` ไปวางในหน้า Apps Script
<br><img width="1173" height="496" alt="image" src="https://github.com/user-attachments/assets/4bd61548-09bf-425e-8f4d-a21b205a9a99" />

**ขั้นตอนที่ 5-7:** กดปุ่ม **Deploy** > เลือก **New deployment** > ตั้งค่าตามภาพด้านล่าง > กดปุ่ม **Copy** ตรง Web App URL แล้วกด Done
<br><img width="1511" height="547" alt="image" src="https://github.com/user-attachments/assets/65246179-d65c-4701-823a-f3b314783403" />
<br><img width="805" height="629" alt="image" src="https://github.com/user-attachments/assets/f9c681a5-d7a9-41c0-aaa5-530eaa66bc60" />
<br><img width="754" height="556" alt="image" src="https://github.com/user-attachments/assets/a478a538-89aa-4497-a9ad-921dc75931c7" />

---

## 📥 2. การดึงข้อมูล (Data Scraping)

**ขั้นตอนที่ 8:** เปิดไฟล์ `1-data-scraping.js` แล้วนำ URL ที่คัดลอกมาจากขั้นตอนที่ 7 มาวางแทนที่ในเครื่องหมาย `" "`
<br><img width="1054" height="642" alt="image" src="https://github.com/user-attachments/assets/99893569-d790-488a-962f-2bbd95a18032" />

**ขั้นตอนที่ 9:** เปิดเว็บปักหมุด เลือกชุดงาน ปรับมุมมองเป็น "ตาราง" และเลือกสถานะงานเป็น **"งานทวนสอบ"**
<br><img width="1743" height="339" alt="image" src="https://github.com/user-attachments/assets/86cc7b84-b387-443d-8a65-86207bcaa865" />

**ขั้นตอนที่ 10:** กดปุ่ม `F12` เพื่อเปิดเครื่องมือนักพัฒนา เลือกแท็บ **Console** จากนั้นนำสคริปต์ที่แก้ไขในข้อ 8 มาวางแล้วกด `Enter` *(ระบบจะดึงรหัสงานไปใส่ใน Google Sheet ที่เตรียมไว้)*

---

## ✅ 3. การอนุมัติข้อมูล (Data Approval)

**ขั้นตอนที่ 11:** เปิดหน้าเว็บใหม่ เข้าสู่ระบบปักหมุด และเลือกสถานะงานเป็น **"งานทวนสอบ"** ตามภาพ
<br><img width="1140" height="598" alt="image" src="https://github.com/user-attachments/assets/4b759056-8cf7-46cd-b63c-4ed11185a684" />

**ขั้นตอนที่ 12:** เตรียมไฟล์ `2-data-approve.js` โดยนำ **ลิงก์ของ Google Sheet** (จากขั้นตอนที่ 1-2) มาวางในส่วนนี้
<br><img width="1211" height="482" alt="image" src="https://github.com/user-attachments/assets/a7c5d6ae-7172-43b3-bdc9-ebdd525d57c0" />
<br><img width="1002" height="424" alt="image" src="https://github.com/user-attachments/assets/a2bd152a-2033-4714-ba06-0e9b27c12277" />


**ขั้นตอนที่ 13:** กดปุ่ม `F12` เลือกแท็บ **Console** นำสคริปต์จากข้อ 12 มาวางแล้วกด `Enter` *(ระบบจะดำเนินการอนุมัติหมายเลขงานที่ดึงมาโดยอัตโนมัติ)*

**ขั้นตอนที่ 14:** ภาพตัวอย่างขั้นตอนการทำงานของระบบขณะกำลังดำเนินการ
<br><img width="1408" height="533" alt="image" src="https://github.com/user-attachments/assets/2e5ec0c3-6654-4a06-a6e5-a2c7739fdf02" />

<br>

> **ข้าพเจ้าหวังเป็นอย่างยิ่งว่าท่านจะสามารถดำเนินการได้ และการทำงานของทุกท่านจะเป็นไปอย่างราบรื่นครับ** ✨

---
