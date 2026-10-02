// Original public content for the Belgian Air Force website.
export const leadership = [
  {
    id: "force-leader",
    title: "Lieutenant General · Chief of the Air Force",
    name: "Madeleine van der Meer",
    biography: "Lieutenant General van der Meer assumed command on 7 April 2026. Her tenure has focused on restoring the Belgian Air Force designation, reorganizing the service and advancing its capabilities.",
    focus: ["Command", "Reorganization", "Development"],
    since: "7 April 2026"
  },
  {
    id: "deputy-chief",
    title: "Major General · Deputy Chief of the Air Force",
    name: "André Peeters",
    biography: "Major General Peeters serves as deputy chief, supporting command coordination, oversight and the development of the force.",
    focus: ["Coordination", "Oversight", "Development"]
  },
  {
    id: "founder",
    title: "Founder · Former Force Leader",
    name: "Air France 2281",
    biography: "Air France 2281 founded the Belgian Air Force on 11 February 2025 and led its initial organization.",
    focus: ["Founding", "Service history", "Heritage"]
  },
  {
    id: "inspector-general",
    title: "Inspector General",
    name: "Office holder not listed",
    biography: "The Inspector General function provides oversight and evaluation across the force.",
    focus: ["Oversight", "Evaluation"]
  }
];

export const forceProfile = {
  name: "Belgian Air Force",
  shortName: "BAF",
  languages: ["Luchtmacht", "Force aérienne"],
  code: "BAF",
  headquarters: "Quartier Reine Elisabeth, Evere (Brussels)",
  foundingDate: "11 February 2025",
  foundedBy: "Air France 2281",
  recognition: [
    { label: "Approved", date: "27 April 2026" },
    { label: "Recognized", date: "23 September 2026" }
  ],
  members: "The member roster is not published.",
  mission: "Safeguard Belgian and allied airspace, support joint operations and contribute to international security. Maintain ready, adaptable forces able to respond to crises and assist civil and military authorities.",
  vision: "Remain a modern, adaptable and ready air force, integrated with partners and able to operate across domains. Invest in capable people, advanced systems and flexible ways of working.",
  functions: [
    { title: "Air defence and combat operations", description: "Monitor and protect national airspace, maintain an interception capability and support joint operations with airpower." },
    { title: "Air mobility and support", description: "Move personnel, equipment and essential supplies; provide passenger, liaison and logistical transport." },
    { title: "Intelligence and unmanned operations", description: "Collect, assess and share information from manned and unmanned platforms to support awareness and decision-making." },
    { title: "Training and force development", description: "Develop skilled personnel through structured instruction, professional development and the integration of new capabilities." },
    { title: "Search, rescue and national support", description: "Support search-and-rescue activity, maritime and disaster response, and civil authorities during national emergencies." }
  ],
  history: [
    { date: "11 February 2025", title: "Founding", description: "Air France 2281 founded the Belgian Air Force as an aviation branch within the armed forces." },
    { date: "7 March 2025", title: "Eylstadt Charter", description: "The Eylstadt Charter formalized the wider political and military framework in which the new force was organized." },
    { date: "8 March 2025", title: "Activation", description: "The force began its initial activation, recruiting personnel and establishing command, aviation and air-defence capabilities." },
    { date: "7 April 2026", title: "Reorganization", description: "Lieutenant General Madeleine van der Meer assumed command and led a reorganization that reaffirmed the Belgian Air Force designation." },
    { date: "25 April 2026", title: "Technology development", description: "The force expanded its technology program and coordinated development of radar and airspace-management systems with Skeyes." },
    { date: "27 April 2026", title: "Approval", description: "The force's recognition record lists approval on this date." },
    { date: "28 April 2026", title: "Legitimacy directive", description: "A directive issued by Prime Minister Kyra van der Meer affirmed Belgium's recognition position and the force's independence from GMRP organizations." },
    { date: "21 September 2026", title: "Statement on Ukraine", description: "Following reported incursions into Belgian territory, the Kingdom of Belgium condemned the actions attributed to Ukrainian government and military forces and suspended official relations pending further notice." },
    { date: "23 September 2026", title: "Recognition", description: "The force's recognition record lists recognition on this date." },
    { date: "24 September 2026", title: "Sioux flight to Austria", description: "A VIP flight departed Brussels/Melsbroek for Vienna, Austria, crossing international airspace before landing." }
  ],
  foreignAffairs: [
    { title: "GARUD", description: "Belgium maintains a security partnership with GARUD, led by AOD-12, focused on aviation security, counter-terrorism coordination and information exchange. Any access to Florennes is limited, conditional and subject to Belgian command and agreed arrangements. Reciprocal access to selected partner facilities has also been discussed." },
    { title: "Ukraine", description: "Following Belgium's September 2026 condemnation, official diplomatic and military relations with Ukrainian government and military forces were suspended pending further notice." },
    { title: "European Republic", description: "Belgium maintains diplomatic and military relations with the European Republic, including communication, aviation and airspace coordination. Specific cooperation is governed by bilateral agreements." },
    { title: "United Kingdom of Kalmar", description: "Listed as a foreign-affairs counterpart." }
  ],
  technology: [
    { title: "Belgian Tech", description: "An independent technology and development organization supporting the force through agreements covering systems, services, development responsibilities and access." },
    { title: "Belgian Advanced Technological System (B.A.T.S.)", description: "An airspace-monitoring and mapping system developed by Belgian Tech. Its operational display presents air contacts with identification and filtering tools for friendly, partner, neutral and other traffic." },
    { title: "Belgian Operational Chat (BOC)", description: "A client-side communications and moderation system for force personnel. It supports relaying messages to designated communication portals, color-coded chat moderation and dedicated channels." }
  ],
  affiliationPolicy: "The Belgian Air Force is independent of GMRP. Actions by GMRP forces against Belgium are not recognized or given effect under the force's stated policy.",
  recruitmentEmail: "infobafrecruiting@gmail.com",
  website: "https://r3xicodes.github.io/baf.be/",
  rightsNotice: "This page contains protected material. Unauthorized editing, modification, redistribution or replication requires the explicit consent of Madeleine van der Meer and André Peeters.",
  publicationNotice: "This independently maintained public-information website is not an official website of the Belgian government or Ministry of Defence."
};

