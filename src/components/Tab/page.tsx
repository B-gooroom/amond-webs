interface TabProps {
  tabs: string[];
  selectedTab: number;
  setSelectedTab: (index: number) => void;
}

export default function Tab({ tabs, selectedTab, setSelectedTab }: TabProps) {
  return (
    <div className="relative">
      {/* Tabs */}
      <div className="flex justify-around">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`w-full py-8 text-center ${
              selectedTab === index ? "text-subtitle1" : "text-ad-gray-500"
            }`}
            onClick={() => setSelectedTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-200">
        <div
          className="h-full bg-ad-black transition-transform duration-300"
          style={{
            transform: `translateX(${selectedTab * 100}%)`,
            width: `calc(100% / ${tabs.length})`,
          }}
        />
      </div>
    </div>
  );
}
