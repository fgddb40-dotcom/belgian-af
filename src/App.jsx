import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Award, BriefcaseBusiness, Building2, CalendarDays, ChevronDown, ChevronRight,
  CirclePlay, Compass, Facebook, Headphones, Instagram, Landmark, Mail, Menu, Plane, Radio, Shield, Ship, Users, Wrench, X
} from "lucide-react";
import { getJson } from "./api.js";
import { aircraftImages } from "./aircraftImages.js";
import LocationMap from "./LocationMap.jsx";
import heroPoster from "../Media/Hero1.png";
import recruitmentPoster from "../Media/optimized/recruitmentposter.jpg";
import viennaDiplomacy from "../Media/optimized/Viennadiplomacy.jpg";
import belgianRoundel from "../Media/Roundel_of_Belgium.svg.png";

const aircraftGroups = ["All aircraft", "Fighter", "Transport", "Helicopter", "Training", "Support"];
const newsGroups = ["All", "Formation", "Leadership", "Community"];
const mediaGallery = [
  { src: heroPoster, title: "Hero1", caption: "Hero artwork · Air Force", alt: "F-16 aircraft artwork with Belgian Air Force branding" },
  { src: recruitmentPoster, title: "Recruitment poster", caption: "Community poster · Air Force", alt: "Belgian Air Force recruitment poster with aircraft artwork and a QR code" },
  { src: viennaDiplomacy, title: "Vienna diplomacy", caption: "flight · 24 September 2026", alt: "transport flight poster showing a flight to Vienna, Austria" },
  { src: belgianRoundel, title: "Roundel of Belgium", caption: "Insignia · Reference artwork", alt: "Roundel of Belgium in black, yellow and red concentric circles" }
];
const dateLabel = (value) => new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));

function useHashRoute() {
  const [route, setRoute] = useState(() => decodeURIComponent(location.hash.slice(1) || "home"));
  useEffect(() => {
    const sync = () => setRoute(decodeURIComponent(location.hash.slice(1) || "home"));
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [route]);
  return route;
}

function Art({ variant = "fighter", className = "" }) {
  return <div className={`art art-${variant} ${className}`} role="img" aria-label={`${variant} aircraft illustration`}>
    <span className="art-kicker">BELGIAN AIR FORCE</span>
    {variant === "helicopter" ? <svg viewBox="0 0 840 350" aria-hidden="true" focusable="false">
      <path className="aircraft-shape" d="M268 191 321 151 468 147 514 168 628 177 663 191 628 203 514 211 470 233 333 230 288 215 223 213 203 203 224 194Z" />
      <path className="art-shadow" d="m347 211 116 2 34 20-162-3Zm139-75 7-8 4 40h-9Zm-48 15 5-42 5-3 6 45Z" />
      <path d="M198 116h440M411 113v34M298 232l-12 23m188-20 16 20" fill="none" stroke="#e5e9e6" strokeWidth="6" strokeLinecap="round" />
      <path className="art-roundel" d="M555 181a11 11 0 1 0 0 22 11 11 0 0 0 0-22Z" />
    </svg> : variant === "transport" ? <svg viewBox="0 0 840 350" aria-hidden="true" focusable="false">
      <path className="aircraft-shape" d="M93 191 292 169 365 76 419 77 396 163 575 157 652 113 690 116 669 163 800 169 826 184 801 197 668 205 689 249 651 251 575 211 396 204 418 286 364 286 292 198Z" />
      <path className="art-shadow" d="m292 186 74 8 51 88-52 1-73-91Zm104-11 180 5 76 38-23 3-79-29-154-7Z" />
      <path className="art-roundel" d="M541 173a12 12 0 1 0 0 24 12 12 0 0 0 0-24Z" />
    </svg> : <svg viewBox="0 0 840 350" aria-hidden="true" focusable="false">
      <path className="aircraft-shape" d="M88 185 369 157 420 66 454 68 449 153 594 139 663 101 690 104 672 145 794 155 824 175 794 193 672 202 690 239 663 242 594 209 449 197 454 282 420 284 369 194 88 185Z" />
      <path className="art-shadow" d="m369 181 51 7 34 91-34 5-51-91Zm80-10 147 7 67 36-19 3-77-26-119-9Z" />
      <path className="art-roundel" d="M552 167a13 13 0 1 0 0 26 13 13 0 0 0 0-26Z" />
    </svg>}
    <span className="art-grid" />
    <span className="art-caption">AIR FORCE</span>
  </div>;
}

function ImageWithFallback({ src, alt, variant = "fighter", className = "", fallbackClassName = "" }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <Art variant={variant} className={fallbackClassName || className} />;
  return <img className={className} src={src} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} />;
}

