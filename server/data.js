// Original public content for the Belgian Air Force website.
export const leadership = [
  {
    id: "force-leader",
    title: "Lieutenant General · Force Leader",
    name: "Madeleine van der Meer",
    biography: "Lieutenant General van der Meer leads the Belgian Air Force, guiding its organization, unit development and shared standards.",
    focus: ["Command", "Organization", "Community"]
  },
  {
    id: "deputy-chief",
    title: "Major General · Deputy Chief",
    name: "André Peeters",
    biography: "Major General Peeters supports the command team, coordinating the group's activities and connecting its specialist teams.",
    focus: ["Coordination", "Oversight", "Development"]
  },
  {
    id: "founder",
    title: "Founder · Former Force Leader",
    name: "Air France 2281",
    biography: "Air France 2281 founded the Belgian Air Force community in February 2025 and established its identity and initial organization.",
    focus: ["Founding", "Community", "Heritage"]
  }
];

// Public aircraft profiles describe the roles represented in the force.
export const aircraft = [
  {
    id: "f-16a",
    name: "F-16A Fighting Falcon",
    category: "Fighter",
    image: "fighter",
    summary: "A multirole fighter in the group's combat-air roster.",
    role: "Combat aviation scenario",
    overview: "The F-16A serves as a single-seat fighter for air operations and training.",
    capabilities: ["Fighter activity", "Airspace scenarios", "Formation flying", "Training"],
    specifications: [{ label: "Roster variant", value: "F-16A" }, { label: "Catalogue category", value: "Fighter" }, { label: "Organization", value: "Belgian Air Force" }]
  },
  {
    id: "f-35a",
    name: "F-35A Lightning II",
    category: "Fighter",
    image: "fighter",
    summary: "A fifth-generation fighter designation included in the group's aircraft roster.",
    role: "Modern combat-air scenario",
    overview: "The F-35A is a contemporary fighter in the air force roster, supporting flying and scenario planning.",
    capabilities: ["Fighter activity", "Multirole scenarios", "Formation flying", "Training"],
    specifications: [{ label: "Roster variant", value: "F-35A" }, { label: "Catalogue category", value: "Fighter" }, { label: "Organization", value: "Belgian Air Force" }]
  },
  {
    id: "f-15cd",
    name: "F-15 Eagle",
    category: "Fighter",
    image: "fighter",
    summary: "A tactical fighter featured in the group's expanded aircraft roster.",
    role: "Fighter scenario",
    overview: "The F-15C/D is listed for combat aviation and formation flying.",
    capabilities: ["Fighter activity", "Airspace scenarios", "Formation flying"],
    specifications: [{ label: "Roster variant", value: "F-15C/D" }, { label: "Catalogue category", value: "Fighter" }, { label: "Organization", value: "Belgian Air Force" }]
  },
  {
    id: "rafale",
    name: "Dassault Rafale",
    category: "Fighter",
    image: "fighter",
    summary: "A multirole fighter included in the group's expanded roster.",
    role: "Multirole aviation scenario",
    overview: "Rafale F3R and F4 designations appear in the aircraft catalogue for multirole flying.",
    capabilities: ["Multirole scenarios", "Formation flying", "Training"],
    specifications: [{ label: "Roster variants", value: "F3R / F4" }, { label: "Catalogue category", value: "Fighter" }, { label: "Organization", value: "Belgian Air Force" }]
  },
  {
    id: "a400m",
    name: "Airbus A400M Atlas",
    category: "Transport",
    image: "transport",
    summary: "A heavy transport aircraft in the group's air-mobility roster.",
    role: "Strategic and tactical airlift scenario",
    overview: "The A400M supports cargo and personnel movement, giving members a platform for coordinated transport flights.",
    capabilities: ["Cargo-flight scenarios", "Personnel transport", "Long-range flights", "Crew coordination"],
    specifications: [{ label: "Roster designation", value: "A400M Atlas" }, { label: "Catalogue category", value: "Transport" }, { label: "Organization", value: "Belgian Air Force" }]
  },
  {
    id: "falcon-7x",
    name: "Dassault Falcon 7X",
    category: "Transport",
    image: "transport",
    summary: "A business jet designation used for passenger and liaison flights.",
    role: "Passenger transport scenario",
    overview: "The Falcon 7X appears in the aircraft roster for passenger movements and other non-combat aviation scenarios.",
    capabilities: ["Passenger flights", "Liaison flights", "Route planning"],
    specifications: [{ label: "Roster designation", value: "Falcon 7X" }, { label: "Catalogue category", value: "Transport" }, { label: "Organization", value: "Belgian Air Force" }]
  },
  {
    id: "skycourier",
    name: "Cessna 408 SkyCourier",
    category: "Transport",
    image: "transport",
    summary: "A utility transport aircraft for regional cargo and support.",
    role: "Regional air-mobility scenario",
    overview: "The SkyCourier supports shorter routes and logistics activity.",
    capabilities: ["Regional transport", "Cargo scenarios", "route planning"],
    specifications: [{ label: "Roster designation", value: "Cessna 408" }, { label: "Catalogue category", value: "Transport" }, { label: "Organization", value: "Belgian Air Force" }]
  },
  {
    id: "a330-mrtt",
    name: "Airbus A330 MRTT",
    category: "Support",
    image: "transport",
    summary: "A tanker and transport type listed for support-themed aviation scenarios.",
    role: "Aerial-support and transport scenario",
    overview: "The A330 MRTT supports air mobility and other support flights.",
    capabilities: ["Support flights", "Transport scenarios", "Long-range flights"],
    specifications: [{ label: "Roster designation", value: "A330 MRTT" }, { label: "Catalogue category", value: "Support" }, { label: "Organization", value: "Belgian Air Force" }]
  },
  {
    id: "e-7",
    name: "Boeing E-7 Wedgetail",
    category: "Support",
    image: "transport",
    summary: "An airborne early-warning aircraft designation in the group's aircraft roster.",
    role: "Airborne-support scenario",
    overview: "The E-7 supports coordinated aviation activity.",
    capabilities: ["Support aircraft", "Coordination scenarios", "Training"],
    specifications: [{ label: "Roster variant", value: "E-7A Wedgetail" }, { label: "Catalogue category", value: "Support" }, { label: "Organization", value: "Belgian Air Force" }]
  },
  {
    id: "aw109",
    name: "AgustaWestland AW109",
    category: "Helicopter",
    image: "helicopter",
    summary: "A light helicopter in the rotary-wing catalogue.",
    role: "Utility and medical-support scenario",
    overview: "The A109BA provides a helicopter option for utility, medical-support and training flights in the group's scenarios.",
    capabilities: ["Helicopter flying", "Utility-flight scenarios", "Medical-support scenarios"],
    specifications: [{ label: "Roster variant", value: "A109BA" }, { label: "Catalogue category", value: "Helicopter" }, { label: "Organization", value: "Belgian Air Force" }]
  },
  {
    id: "h145m",
    name: "Airbus H145M",
    category: "Helicopter",
    image: "helicopter",
    summary: "A multirole utility helicopter in the group's aircraft roster.",
    role: "Utility helicopter scenario",
    overview: "The H145M is catalogued for general-purpose helicopter flying and community training scenarios.",
    capabilities: ["Utility flights", "Helicopter training", "Team coordination"],
    specifications: [{ label: "Roster designation", value: "H145M" }, { label: "Catalogue category", value: "Helicopter" }, { label: "Organization", value: "Belgian Air Force" }]
  },
  {
    id: "nh90-nfh",
    name: "NHIndustries NH90 NFH",
    category: "Helicopter",
    image: "helicopter",
    summary: "A naval helicopter variant shown in the group's aviation roster.",
    role: "Maritime helicopter scenario",
    overview: "The NH90 NFH serves in maritime and support roles.",
    capabilities: ["Maritime flights", "Helicopter training", "Team coordination"],
    specifications: [{ label: "Roster variant", value: "NH90 NFH" }, { label: "Catalogue category", value: "Helicopter" }, { label: "Organization", value: "Belgian Air Force" }]
  },
  {
    id: "pc-7",
    name: "Pilatus PC-7 MKX",
    category: "Training",
    image: "trainer",
    summary: "A basic trainer designation for instruction and foundational flying practice.",
    role: "Basic training scenario",
    overview: "The PC-7 MKX supports instruction and skill-building flights.",
    capabilities: ["Training", "Basic handling practice", "Instructor-led scenarios"],
    specifications: [{ label: "Roster variant", value: "PC-7 MKX" }, { label: "Catalogue category", value: "Training" }, { label: "Organization", value: "Belgian Air Force" }]
  },
  {
    id: "sf-260",
    name: "SIAI-Marchetti SF.260",
    category: "Training",
    image: "trainer",
    summary: "A light trainer associated with introductory flying activity.",
    role: "Elementary training scenario",
    overview: "The SF.260 features in the catalogue as a small aircraft for foundational handling practice and pilot-development scenarios.",
    capabilities: ["Basic handling practice", "Training", "Instructor-led scenarios"],
    specifications: [{ label: "Roster designation", value: "SF.260" }, { label: "Catalogue category", value: "Training" }, { label: "Organization", value: "Belgian Air Force" }]
  },
  {
    id: "mq-9b",
    name: "MQ-9B SkyGuardian",
    category: "Support",
    image: "fighter",
    summary: "An unmanned aircraft designation included for reconnaissance-themed scenarios.",
    role: "Unmanned aviation scenario",
    overview: "The MQ-9B appears in the aircraft roster as an unmanned aircraft type.",
    capabilities: ["Unmanned aviation", "Scenario coordination", "Training"],
    specifications: [{ label: "Roster designation", value: "MQ-9B" }, { label: "Catalogue category", value: "Support" }, { label: "Organization", value: "Belgian Air Force" }]
  },
  {
    id: "l21b",
    name: "L21B Super Cub",
    category: "Training",
    image: "trainer",
    summary: "A glider-centre support aircraft in the training catalogue.",
    role: "Glider training support scenario",
    overview: "The L21B is included as a supporting aircraft for glider training and community flying activity.",
    capabilities: ["Glider training", "Light aircraft flying", "Instruction"],
    specifications: [{ label: "Roster designation", value: "L21B Super Cub" }, { label: "Catalogue category", value: "Training" }, { label: "Organization", value: "Belgian Air Force" }]
  }
];