// Public aircraft profiles describe the roles represented in the force.
export const aircraft = [
  {
    id: "f-16a",
    name: "F-16A Fighting Falcon",
    category: "Fighter",
    image: "fighter",
    summary: "A multirole fighter in the combat-air fleet.",
    role: "Multirole fighter",
    overview: "The F-16 fleet includes single-seat and two-seat variants and is being progressively replaced by the F-35A.",
    capabilities: ["Multirole fighter operations", "Airspace defence", "Formation flying", "Conversion training"],
    specifications: [{ label: "Origin", value: "United States" }, { label: "Variants", value: "F-16A / F-16B" }, { label: "Reported in service", value: "44" }, { label: "Originally delivered", value: "160" }, { label: "Fleet status", value: "Gradually replaced by F-35A" }, { label: "Organization", value: "Belgian Air Force" }]
  },
  {
    id: "f-35a",
    name: "F-35A Lightning II",
    category: "Fighter",
    image: "fighter",
    summary: "A fifth-generation multirole fighter entering the combat-air fleet.",
    role: "Multirole fighter",
    overview: "The F-35A is a next-generation multirole fighter in the modernization program.",
    capabilities: ["Multirole fighter operations", "Airspace defence", "Formation flying", "Advanced training"],
    specifications: [{ label: "Origin", value: "United States" }, { label: "Variant", value: "F-35A" }, { label: "Reported in service", value: "12" }, { label: "Ordered", value: "34" }, { label: "Additional planned", value: "11" }, { label: "Organization", value: "Belgian Air Force" }]
  },
  {
    id: "f-16b",
    name: "F-16B Fighting Falcon",
    category: "Training",
    image: "fighter",
    summary: "A two-seat fighter variant assigned to pilot conversion training.",
    role: "Pilot conversion",
    overview: "The two-seat F-16B supports conversion training and is listed with the fighter fleet's F-16 variants.",
    capabilities: ["Pilot conversion", "Advanced flying instruction", "Fighter training"],
    specifications: [{ label: "Origin", value: "United States" }, { label: "Variant", value: "F-16B" }, { label: "Fleet record", value: "Included in the reported F-16 total" }, { label: "Primary station", value: "Kleine-Brogel" }, { label: "Organization", value: "Belgian Air Force" }]
  },
  {
    id: "f-15cd",
    name: "F-15 Eagle",
    category: "Fighter",
    image: "fighter",
    summary: "A tactical fighter included in the force's expanded fleet.",
    role: "Tactical fighter",
    overview: "The F-15C/D is included in the tactical fighter fleet.",
    capabilities: ["Tactical fighter operations", "Airspace defence", "Formation flying"],
    specifications: [{ label: "Origin", value: "United States" }, { label: "Variant", value: "F-15C/D" }, { label: "Reported in service", value: "5" }, { label: "On order", value: "15" }, { label: "Organization", value: "Belgian Air Force" }]
  },
  {
    id: "rafale",
    name: "Dassault Rafale",
    category: "Fighter",
    image: "fighter",
    summary: "A multirole fighter included in the expanded fleet.",
    role: "Multirole fighter",
    overview: "The fleet record includes Rafale F3R and F4 variants for multirole operations.",
    capabilities: ["Multirole fighter operations", "Formation flying", "Operational training"],
    specifications: [{ label: "Origin", value: "France" }, { label: "Variants", value: "F3R / F4" }, { label: "Reported in service", value: "12" }, { label: "On order", value: "22" }, { label: "Organization", value: "Belgian Air Force" }]
  },
  {
    id: "a400m",
    name: "Airbus A400M Atlas",
    category: "Transport",
    image: "transport",
    summary: "A heavy transport aircraft supporting strategic and tactical airlift.",
    role: "Strategic and tactical airlift",
    overview: "The A400M Atlas provides strategic and tactical transport for personnel and cargo.",
    capabilities: ["Strategic airlift", "Personnel and cargo transport", "Long-range transport", "Crew coordination"],
    specifications: [{ label: "Origin", value: "Europe" }, { label: "Reported in service", value: "7" }, { label: "Primary station", value: "Melsbroek" }, { label: "Organization", value: "Belgian Air Force" }]
  },
  {
    id: "falcon-7x",
    name: "Dassault Falcon 7X",
    category: "Transport",
    image: "transport",
    summary: "A business jet used for passenger and liaison transport.",
    role: "Passenger and liaison transport",
    overview: "The Falcon 7X supports passenger and liaison movements.",
    capabilities: ["Passenger flights", "Liaison flights", "Route planning"],
    specifications: [{ label: "Origin", value: "France" }, { label: "Reported in service", value: "2" }, { label: "Status", value: "Leased" }, { label: "Primary station", value: "Melsbroek" }, { label: "Organization", value: "Belgian Air Force" }]
  },
  {
    id: "skycourier",
    name: "Cessna 408 SkyCourier",
    category: "Transport",
    image: "transport",
    summary: "A utility transport aircraft for regional cargo and support.",
    role: "Regional air mobility",
    overview: "The SkyCourier supports shorter routes and logistics activity.",
    capabilities: ["Regional transport", "Cargo transport", "Route planning"],
    specifications: [{ label: "Origin", value: "United States" }, { label: "Designation", value: "Cessna 408" }, { label: "Status", value: "5 on order" }, { label: "Organization", value: "Belgian Air Force" }]
  },
  {
    id: "a330-mrtt",
    name: "Airbus A330 MRTT",
    category: "Support",
    image: "transport",
    summary: "A tanker and transport aircraft supporting air mobility and refuelling.",
    role: "Air-to-air refuelling and strategic transport",
    overview: "The A330 MRTT supports air mobility and other support flights.",
    capabilities: ["Air-to-air refuelling", "Strategic transport", "Long-range operations"],
    specifications: [{ label: "Origin", value: "Europe" }, { label: "Variant", value: "A330-200 MRTT" }, { label: "Reported in service", value: "1" }, { label: "Additional on order", value: "1" }, { label: "Organization", value: "Belgian Air Force" }]
  },
  {
    id: "e-7",
    name: "Boeing E-7 Wedgetail",
    category: "Support",
    image: "transport",
    summary: "An airborne early-warning and control aircraft in the support fleet.",
    role: "Airborne early warning and control",
    overview: "The E-7 supports coordinated aviation activity.",
    capabilities: ["Airborne early warning", "Airspace coordination", "Operational training"],
    specifications: [{ label: "Origin", value: "United States" }, { label: "Variant", value: "E-7A Wedgetail" }, { label: "Reported in service", value: "2" }, { label: "Additional on order", value: "1" }, { label: "Organization", value: "Belgian Air Force" }]
  },
  {
    id: "aw109",
    name: "AgustaWestland AW109",
    category: "Helicopter",
    image: "helicopter",
    summary: "A light helicopter used for medical support and utility duties.",
    role: "Medical support and utility",
    overview: "The A109BA provides a helicopter capability for utility, medical-support and training duties.",
    capabilities: ["Helicopter operations", "Utility support", "Medical support"],
    specifications: [{ label: "Origin", value: "Italy" }, { label: "Variant", value: "A109BA" }, { label: "Reported in service", value: "10" }, { label: "Fleet status", value: "Being phased out; H145M replacement" }, { label: "Organization", value: "Belgian Air Force" }]
  },
  {
    id: "h145m",
    name: "Airbus H145M",
    category: "Helicopter",
    image: "helicopter",
    summary: "A multirole utility helicopter planned for the fleet.",
    role: "Multirole and utility helicopter",
    overview: "The H145M is planned for general-purpose helicopter operations and training.",
    capabilities: ["Utility flights", "Helicopter training", "Team coordination"],
    specifications: [{ label: "Origin", value: "Europe" }, { label: "Designation", value: "H145M" }, { label: "Status", value: "15 on order" }, { label: "Organization", value: "Belgian Air Force" }]
  },
  {
    id: "nh90-nfh",
    name: "NHIndustries NH90 NFH",
    category: "Helicopter",
    image: "helicopter",
    summary: "A maritime helicopter for search-and-rescue and utility duties.",
    role: "Search and rescue, maritime and utility",
    overview: "The NH90 NFH serves in maritime and support roles.",
    capabilities: ["Maritime flights", "Helicopter training", "Team coordination"],
    specifications: [{ label: "Origin", value: "Europe" }, { label: "Variant", value: "NH90 NFH" }, { label: "Reported in service", value: "4" }, { label: "Planned modification", value: "Anti-submarine warfare role" }, { label: "Organization", value: "Belgian Air Force" }]
  },
  {
    id: "pc-7",
    name: "Pilatus PC-7 MKX",
    category: "Training",
    image: "trainer",
    summary: "A basic trainer designation for instruction and foundational flying practice.",
    role: "Basic flying training",
    overview: "The PC-7 MKX supports instruction and skill-building flights.",
    capabilities: ["Basic flight instruction", "Handling practice", "Instructor-led training"],
    specifications: [{ label: "Origin", value: "Switzerland" }, { label: "Variant", value: "PC-7 MKX" }, { label: "Status", value: "18 on order" }, { label: "Organization", value: "Belgian Air Force" }]
  },
  {
    id: "sf-260",
    name: "SIAI-Marchetti SF.260",
    category: "Training",
    image: "trainer",
    summary: "A light trainer for introductory and elementary flying instruction.",
    role: "Elementary flying training",
    overview: "The SF.260 provides a light-aircraft platform for foundational handling practice and pilot development.",
    capabilities: ["Basic handling practice", "Pilot training", "Instructor-led instruction"],
    specifications: [{ label: "Origin", value: "Italy" }, { label: "Variants", value: "SF.260D / M+" }, { label: "Reported in service", value: "19" }, { label: "Fleet status", value: "To be replaced by PC-7 MKX" }, { label: "Organization", value: "Belgian Air Force" }]
  },
  {
    id: "mq-9b",
    name: "MQ-9B SkyGuardian",
    category: "Support",
    image: "fighter",
    summary: "An unmanned aircraft for surveillance and intelligence missions.",
    role: "Surveillance and unmanned operations",
    overview: "The MQ-9B SkyGuardian provides a remotely operated surveillance capability.",
    capabilities: ["Unmanned aviation", "Intelligence, surveillance and reconnaissance", "Operational coordination"],
    specifications: [{ label: "Origin", value: "United States" }, { label: "Designation", value: "MQ-9B" }, { label: "Reported in service", value: "3" }, { label: "Additional on order", value: "4" }, { label: "Organization", value: "Belgian Air Force" }]
  },
  {
    id: "l21b",
    name: "L21B Super Cub",
    category: "Training",
    image: "trainer",
    summary: "A glider-centre support aircraft in the training catalogue.",
    role: "Glider training support",
    overview: "The L21B supports glider training and light-aircraft instruction.",
    capabilities: ["Glider training", "Light aircraft flying", "Instruction"],
    specifications: [{ label: "Roster designation", value: "L21B Super Cub" }, { label: "Catalogue category", value: "Training" }, { label: "Organization", value: "Belgian Air Force" }]
  }
];