function Eyebrow({ children }) { return <span className="eyebrow">{children}</span>; }
function SectionTitle({ eyebrow, title, text, action }) {
  return <div className="section-title"><div><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2>{text && <p>{text}</p>}</div>{action}</div>;
}
function LinkButton({ href, children, quiet = false }) {
  return <a className={`link-button ${quiet ? "quiet" : ""}`} href={href}>{children}<ArrowRight size={15} /></a>;
}
function ArrowLink({ href, children }) { return <a className="arrow-link" href={href}>{children}<ArrowUpRight size={14} /></a>; }

export default function App() {
  const route = useHashRoute();
  const [data, setData] = useState({ aircraft: [], bases: [], leadership: [], news: [], organization: [], organizationStructure: { wings: [], squadronRoles: [] }, values: [] });
  const [loadError, setLoadError] = useState("");
  const [category, setCategory] = useState("All");
  const [aircraftFilter, setAircraftFilter] = useState("All aircraft");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [contactState, setContactState] = useState("");

  useEffect(() => {
    Promise.all(["aircraft", "bases", "leadership", "news", "organization", "organization/structure", "values"].map(async (endpoint) => [endpoint === "organization/structure" ? "organizationStructure" : endpoint, await getJson(`/${endpoint}`)]))
      .then((entries) => { setData(Object.fromEntries(entries)); setLoadError(""); })
      .catch((error) => setLoadError(error.message));
  }, []);

  useEffect(() => { setMobileMenu(false); }, [route]);

  const [routeType, routeId] = route.split("/");
  const selectedAircraft = useMemo(() => data.aircraft.find((item) => item.id === routeId), [data.aircraft, routeId]);
  const filteredNews = useMemo(() => category === "All" ? data.news : data.news.filter((item) => item.category === category), [category, data.news]);
  const filteredAircraft = useMemo(() => aircraftFilter === "All aircraft" ? data.aircraft : data.aircraft.filter((item) => item.category === aircraftFilter), [aircraftFilter, data.aircraft]);

  function submitContact(event) {
    event.preventDefault();
    setContactState("This demo form is not connected. No message has been sent.");
  }

  return <div className="site">
    <a className="skip-link" href="#main">Skip to main content</a>
    <div className="utility-bar"><div><span className="belgian-mark" aria-hidden="true"><i /><i /><i /></span><span>BELGIAN AIR FORCE</span></div><a href="#legal">About this site <ArrowUpRight size={12} /></a></div>
    <header className="site-header">
      <a className="identity" href="#home" aria-label="Belgian Air Force home"><span className="identity-mark"><img src={belgianRoundel} alt="" /></span><span><strong>BELGIAN AIR FORCE</strong></span></a>
      <button className="mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label={mobileMenu ? "Close navigation" : "Open navigation"} aria-expanded={mobileMenu}>{mobileMenu ? <X /> : <Menu />}</button>
      <nav className={`primary-nav ${mobileMenu ? "open" : ""}`} aria-label="Main navigation">
        <a href="#home">Home</a>
        <details className="nav-dropdown"><summary>About <ChevronDown size={12} /></summary><div className="dropdown-panel"><a href="#about">Our story</a><a href="#organization">Organization</a><a href="#leadership">Leadership</a></div></details>
        <details className="nav-dropdown"><summary>Our force <ChevronDown size={12} /></summary><div className="dropdown-panel"><a href="#aircraft">Aircraft</a><a href="#bases">Bases</a><a href="#missions">What we do</a></div></details>
        <a href="#news">News</a><a href="#recruitment">Join the force</a><a href="#media">Media</a>
        <a className="nav-contact" href="#contact">Contact <ArrowUpRight size={13} /></a>
      </nav>
    </header>
    <main id="main" tabIndex="-1">
      {loadError && <div role="alert" className="load-error">Some public information could not be loaded. {loadError}</div>}
      {routeType === "home" && <Home data={data} />}
      {routeType === "about" && <About data={data} />}
      {routeType === "leadership" && <Leadership data={data} />}
      {routeType === "organization" && <Organization data={data} />}
      {routeType === "missions" && <Missions data={data} />}
      {routeType === "aircraft" && routeId && <AircraftDetail item={selectedAircraft} />}
      {routeType === "aircraft" && !routeId && <AircraftPage aircraft={filteredAircraft} filter={aircraftFilter} onFilter={setAircraftFilter} />}
      {routeType === "bases" && <Bases data={data} selectedId={routeId} />}
      {routeType === "news" && routeId ? <NewsDetail item={data.news.find((item) => item.id === routeId)} /> : routeType === "news" && <NewsPage news={filteredNews} category={category} onCategory={setCategory} />}
      {routeType === "recruitment" && <Recruitment />}
      {routeType === "media" && <Media aircraft={data.aircraft} />}
      {routeType === "contact" && <Contact onSubmit={submitContact} message={contactState} />}
      {["accessibility", "privacy", "legal"].includes(routeType) && <PolicyPage kind={routeType} />}
      {!["home", "about", "leadership", "organization", "missions", "aircraft", "bases", "news", "recruitment", "media", "contact", "accessibility", "privacy", "legal"].includes(routeType) && <NotFound />}
    </main>

    <Footer />
  </div>;
}

