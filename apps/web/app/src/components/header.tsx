"use client";

import { useState } from "react";
import { ButtonGroup, ButtonIcon } from "./button.general";
import { PopoverModal } from "./modals.general";

export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="app-header header flex items-center justify-between p-4 bg-gray-800 text-white">
      <h1>StreamX</h1>

      <ButtonGroup
        buttons={[
          { label: "Home", link: "/" },
          { label: "Events", link: "/events" },
          { label: "Notifications", link: "/notifications" },
        ]}
        classes="nav-links flex space-x-4 text-lg hover:underline"
      />

      <ButtonIcon
        icon={<span role="img" aria-label="User">👤</span>}
        classes="user-icon"
        onClick={() => setShowUserMenu(true)}
      />

      {/* User Menu Modal */}
      <PopoverModal
        title="User Menu"
        show={showUserMenu}
        onClose={() => setShowUserMenu(false)}
      >
        <div>
          <a href="/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</a>
          <a href="/settings" className="block px-4 py-2 hover:bg-gray-200">Settings</a>
          <a href="/logout" className="block px-4 py-2 hover:bg-gray-200">Logout</a>
        </div>
      </PopoverModal>
    </header>
  );
}