export const bases = [
  { id: "evere", name: "Quartier Reine Elisabeth, Evere", shortName: "Evere Headquarters", region: "Brussels", role: "Headquarters and recruitment", units: ["Belgian Air Force Headquarters", "Air Force Recruitment Office"], description: "Headquarters for command, administration and recruitment.", latitude: 50.870, longitude: 4.400 },
  { id: "semmerzake", name: "Semmerzake", region: "East Flanders", role: "Air traffic control", units: ["Air Traffic Control Center"], description: "Location of the Air Traffic Control Center.", latitude: 50.962, longitude: 3.661 },
  { id: "beauvechain", name: "Beauvechain Air Base", region: "Walloon Brabant", role: "Training and support", units: ["1st Wing (Helicopters)", "15th Squadron (OCU)", "17th Squadron", "Meteorological Wing", "Military Glider Center", "Basic Flying Training School", "5th Squadron", "9th Squadron", "Control & Reporting Center", "Aviation Safety Directorate", "Air Force Competence Center"], description: "Home station for helicopter, training, weather, air-defence coordination and flight-safety functions.", latitude: 50.758, longitude: 4.768 },
  { id: "melsbroek", name: "Melsbroek Air Base", region: "Flemish Brabant", role: "Air transport", units: ["15th Air Transport Wing", "20th Squadron", "21st Squadron", "Office of Livery Design"], description: "Home station for the air-transport wing and its strategic airlift and VIP transport squadrons.", latitude: 50.901, longitude: 4.498 },
  { id: "florennes", name: "Florennes Air Base", region: "Namur Province", role: "Tactical aviation and UAV", units: ["2nd Tactical Wing", "1st Squadron", "350th Squadron", "80th UAV Squadron"], description: "Station for tactical fighter and unmanned-aircraft units.", latitude: 50.243, longitude: 4.645 },
  { id: "kleine-brogel", name: "Kleine-Brogel Air Base", region: "Limburg", role: "Tactical aviation and development", units: ["10th Tactical Wing", "31st Squadron", "349th Squadron", "Operational Conversion Unit", "Air Force Office of Technology Innovation"], description: "Station for tactical fighter operations, pilot conversion and technology development.", latitude: 51.168, longitude: 5.47 },
  { id: "koksijde", name: "Koksijde Air Base", region: "West Flanders", role: "Maritime and search-and-rescue aviation", units: ["40th Squadron"], description: "Station for NH90 NFH maritime and search-and-rescue helicopter operations.", latitude: 51.09, longitude: 2.652 },
  { id: "oud-heverlee", name: "Oud-Heverlee", region: "Flemish Brabant", role: "Specialist support", units: ["Joint K-9 Unit"], description: "Location of the Joint K-9 Unit.", latitude: 50.821, longitude: 4.664 },
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
    body: "Founded by Air France 2281, the force took shape during a period of political change in the Low Countries. The Eylstadt Charter, signed on 7 March 2025, set out a broader framework for cooperation. The force began activation the following day, establishing command functions, recruiting personnel and organizing aviation capabilities."
  },
  {
    id: "leadership",
    category: "Leadership",
    date: "2026-04-07",
    title: "A new chapter in force leadership",
    excerpt: "The public leadership roster identifies Lieutenant General Madeleine van der Meer as Chief of the Air Force.",
    body: "Lieutenant General Madeleine van der Meer assumed command on 7 April 2026. Her reforms restored the Belgian Air Force designation and placed renewed emphasis on centralized command, readiness and long-term development. Major General André Peeters serves as deputy chief."
  },
  {
    id: "technology",
    category: "Development",
    date: "2026-04-25",
    title: "Technology and airspace systems expand",
    excerpt: "The force expanded its technology program and coordination on radar and airspace management.",
    body: "The force's development program expanded to include radar and airspace-management systems in coordination with Skeyes. The work represents a broader focus on connected information, situational awareness and timely coordination."
  },
  {
    id: "recognition",
    category: "Leadership",
    date: "2026-09-23",
    title: "Recognition milestone recorded",
    excerpt: "The force's public record marks formal recognition on 23 September 2026.",
    body: "The Belgian Air Force's recognition record lists approval on 27 April 2026 and recognition on 23 September 2026."
  },
  {
    id: "relations-statement",
    category: "Foreign affairs",
    date: "2026-09-21",
    title: "Statement on relations with Ukraine",
    excerpt: "Belgium announced the suspension of official relations following reported violations of its sovereignty.",
    body: "Following reports of Ukrainian government and military forces entering Belgian territory, the Kingdom of Belgium issued a condemnation describing the actions as a violation of Belgian sovereignty. The government announced that official diplomatic, military and other relations with Ukraine would be suspended pending further notice. The Belgian Air Force's public position reflects that direction."
  },
  {
    id: "sioux-flight",
    category: "Operations",
    date: "2026-09-24",
    title: "Sioux flight arrives in Austria",
    excerpt: "A VIP flight travelled from Brussels/Melsbroek to Vienna on 24 September 2026.",
    body: "The Sioux flight departed Brussels/Melsbroek and crossed international airspace before entering European Republic airspace en route to Vienna. The flight concluded with the aircraft's arrival in Austria."
  }
];