function Home({ data }) {
  return <>
    <section className="hero">
      <img className="hero-poster" src={heroPoster} alt="" fetchPriority="high" />
      <div className="hero-scrim" />
      <div className="hero-content"><Eyebrow>BELGIAN AIR FORCE</Eyebrow><h1>Air power.<br /><em>Built for the skies.</em></h1><p>A community-led air force bringing together pilots, units and support teams.</p><div className="hero-actions"><LinkButton href="#missions">Explore the force</LinkButton><a href="#about" className="hero-secondary">Our story <ArrowDown size={14} /></a></div></div>
      <div className="hero-index"><span>01</span><i /> AIR FORCE</div>
      <div className="hero-side-label">FLIGHT · TEAMWORK · COMMUNITY</div>
    </section>
    <div className="notice"><span className="notice-seal"><Shield size={16} /></span><p><strong>A strong force is shaped by its community.</strong> Pilots, organizers and support members build each flight together.</p><a href="#organization">Meet the teams <ArrowRight size={14} /></a></div>
    <section className="content-section mission-intro"><div className="mission-copy"><Eyebrow>OUR AIR FORCE</Eyebrow><h2>A branch.<br />One shared purpose.</h2></div><div className="mission-detail"><p>The Belgian Air Force brings members together for flying, training, unit activity and community events.</p><p>Explore the force's history, leadership, aircraft, bases and the people who support its activities.</p><LinkButton href="#about" quiet>About the Belgian Air Force</LinkButton></div><div className="mission-stamp"><span>BAF</span><small>AIR FORCE</small></div></section>
    <section className="feature-dark"><div className="section-wrap"><SectionTitle eyebrow="AIRCRAFT" title="Aircraft in the roster" text="Explore aircraft types represented in the air force." action={<ArrowLink href="#aircraft">Explore the roster</ArrowLink>} /><div className="featured-grid">{data.aircraft.slice(0, 3).map((item, index) => <AircraftCard key={item.id} item={item} index={index} />)}</div></div></section>
    <section className="content-section news-preview"><SectionTitle eyebrow="COMMUNITY UPDATES" title="Notes from the force" text="Background, activity themes and updates from the community." action={<ArrowLink href="#news">All updates</ArrowLink>} /><div className="news-grid">{data.news.slice(0, 3).map((item) => <NewsCard key={item.id} item={item} />)}</div></section>
    <Callout href="#recruitment" kicker="TAKE PART" title="Find your place in the community." text="Learn about joining the air force and the different ways members contribute." action="Explore participation" />
  </>;
}

function PageHero({ eyebrow, title, intro, variant = "transport", photo }) {
  return <section className="page-hero">{photo ? <ImageWithFallback src={photo.src} alt={photo.alt} variant={variant} className="page-hero-photo" fallbackClassName="page-hero-art" /> : <Art variant={variant} className="page-hero-art" />}<div className="page-hero-shade" /><div className="page-hero-content"><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{intro}</p>{photo?.source ? <a className="photo-credit" href={photo.source} target="_blank" rel="noreferrer">Photo: {photo.credit} · {photo.license}</a> : photo && <span className="photo-credit">{photo.credit} · {photo.license}</span>}</div></section>;
}

