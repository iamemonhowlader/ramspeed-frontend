// Shared navigation data
export const navigation = [
  {
    text: "Home",
    slug: "home",
    children: [],
  },
  {
    text: "Categories",
    slug: "categories",
    children: [
      {
        text: "Networking",
        slug: "networking",
        children: [
          { text: "Routers", slug: "routers" },
          { text: "Switches", slug: "switches" },
          { text: "Modems", slug: "modems" },
          { text: "Network Adapters", slug: "network-adapters" },
          { text: "Access Points", slug: "access-points" },
        ],
      },
      {
        text: "Laptop/desktop",
        slug: "laptop-desktop",
        children: [
          { text: "Laptops", slug: "laptops" },
          { text: "Desktop Computers", slug: "desktop-computers" },
          { text: "Gaming PCs", slug: "gaming-pcs" },
          { text: "All-in-One PCs", slug: "all-in-one-pcs" },
          { text: "Workstations", slug: "workstations" },
        ],
      },
      {
        text: "Television",
        slug: "television",
        children: [
          { text: "Smart TVs", slug: "smart-tvs" },
          { text: "LED TVs", slug: "led-tvs" },
          { text: "OLED TVs", slug: "oled-tvs" },
          { text: "4K TVs", slug: "4k-tvs" },
          { text: "TV Accessories", slug: "tv-accessories" },
        ],
      },
      {
        text: "Printers",
        slug: "printers",
        children: [
          { text: "Inkjet Printers", slug: "inkjet-printers" },
          { text: "Laser Printers", slug: "laser-printers" },
          { text: "All-in-One Printers", slug: "all-in-one-printers" },
          { text: "Photo Printers", slug: "photo-printers" },
          { text: "Printer Supplies", slug: "printer-supplies" },
        ],
      },
      {
        text: "Phones",
        slug: "phones",
        children: [
          { text: "Smartphones", slug: "smartphones" },
          { text: "Feature Phones", slug: "feature-phones" },
          { text: "Landline Phones", slug: "landline-phones" },
          { text: "VoIP Phones", slug: "voip-phones" },
        ],
      },
      {
        text: "Mobile phone accessories",
        slug: "mobile-phone-accessories",
        children: [
          { text: "Phone Cases", slug: "phone-cases" },
          { text: "Screen Protectors", slug: "screen-protectors" },
          { text: "Chargers & Cables", slug: "chargers-cables" },
          { text: "Power Banks", slug: "power-banks" },
          { text: "Headphones & Earbuds", slug: "headphones-earbuds" },
          { text: "Phone Holders", slug: "phone-holders" },
        ],
      },
      {
        text: "Car accessories",
        slug: "car-accessories",
        children: [
          { text: "Car Chargers", slug: "car-chargers" },
          { text: "Phone Mounts", slug: "phone-mounts" },
          { text: "Dash Cams", slug: "dash-cams" },
          { text: "GPS Navigation", slug: "gps-navigation" },
          { text: "Bluetooth Adapters", slug: "bluetooth-adapters" },
          { text: "Car Audio", slug: "car-audio" },
        ],
      },
    ],
  },
];