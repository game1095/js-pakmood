(async function () {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // 🌟 ฟังก์ชันใหม่: รอจนกว่าปุ่มจะขึ้น (เช็คทุกๆ 0.3 วินาที) สูงสุด 15 วินาที
  const clickButtonWhenReady = async (text, timeout = 15000) => {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      const buttons = document.querySelectorAll("button");
      for (const btn of buttons) {
        if (btn.textContent.trim() === text) {
          btn.click();
          return true;
        }
      }
      await sleep(300); // หน่วง 0.3 วิแล้วหาใหม่
    }
    return false;
  };

  // 🌟 ฟังก์ชันใหม่: รอจนกว่าบล็อคงานจะขึ้น
  const getElementWhenReady = async (selector, timeout = 15000) => {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      const el = document.querySelector(selector);
      if (el) return el;
      await sleep(300);
    }
    return null;
  };

  // =========================================================================
  // 📍 ส่วนที่ 1: ดึงเลขงานจาก Google Sheet แบบอัตโนมัติ
  // =========================================================================
  const sheetUrl =
    "เอาลิงก์ google sheet มาแทนนะจ๊ะ คัดลอกมาจาก address bar ";
  let jobNumbers = [];

  try {
    console.log("⏳ กำลังเชื่อมต่อและดึงข้อมูลจาก Google Sheet...");
    const response = await fetch(sheetUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const text = await response.text();
    jobNumbers = text
      .split("\n")
      .map((row) => row.split(",")[0].trim())
      .filter((val) => val);

    console.log(
      `✅ ดึงข้อมูลสำเร็จ! พบเลขงานทั้งหมด ${jobNumbers.length} รายการ`,
    );
  } catch (e) {
    console.error(
      "❌ ไม่สามารถดึงข้อมูลจาก Sheet ได้ ตรวจสอบการแชร์ลิงก์หรือ CORS",
      e,
    );
    return;
  }

  if (jobNumbers.length === 0) {
    console.log("❌ ไม่พบเลขงานใน Sheet");
    return;
  }

  // =========================================================================
  // 📍 ส่วนที่ 2: เริ่มวนลูปทำงาน (Dynamic Wait)
  // =========================================================================

  for (let i = 0; i < jobNumbers.length; i++) {
    const currentJob = jobNumbers[i];
    console.log(
      `\n--- ⏳ [${i + 1}/${jobNumbers.length}] กำลังดำเนินการเลขงาน: ${currentJob} ---`,
    );

    const searchInput = document.querySelector('input[name="orderId"]');
    if (!searchInput) {
      console.log("❌ หาช่อง 'ค้นหาใบงาน' ไม่พบ");
      return;
    }

    // 💡 เคลียร์ค่าเดิมก่อน เพื่อป้องกันบั๊กจากการค้นหาค้าง
    searchInput.value = "";
    searchInput.dispatchEvent(new Event("input", { bubbles: true }));
    await sleep(500);

    // กรอกเลขงานใหม่
    searchInput.value = currentJob;
    searchInput.dispatchEvent(new Event("input", { bubbles: true }));
    searchInput.dispatchEvent(new Event("change", { bubbles: true }));
    searchInput.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Enter",
        keyCode: 13,
        bubbles: true,
      }),
    );

    console.log(`🔍 กำลังค้นหา... (สคริปต์จะรอจนกว่าข้อมูลจะขึ้น)`);

    // 💡 รอจนกว่ารายการงานจะโผล่ขึ้นมา (ไม่เสียเวลารอฟรี ถ้าเว็บโหลดไว 0.5 วิ ก็ไปต่อเลย)
    const workItem = await getElementWhenReady("div[index]", 15000);
    if (!workItem) {
      console.log(
        `⚠️ โหลดนานเกิน 15 วินาที หรือไม่พบรายการงานสำหรับ ${currentJob} ข้ามไปรายการถัดไป`,
      );
      continue;
    }

    // กันเหนียว: เผื่อเว็บโชว์ DOM แล้วแต่ API ยังดึงข้อมูลเบื้องหลังไม่เสร็จ (ลดโอกาสเกิด ERR_CANCELED)
    await sleep(1000);
    workItem.click();
    console.log(`✅ [1/4] คลิกเลือกรายการ ${currentJob} แล้ว`);

    // 2. รอและกดปุ่ม "อนุมัติงาน"
    const approved = await clickButtonWhenReady("อนุมัติงาน", 10000);
    if (approved) {
      console.log("✅ [2/4] กดปุ่ม 'อนุมัติงาน'");
    } else {
      console.log(
        "⚠️ ไม่พบปุ่ม 'อนุมัติงาน' กำลังปิดหน้าต่างและข้ามไปคิวต่อไป",
      );
      await clickButtonWhenReady("ปิด", 5000);
      await sleep(1000);
      continue;
    }

    // 3. รอและกดปุ่ม "ยืนยัน"
    const confirmed = await clickButtonWhenReady("ยืนยัน", 10000);
    if (confirmed) {
      console.log("✅ [3/4] กดปุ่ม 'ยืนยัน'");
    } else {
      console.log("❌ ไม่พบปุ่ม 'ยืนยัน' กำลังปิดหน้าต่างและข้ามไปคิวต่อไป");
      await clickButtonWhenReady("ปิด", 5000);
      await sleep(1000);
      continue;
    }

    // ----------------------------------------------------
    // หน่วงเวลาบังคับ 10 วินาที ตามที่คุณต้องการ
    console.log("⏳ กำลังรอประมวลผล 5 วินาที...");
    await sleep(5000);
    // ----------------------------------------------------

    // 4. รอและกดปุ่ม "ปิด"
    const closed = await clickButtonWhenReady("ปิด", 10000);
    if (closed) {
      console.log("✅ [4/4] กดปุ่ม 'ปิด' (เสร็จสิ้นรายการนี้)");
    } else {
      console.log("❌ ไม่พบปุ่ม 'ปิด'");
    }

    // รอให้ Popup หดกลับไปให้เรียบร้อยก่อนเริ่มรอบใหม่
    await sleep(1500);
  }

  console.log("\n🎉 ดำเนินการครบทุกรายการใน Google Sheet แล้ว!");
})();