function About({ data }) {
  return <>
    <PageHero eyebrow="ABOUT THE BELGIAN AIR FORCE" title="A story built in the skies." intro="An aviation community with its own identity, organization and shared history." variant="transport" />
    <section className="content-section editorial"><div className="editorial-aside"><Eyebrow>OUR STORY</Eyebrow><span className="big-year">2025<small>FORMED AS AN<br />AVIATION BRANCH</small></span></div><div className="editorial-copy"><h2>Created for shared aviation.</h2><p>The Belgian Air Force was founded on 11 February 2025. Members formed an aviation branch within an armed-forces community, coming together to fly, train and organize.</p><p>The group has developed its own command roles, unit structure and aircraft roster as its community has grown.</p><p>Today, the air force brings members together through flying, learning, coordination and creative projects.</p></div></section>
    <section className="timeline-section"><div className="section-wrap"><SectionTitle eyebrow="AIR FORCE MILESTONES" title="The group's development" text="A short overview of the community's history." /><div className="timeline">{[{year:"2025",text:"The group is founded by Air France 2281 and begins building an aviation organization."},{year:"2025–26",text:"The community expands its command roles, specialist units and aircraft roster."},{year:"2026",text:"The Belgian Air Force name is reaffirmed as the group's identity."},{year:"ONGOING",text:"Members continue to develop flying, training and community activities."}].map((item)=><article className="timeline-item" key={item.year}><span>{item.year}</span><i /><p>{item.text}</p></article>)}</div></div></section>
    <section className="content-section values-section"><SectionTitle eyebrow="WHAT GUIDES US" title="Principles put into practice" text="Values matter most when they guide decisions, teamwork and daily conduct." /><div className="values-grid">{data.values.map((value,index)=><article className="value-card" key={value.title}><span>0{index+1}</span><h3>{value.title}</h3><p>{value.description}</p></article>)}</div></section>
  </>;
}

function Leadership({ data }) {
  return <>
    <PageHero eyebrow="AIR FORCE LEADERSHIP" title="Command within the community." intro="Meet the leaders who guide the air force and its units." variant="fighter" />
    <section className="content-section"><SectionTitle eyebrow="BELGIAN AIR FORCE" title="Force leadership" text="The public leadership roster introduces the people who guide the group." /><div className="leader-grid">{data.leadership.map((leader,index)=><article className="leader-card" key={leader.id}><div className="leader-portrait"><span><Users size={30} /></span><b>LEADERSHIP PROFILE · {String(index+1).padStart(2,"0")}</b></div><div className="leader-info"><Eyebrow>{leader.title}</Eyebrow><h3>{leader.name}</h3><p>{leader.biography}</p><div className="focus-tags">{leader.focus.map((focus)=><span key={focus}>{focus}</span>)}</div></div></article>)}</div></section>
    <section className="soft-section"><div className="section-wrap"><SectionTitle eyebrow="COMMUNITY LEADERSHIP" title="A shared responsibility" text="Command teams organize participation, training and community standards." /><div className="three-cards"><InfoCard icon={Compass} title="Set direction" text="Coordinate the group's activities and keep its structure clear."/><InfoCard icon={Users} title="Support members" text="Help pilots and specialist members learn, participate and collaborate."/><InfoCard icon={Award} title="Build trust" text="Lead respectfully and keep community activity welcoming and well organized." /></div></div></section>
  </>;
}

function Organization({ data }) {
  return <>
    <PageHero eyebrow="HOW WE ARE ORGANIZED" title="One branch. Many teams." intro="Command, flying units and specialist groups contribute to the air force." variant="helicopter" />
    <section className="content-section"><SectionTitle eyebrow="AIR FORCE STRUCTURE" title="From headquarters to specialist units" text="The organization connects leadership with flying formations, training and support teams." /><div className="org-chart"><div className="org-root"><Landmark size={20}/><span>Belgian Air Force Headquarters</span><small>Command · coordination · administration</small></div><div className="org-connector" /><div className="org-branches">{data.organizationStructure.wings.map((formation)=><article className="org-branch" key={formation.id}><span className="org-mark"><Building2 size={18}/></span><div><Eyebrow>FORMATION</Eyebrow><h3>{formation.title}</h3><p>{formation.description}</p></div></article>)}</div></div><div className="squadron-section"><SectionTitle eyebrow="UNITS & SPECIALIST TEAMS" title="Different roles, shared purpose" text="These formations and unit labels describe the group's organization and activities."/><div className="squadron-grid">{data.organizationStructure.squadronRoles.map((unit)=><article className="squadron-card" key={unit.id}><span><Radio size={17}/></span><h3>{unit.title}</h3><p>{unit.description}</p></article>)}</div></div></section>
    <section className="soft-section"><div className="section-wrap"><SectionTitle eyebrow="COMMUNITY FUNCTIONS" title="The work behind every flight" text="Flight activity depends on members who organize, teach and support the force." /><div className="org-role-grid">{data.organization.map((item)=><InfoCard key={item.id} icon={iconFor(item.icon)} title={item.title} text={item.description}/>)}</div></div></section>
    <section className="content-section"><div className="org-callout"><div><Eyebrow>WINGS, SQUADRONS & SUPPORT</Eyebrow><h2>Specialist teams. A shared purpose.</h2></div><p>Unit names, roles and assignments are part of the air force and its community.</p></div></section>
  </>;
}