export const bases = [
  { id: "beauvechain", name: "Beauvechain", region: "Walloon Brabant", role: "Air base", description: "An air force location in central Belgium.", latitude: 50.758, longitude: 4.768 },
  { id: "melsbroek", name: "Brussels/Melsbroek", region: "Flemish Brabant", role: "Air base", description: "An air force location serving the Brussels area.", latitude: 50.901, longitude: 4.498 },
  { id: "florennes", name: "Florennes", region: "Namur Province", role: "Air base", description: "An air force location in southern Belgium.", latitude: 50.243, longitude: 4.645 },
  { id: "kleine-brogel", name: "Kleine-Brogel", region: "Limburg", role: "Air base", description: "An air force location in northeastern Belgium.", latitude: 51.168, longitude: 5.47 },
  { id: "koksijde", name: "Koksijde", region: "West Flanders", role: "Air base", description: "An air force location on the Belgian coast.", latitude: 51.09, longitude: 2.652 },
  { id: "luke-afb", name: "Luke AFB (AZ)", region: "Arizona, United States", role: "Overseas location", description: "An overseas location included in the force order of battle.", latitude: 33.535, longitude: -112.383, mapRegion: "overseas" },
  { id: "weelde", name: "Weelde", region: "Antwerp Province", role: "Airfield", description: "An airfield in northern Belgium.", latitude: 51.394, longitude: 4.96 }
];