export const organisation = [
  { id: "headquarters", title: "Headquarters and command", description: "The headquarters leads command, administration, recruitment and service-wide coordination.", icon: "headquarters" },
  { id: "combat", title: "Combat aviation", description: "Tactical wings operate fighter units and pilot-conversion functions.", icon: "combat" },
  { id: "transport", title: "Air mobility", description: "Transport units provide strategic airlift, passenger movement and liaison services.", icon: "transport" },
  { id: "helicopter", title: "Helicopter aviation", description: "Rotary-wing units conduct utility, maritime and search-and-rescue operations.", icon: "helicopter" },
  { id: "training", title: "Training and development", description: "Flying schools, training squadrons and conversion units prepare and develop aircrew.", icon: "training" },
  { id: "support", title: "Specialist support", description: "Airspace control, safety, meteorology, security and technology teams enable operations.", icon: "support" }
];

export const organizationStructure = {
  commandStaff: [
    { title: "Chief of the Air Force", name: "Lieutenant General Madeleine van der Meer" },
    { title: "Deputy Chief of the Air Force", name: "Major General André Peeters" },
    { title: "Inspector General", name: "Oversight and evaluation" }
  ],
  wings: [
    { id: "command-control", title: "High Command & Control", description: "Headquarters, air traffic control, air-defence coordination, safety, recruitment and technology functions." },
    { id: "unmanned", title: "UAV & Specialized Units", description: "Unmanned operations, security, meteorology and glider training." },
    { id: "helicopter", title: "1st Wing (Helicopters)", description: "Rotary-wing operations, conversion training, utility helicopter operations and maritime search and rescue." },
    { id: "second-tactical", title: "2nd Tactical Wing", description: "Fighter operations centred on the 1st and 350th Squadrons at Florennes." },
    { id: "tenth-tactical", title: "10th Tactical Wing", description: "Fighter operations and pilot conversion at Kleine-Brogel." },
    { id: "air-transport", title: "15th Air Transport Wing", description: "Strategic airlift, VIP and passenger transport based at Melsbroek." },
    { id: "training", title: "Training", description: "Basic flying instruction and pilot development at Beauvechain." }
  ],
  squadronRoles: [
    { id: "80th-uav", title: "80th UAV Squadron", description: "Intelligence, surveillance and reconnaissance.", role: "ISR / reconnaissance", equipment: "MQ-9B SkyGuardian", station: "Florennes" },
    { id: "joint-k9", title: "Joint K-9 Unit", description: "Specialist security and support.", role: "Security / support", equipment: "—", station: "Oud-Heverlee" },
    { id: "meteorological-wing", title: "Meteorological Wing", description: "Weather support for operations and planning.", role: "Weather support", equipment: "—", station: "Beauvechain" },
    { id: "glider-centre", title: "Military Glider Center", description: "Glider instruction and light-aircraft training.", role: "Glider training", equipment: "L21B Super Cub", station: "Beauvechain" },
    { id: "15th-ocu", title: "15th Squadron (OCU)", description: "Conversion training for helicopter aircrew.", role: "Conversion training", equipment: "AW109BA / H145M", station: "Beauvechain" },
    { id: "17th-squadron", title: "17th Squadron", description: "Utility helicopter operations.", role: "Utility helicopter operations", equipment: "AW109BA / H145M", station: "Beauvechain" },
    { id: "40th-squadron", title: "40th Squadron", description: "Naval and search-and-rescue helicopter operations.", role: "Naval / search and rescue", equipment: "NH90 NFH", station: "Koksijde" },
    { id: "1st-squadron", title: "1st Squadron", description: "Multirole fighter operations.", role: "Multirole fighter", equipment: "F-35A Lightning II", station: "Florennes" },
    { id: "350th-squadron", title: "350th Squadron", description: "Fighter operations and transition to the F-35A.", role: "Fighter operations", equipment: "F-16AM → F-35A", station: "Florennes" },
    { id: "31st-squadron", title: "31st Squadron", description: "Fighter operations and transition to the F-35A.", role: "Fighter operations", equipment: "F-16AM → F-35A", station: "Kleine-Brogel" },
    { id: "349th-squadron", title: "349th Squadron", description: "Fighter operations and transition to the F-35A.", role: "Fighter operations", equipment: "F-16AM → F-35A", station: "Kleine-Brogel" },
    { id: "operational-conversion", title: "Operational Conversion Unit", description: "Pilot conversion and operational training.", role: "Pilot conversion", equipment: "F-16BM", station: "Kleine-Brogel" },
    { id: "20th-squadron", title: "20th Squadron", description: "Strategic airlift.", role: "Strategic airlift", equipment: "A400M Atlas", station: "Melsbroek" },
    { id: "21st-squadron", title: "21st Squadron", description: "VIP and passenger transport.", role: "VIP / transport", equipment: "Dassault Falcon 7X", station: "Melsbroek" },
    { id: "basic-flying-school", title: "Basic Flying Training School", description: "Foundational pilot instruction.", role: "Pilot training", equipment: "—", station: "Beauvechain" },
    { id: "5th-squadron", title: "5th Squadron", description: "Basic flying training.", role: "Basic training", equipment: "SF.260D / M+", station: "Beauvechain" },
    { id: "9th-squadron", title: "9th Squadron", description: "Basic flying training.", role: "Basic training", equipment: "SF.260D / M+", station: "Beauvechain" }
  ],
  supportUnits: [
    { unit: "Belgian Air Force Headquarters", role: "Command and administration", station: "Evere" },
    { unit: "Air Traffic Control Center", role: "Airspace control", station: "Semmerzake" },
    { unit: "Control & Reporting Center", role: "Air-defence coordination", station: "Beauvechain" },
    { unit: "Aviation Safety Directorate", role: "Flight-safety oversight", station: "Beauvechain" },
    { unit: "Air Force Competence Center", role: "Training and development", station: "Beauvechain" },
    { unit: "Air Force Recruitment Office", role: "Recruitment and information", station: "Evere" },
    { unit: "Air Force Office of Technology Innovation", role: "Technology development", station: "Kleine-Brogel" },
    { unit: "Office of Livery Design", role: "Livery design", station: "Melsbroek" }
  ]
};

export const values = [
  { title: "Service", description: "Contribute constructively to the air force and support the people who make it possible." },
  { title: "Integrity", description: "Act with honesty, communicate clearly and earn the trust of fellow members." },
  { title: "Professionalism", description: "Prepare carefully, communicate clearly and uphold service standards." },
  { title: "Teamwork", description: "Coordinate across units, learn from one another and support a shared mission." }
];