function Missions({ data }) {
  return <>
    <PageHero eyebrow="AIR FORCE ACTIVITY" title="Practice, coordinate, explore." intro="Members fly, train together and take part in community events." variant="fighter" />
    <section className="content-section"><SectionTitle eyebrow="ACTIVITIES" title="A broad range of flying" text="Explore the activities and capabilities of the air force." /><div className="mission-cards">{[{icon:Shield,title:"Air-defence flying",text:"Practise interception and airspace-awareness scenarios in flights."},{icon:Users,title:"Joint community events",text:"Coordinate flights and training with partner communities under agreed event rules."},{icon:Plane,title:"Air mobility",text:"Build planning and crew-coordination skills through passenger and cargo flights."},{icon:Radio,title:"Unmanned aviation",text:"Take part in reconnaissance-themed and remotely piloted aircraft activities."},{icon:Award,title:"Training and development",text:"Use instruction, practice and mentoring to help members improve their flying skills."},{icon:Wrench,title:"Specialist support",text:"Support the force through communications, weather, safety, technology and organizational projects."}].map(item=><InfoCard key={item.title} icon={item.icon} title={item.title} text={item.text}/>)}</div></section>
    <section className="mission-band"><div><Eyebrow>COMMUNITY STANDARDS</Eyebrow><h2>Keep every flight responsible.</h2><p>Members contribute respectfully and work together to make the air force welcoming.</p><LinkButton href="#organization">See the force structure</LinkButton></div><span className="mission-band-seal"><Shield size={68}/></span></section>
  </>;
}

function AircraftPage({ aircraft, filter, onFilter }) {
  return <>
    <PageHero eyebrow="AIRCRAFT" title="Aircraft in the force." intro="Browse the aircraft roster and explore the capabilities of each type." variant="transport" />
    <section className="content-section"><SectionTitle eyebrow="AIRCRAFT DIRECTORY" title="A roster for flying" text="Explore the aircraft that serve in the air force and their general roles." /><div className="filter-row" aria-label="Filter aircraft by category">{aircraftGroups.map((item)=><button className={filter===item?"selected":""} onClick={()=>onFilter(item)} key={item}>{item}</button>)}</div><div className="fleet-grid">{aircraft.map((item,index)=><AircraftCard item={item} index={index} key={item.id}/>)}</div></section>
  </>;
}

function AircraftCard({ item, index }) {
  const photo = aircraftImages[item.id];
  return <a className={`fleet-card fleet-${index%3}`} href={`#aircraft/${item.id}`}><div className="fleet-art fleet-photo"><ImageWithFallback src={photo?.src} alt="" variant={item.image} fallbackClassName="fleet-photo-fallback" /></div><div className="fleet-info"><Eyebrow>{item.category.toUpperCase()} · {item.role}</Eyebrow><h3>{item.name}</h3><p>{item.summary}</p><span className="fleet-link">Aircraft profile <ArrowRight size={14}/></span></div></a>;
}

function AircraftDetail({ item }) {
  if (!item) return <NotFound />;
  return <>
    <div className="detail-top"><a href="#aircraft"><ArrowLeft size={15}/> Aircraft directory</a><span>{item.category}</span></div>
    <PageHero eyebrow={`${item.category.toUpperCase()} AIRCRAFT`} title={item.name} intro={item.summary} variant={item.image} photo={aircraftImages[item.id]}/>
    <section className="content-section detail-layout"><div className="detail-main"><Eyebrow>AIRCRAFT PROFILE</Eyebrow><h2>Capability shaped around the mission.</h2><p>{item.overview}</p><h3>Roles</h3><ul className="capability-list">{item.capabilities.map((capability)=><li key={capability}><span><ChevronRight size={14}/></span>{capability}</li>)}</ul><h3>Role in the roster</h3><p>{item.role}. This profile describes the aircraft's place in the air force.</p></div><aside className="spec-panel"><Eyebrow>AT A GLANCE</Eyebrow><h3>Aircraft profile</h3><dl>{item.specifications.map((spec)=><div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}</dl></aside></section>
    <section className="soft-section"><div className="section-wrap detail-back"><p>Explore other aircraft in the public fleet directory.</p><LinkButton href="#aircraft" quiet>Back to aircraft</LinkButton></div></section>
  </>;
}

