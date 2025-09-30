import React from "react";
export default function ResponsiveShell({ children }) {
  return (
    <div className="w-full mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
      <div className="min-w-0">
        <div className="[&_img]:max-w-full [&_img]:h-auto [&_video]:max-w-full [&_canvas]:max-w-full">
          <div className="[&_table]:min-w-[640px] [&_table]:w-full [&_table]:border-collapse overflow-x-auto -mx-4 sm:mx-0">
            <div className="[&_pre]:whitespace-pre-wrap [&_pre]:break-words [&_code]:break-words">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
