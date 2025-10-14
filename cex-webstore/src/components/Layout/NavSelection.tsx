import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NavSelection() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
  const tabRefs = useRef([]);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Gaming", path: "/games" },
    { label: "Phones", path: "/phones" },
    { label: "Computing", path: "/computing" },
    { label: "Media", path: "/media" },
  ];

  const updateUnderline = (index) => {
    const tab = tabRefs.current[index];
    if (tab) {
      setUnderlineStyle({
        width: tab.offsetWidth,
        left: tab.offsetLeft,
      });
    }
  };

  useEffect(() => {
    updateUnderline(activeTab);
  }, [activeTab]);

  useEffect(() => {
    const handleResize = () => updateUnderline(activeTab);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeTab]);

  return (
    <nav className="relative">
      <ul className="flex flex-row mx-auto justify-center gap-8 pb-3 text-white font-bold text-[14px] relative">
        {navItems.map((item, index) => (
          <li
            key={index}
            ref={(el) => (tabRefs.current[index] = el)}
            onClick={() => {
              setActiveTab(index);
              router.push(item.path);
            }}
            className={`cursor-pointer transition-colors duration-200 relative z-10 ${
              index === activeTab
                ? "text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            {item.label}
          </li>
        ))}

        <div
          className="absolute bottom-0 h-0.5 bg-white transition-all duration-300 ease-out"
          style={{
            width: underlineStyle.width,
            left: underlineStyle.left,
          }}
        />
      </ul>
    </nav>
  );
}