export const news = [
  {
    id: "formation",
    category: "Formation",
    date: "2025-02-11",
    title: "Belgian Air Force established",
    excerpt: "The Belgian Air Force was established on 11 February 2025 as an aviation branch within the armed forces.",
    body: "Founded by Air France 2281, the Belgian Air Force community set out to organize aviation units, develop its aircraft roster and bring members together around shared activities."
  },
  {
    id: "leadership",
    category: "Leadership",
    date: "2026-04-07",
    title: "A new chapter in force leadership",
    excerpt: "The group's public roster identifies Lieutenant General Madeleine van der Meer as its force leader.",
    body: "The leadership roster identifies Lieutenant General Madeleine van der Meer as force leader, with Major General André Peeters serving as deputy chief."
  },
  {
    id: "recognition",
    category: "Community",
    date: "2026-09-23",
    title: "Community recognition recorded",
    excerpt: "The community recognizes a milestone in the group's ongoing development.",
    body: "The milestone reflects the group's progress, shared work and continued development."
  }
];

export const organisation = [
  { id: "headquarters", title: "Headquarters and command", description: "The leadership team coordinates the group's direction, administration and unit activity.", icon: "headquarters" },
  { id: "combat", title: "Combat aviation", description: "Members organize fighter-aircraft scenarios, formation flying and training activity.", icon: "combat" },
  { id: "transport", title: "Air mobility", description: "Transport-focused teams build passenger, cargo and support-flight scenarios.", icon: "transport" },
  { id: "helicopter", title: "Helicopter aviation", description: "Rotary-wing members take part in utility, maritime and support activities.", icon: "helicopter" },
  { id: "training", title: "Training and development", description: "Instructors and experienced members help pilots practise, learn and share standards.", icon: "training" },
  { id: "support", title: "Specialist support", description: "Technology, weather, safety, security and community roles help the group run its activities.", icon: "support" }
];