function Bases({ data, selectedId }) {
  const selectedBase = data.bases.find((base) => base.id === selectedId);
  return <>
    <PageHero eyebrow="BASES & STATIONS" title="Places across the force." intro="Explore the airfields and coordination locations that support the air force." variant="transport" />
    <section className="content-section"><SectionTitle eyebrow="INSTALLATION DIRECTORY" title="A connected network" text="Explore the airfields and locations listed across the force order of battle." /><div className="base-layout"><div className="location-map-panel"><LocationMap bases={data.bases} selectedId={selectedId}/><div className="map-overseas"><span>OVERSEAS LOCATION</span><a href="#bases/luke-afb" className={selectedId==="luke-afb"?"map-overseas-selected":""}><i/><span>Luke AFB (AZ)<small>Arizona, United States · Select to locate on map</small></span><ArrowUpRight size={14}/></a></div></div><div className="base-list">{data.bases.map((base,index)=><article id={`base-${base.id}`} className={`base-item ${base.id===selectedId?"base-selected":""}`} key={base.id}><span className="base-number">0{index+1}</span><div><Eyebrow>{base.region}</Eyebrow><h3>{base.name}</h3><p>{base.description}</p><span className="base-role">{base.role}</span></div></article>)}</div></div>{selectedBase&&<div className="base-selected-panel"><Eyebrow>AIR FORCE LOCATION</Eyebrow><h3>{selectedBase.name}</h3><p>{selectedBase.description}</p><span>{selectedBase.role} · {selectedBase.region}</span><a href="#bases">Return to all locations <ArrowRight size={13}/></a></div>}</section>
  </>;
}

function NewsPage({ news, category, onCategory }) {
  return <>
    <PageHero eyebrow="NEWS" title="Stories from the force." intro="Updates and features about the group's history, flying and community projects." variant="fighter"/>
    <section className="content-section"><SectionTitle eyebrow="UPDATES & FEATURES" title="Notes from the community" text="Browse updates and features by topic."/><div className="filter-row" aria-label="Filter news by topic">{newsGroups.map((item)=><button className={category===item?"selected":""} onClick={()=>onCategory(item)} key={item}>{item}</button>)}</div><div className="news-grid news-archive">{news.map((item,index)=><NewsCard item={item} key={item.id} index={index}/>)}</div>{news.length===0&&<p className="empty-state">There are no items in this category at present.</p>}</section>
  </>;
}

function NewsCard({ item, index = 0 }) {
  return <article className="news-card"><a className={`news-art news-art-${index%4}`} href={`#news/${item.id}`} aria-label={`Read ${item.title}`}><span>{item.category.toUpperCase()}</span><i><ArrowUpRight size={19}/></i></a><div className="news-card-body"><span className="news-date"><CalendarDays size={13}/>{dateLabel(item.date)}</span><h3>{item.title}</h3><p>{item.excerpt}</p><a href={`#news/${item.id}`}>Read announcement <ArrowRight size={14}/></a></div></article>;
}

function NewsDetail({ item }) {
  if (!item) return <NotFound />;
  return <><div className="detail-top"><a href="#news"><ArrowLeft size={15}/> Community news</a><span>{item.category}</span></div><PageHero eyebrow={`${item.category.toUpperCase()} · ${dateLabel(item.date).toUpperCase()}`} title={item.title} intro={item.excerpt} variant="transport"/><article className="content-section article-body"><Eyebrow>COMMUNITY UPDATE</Eyebrow><p>{item.body}</p><LinkButton href="#news" quiet>Return to community news</LinkButton></article></>;
}

