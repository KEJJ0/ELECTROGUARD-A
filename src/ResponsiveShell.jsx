// src/ResponsiveShell.jsx
import React from "react";

/**
 * غلاف استجابة عام:
 * - يمنع الانزلاق الأفقي.
 * - يضبط حاوية بعرض آمن + حشوات متدرجة حسب حجم الشاشة.
 * - ما يغيّر أي منطق داخلي — بس يلف Children.
 */
export default function ResponsiveShell({ children }) {
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      {/* الحاوية الآمنة لكل المحتوى */}
      <div className="mx-auto w-full max-w-[1240px] px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
        {children}
      </div>
    </div>
  );
}