export const organizationStructure = {
  wings: [
    { id: "command-control", title: "Headquarters & control", description: "Command and coordination roles connect the group's units and support airspace activity." },
    { id: "combat-aviation", title: "Combat aviation formations", description: "Fighter units take part in air-defence, multirole and formation-flying scenarios." },
    { id: "air-transport", title: "15th Air Transport Wing", description: "Transport teams organize air-mobility scenarios and passenger or cargo flights." },
    { id: "helicopter", title: "Helicopter Wing", description: "Rotary-wing teams develop utility, maritime and specialist flying scenarios." },
    { id: "training", title: "Training & force development", description: "Training teams support pilot instruction, conversion activity and continued development." },
    { id: "unmanned", title: "Unmanned aviation & specialist units", description: "Specialist members support unmanned aviation, meteorology, gliding and other community functions." }
  ],
  squadronRoles: [
    { id: "80th-uav", title: "80th UAV Squadron", description: "A Belgian Air Force unit focused on unmanned aviation and reconnaissance-themed flights." },
    { id: "20th-squadron", title: "20th Squadron", description: "A transport formation represented in the group's strategic airlift scenarios." },
    { id: "21st-squadron", title: "21st Squadron", description: "A unit associated with passenger and liaison transport." },
    { id: "training-squadrons", title: "5th & 9th Training Squadrons", description: "Training units for introductory flying and pilot-development activity." },
    { id: "joint-k9", title: "Joint K-9 Unit", description: "A specialist support team in the air force." },
    { id: "meteorological-wing", title: "Meteorological Wing", description: "A support unit focused on weather information and flight-planning scenarios." },
    { id: "glider-centre", title: "Military Glider Center", description: "A community training role for gliding and light-aircraft activity." }
  ]
};

export const values = [
  { title: "Service", description: "Contribute constructively to the air force and support the people who make it possible." },
  { title: "Integrity", description: "Act with honesty, communicate clearly and earn the trust of fellow members." },
  { title: "Professionalism", description: "Prepare carefully, communicate clearly and treat shared scenarios with respect." },
  { title: "Teamwork", description: "Coordinate across units, learn from one another and make community activity welcoming." }
];