function Recruitment() {
  const professions = [
    ["pilots", "Take part in planned flights, training sessions and community events."],
    ["Training & standards", "Support other members with practice sessions, shared procedures and welcoming instruction."],
    ["Organization & events", "Help coordinate units, events, schedules and public information."],
    ["Creative & technical support", "Contribute artwork, web content, technology projects or other community services."]
  ];
  return <>
    <PageHero eyebrow="JOIN THE AIR FORCE" title="Bring your skills to the community." intro="The group welcomes a range of interests beyond flying, from training and event organization to creative and technical contributions." variant="helicopter" />
    <section className="content-section"><SectionTitle eyebrow="WAYS TO CONTRIBUTE" title="Many ways to serve" text="Explore the roles that help the air force thrive."/><div className="career-grid">{professions.map(([title,text],index)=><article className="career-card" key={title}><span className="career-index">0{index+1}</span><BriefcaseBusiness size={22}/><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="soft-section"><div className="section-wrap"><SectionTitle eyebrow="GETTING STARTED" title="Learn, fly, contribute" text="New members can learn about the force, review its conventions and take part at a suitable pace."/><div className="pipeline">{["Learn about the group","Review community rules","Choose an area of interest","Meet the community","Take part in an activity"].map((step,index)=><article key={step}><span>0{index+1}</span><i/><h3>{step}</h3></article>)}</div></div></section>
    <section className="content-section recruitment-note"><Shield size={22}/><div><Eyebrow>AIR FORCE</Eyebrow><h2>Join a community built around aviation.</h2><p>Discover opportunities to fly, learn, organize and support the force.</p></div></section>
    <Callout href="#contact" kicker="COMMUNITY ENQUIRY" title="Ask about taking part." text="Contact details and the message form are placeholders and are not monitored." action="View contact information"/>
  </>;
}

function Media({ aircraft }) {
  const gallery = [
    ...mediaGallery,
    ...aircraft.map((item) => ({ ...aircraftImages[item.id], title: item.name, caption: `${item.category} aircraft · ${aircraftImages[item.id]?.license ?? ""}`, variant: item.image }))
  ];
  return <>
    <PageHero eyebrow="MEDIA CENTRE" title="A closer look at the community." intro="Explore artwork and imagery from the Belgian Air Force." variant="helicopter"/>
    <section className="content-section"><SectionTitle eyebrow="IMAGE GALLERY" title="Aircraft & insignia" text="Browse the aircraft roster and community artwork."/><div className="media-grid">{gallery.map((item,index)=><article className={`media-card ${index===3?"media-card-insignia":""}`} key={item.src}><div className={`media-art media-photo media-art-${index%3}`}>{item.source ? <ImageWithFallback src={item.src} alt={item.alt} variant={item.variant} className="gallery-image" fallbackClassName="gallery-image-fallback"/> : <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />}</div><div><Eyebrow>{item.caption}</Eyebrow><h3>{item.title}</h3>{item.source ? <a className="image-attribution" href={item.source} target="_blank" rel="noreferrer">Photo: {item.credit} · {item.license}</a> : item.credit && <span className="image-attribution">{item.credit} · {item.license}</span>}</div></article>)}</div></section>
    <section className="soft-section"><div className="section-wrap"><SectionTitle eyebrow="VIDEO GALLERY" title="Stories on screen" text="Video embeds can be added with captions and transcripts."/><div className="video-grid">{["A formation flight","A training session","Inside the community's support teams"].map((title,index)=><article className="video-card" key={title}><div className={`video-placeholder video-${index}`}><CirclePlay size={43}/><span>VIDEO PLACEHOLDER</span></div><h3>{title}</h3><p>Caption and transcript to be added with each approved community video.</p></article>)}</div></div></section>
    <section className="content-section downloads"><div><Eyebrow>DOWNLOADS</Eyebrow><h2>Public media resources</h2><p>Wallpaper and media packs may be added following approval and rights checks.</p></div><a href="#media" aria-disabled="true" onClick={(event)=>event.preventDefault()} className="download-placeholder"><span><Award size={21}/><b>Wallpaper collection</b><small>PLACEHOLDER · NOT AVAILABLE</small></span><ArrowDown size={16}/></a></section>
  </>;
}

function Contact({ onSubmit, message }) {
  return <>
    <PageHero eyebrow="CONTACT THE COMMUNITY" title="How can we help?" intro="Contact the community for information about the Belgian Air Force." variant="transport"/>
    <section className="content-section contact-layout"><div className="contact-copy"><Eyebrow>COMMUNITY LIAISON</Eyebrow><h2>Clear information.<br/>Responsible communication.</h2><p>Community administrators can provide information about the force, its public material and participation.</p><div className="contact-block"><span><Mail size={18}/></span><div><Eyebrow>GENERAL ENQUIRIES</Eyebrow><b>Community contact to be confirmed</b><small>Placeholder · not a monitored address</small></div></div><div className="contact-block"><span><Headphones size={18}/></span><div><Eyebrow>MEDIA ENQUIRIES</Eyebrow><b>Media contact to be confirmed</b><small>Placeholder · not a monitored address</small></div></div></div>
      <form className="contact-form" onSubmit={onSubmit}><Eyebrow>CONTACT FORM</Eyebrow><h2>Preview a message</h2><p>This form is not connected and will not transmit personal information.</p><label>Your name<input name="name" autoComplete="name" required/></label><label>Email address<input name="email" type="email" autoComplete="email" required/></label><label>Subject<select name="subject" defaultValue=""><option value="" disabled>Select a topic</option><option>Force information</option><option>Media enquiry</option><option>Website feedback</option></select></label><label>Message<textarea name="message" rows="4" required/></label><button className="solid-button" type="submit">Preview message <ArrowRight size={15}/></button>{message&&<p className="form-message" role="status">{message}</p>}</form>
    </section>
    <div className="editorial-note contact-caveat"><Shield size={17}/><p>This demonstration form does not transmit or store messages.</p></div>
  </>;
}

function Callout({ href, kicker, title, text, action }) {
  return <section className="callout"><div><Eyebrow>{kicker}</Eyebrow><h2>{title}</h2><p>{text}</p></div><LinkButton href={href}>{action}</LinkButton></section>;
}

function InfoCard({ icon: Icon, title, text }) {
  return <article className="info-card"><span className="info-icon"><Icon size={20}/></span><h3>{title}</h3><p>{text}</p></article>;
}

function iconFor(name) {
  return ({headquarters:Landmark,combat:Plane,transport:Ship,helicopter:Compass,training:Award,support:Wrench})[name] ?? Building2;
}

function NotFound() {
  return <section className="not-found"><Eyebrow>PAGE NOT FOUND</Eyebrow><h1>That page isn't here.</h1><p>Return to the public information homepage to continue browsing.</p><LinkButton href="#home">Go to homepage</LinkButton></section>;
}

function PolicyPage({ kind }) {
  const content = {
    accessibility: ["Accessibility", "Designed for clear, inclusive access.", "This website concept supports keyboard navigation, semantic headings, visible focus states, reduced reliance on colour alone and responsive layouts. Placeholder illustrations include accessible text descriptions. Before launch, test the final implementation against applicable accessibility requirements with assistive technologies and users."],
    privacy: ["Privacy notice", "Respect for your information.", "This demonstration site does not include analytics, advertising trackers or a functioning contact submission service. The mock contact form does not transmit data. A production website must publish a reviewed privacy notice that explains its actual data processing, retention and contact arrangements."],
    legal: ["Legal information", "About the Belgian Air Force.", "This website presents the Belgian Air Force and its organization, aircraft, ranks, units, missions and locations."]
  }[kind];
  return <><PageHero eyebrow="SITE INFORMATION" title={content[0]} intro={content[1]} variant="transport"/><section className="content-section policy-copy"><Eyebrow>PUBLIC WEBSITE INFORMATION</Eyebrow><h2>{content[1]}</h2><p>{content[2]}</p><LinkButton href="#home" quiet>Return home</LinkButton></section></>;
}

function Footer() {
  return <footer className="site-footer">  <div className="footer-main"><div className="footer-brand"><a className="identity" href="#home"><span className="identity-mark"><img src={belgianRoundel} alt="" /></span><span><strong>BELGIAN AIR FORCE</strong></span></a><p>Flight, teamwork and community.<br/>An air force built together.</p><div className="social-links" aria-label="Social media placeholders"><a href="#contact" aria-label="Social media placeholder"><Facebook size={16}/></a><a href="#contact" aria-label="Social media placeholder"><Instagram size={16}/></a></div></div>
      <div className="footer-column"><Eyebrow>EXPLORE</Eyebrow><a href="#about">About</a><a href="#organization">Organization</a><a href="#aircraft">Aircraft</a><a href="#bases">Bases</a></div>
      <div className="footer-column"><Eyebrow>INFORMATION</Eyebrow><a href="#news">Community news</a><a href="#recruitment">Join the force</a><a href="#media">Media</a><a href="#contact">Contact</a></div>
      <div className="footer-column"><Eyebrow>LEGAL & ACCESS</Eyebrow><a href="#accessibility">Accessibility</a><a href="#privacy">Privacy notice</a><a href="#legal">Legal information</a><a href="#contact">Website feedback</a></div>
    </div><div className="footer-bottom"><span>© Belgian Air Force</span><span>Flight · Teamwork · Community</span><a href="#home">Back to top ↑</a></div></footer>;
}
